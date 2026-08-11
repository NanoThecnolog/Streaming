import { useEffect, useMemo, useState } from 'react'

import { LatestEpisode, mongoService } from '@/classes/MongoContent'

export interface LatestEpisodeGroup extends LatestEpisode {
  episodeNumbers: number[]
}

const CACHE_TTL_MS = 60_000
const requests = new Map<number, { createdAt: number; promise: Promise<LatestEpisode[]> }>()

const fetchLatestEpisodes = (limit: number) => {
  const cachedRequest = requests.get(limit)
  if (cachedRequest && Date.now() - cachedRequest.createdAt < CACHE_TTL_MS) {
    return cachedRequest.promise
  }

  const request = mongoService.fetchLatestEpisodes(limit).catch((error) => {
    requests.delete(limit)
    throw error
  })

  requests.set(limit, { createdAt: Date.now(), promise: request })
  return request
}

export const groupLatestEpisodes = (episodes: LatestEpisode[], limit = 8): LatestEpisodeGroup[] => {
  const groups = new Map<string, LatestEpisodeGroup>()

  episodes.forEach((episode) => {
    const key = `${episode.tmdbID}:${episode.seasonNumber}`
    const current = groups.get(key)

    if (!current) {
      groups.set(key, { ...episode, episodeNumbers: [episode.episodeNumber] })
      return
    }

    if (!current.episodeNumbers.includes(episode.episodeNumber)) {
      current.episodeNumbers.push(episode.episodeNumber)
    }

    if (new Date(episode.addedAt) > new Date(current.addedAt)) {
      current.addedAt = episode.addedAt
    }
  })

  return Array.from(groups.values())
    .sort((a, b) => new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime())
    .slice(0, limit)
}

export const useLatestEpisodes = (requestLimit = 24, groupLimit = 8) => {
  const [episodes, setEpisodes] = useState<LatestEpisode[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let active = true

    setIsLoading(true)
    void fetchLatestEpisodes(requestLimit)
      .then((data) => {
        if (!active) return
        setEpisodes(data)
      })
      .catch(() => {
        if (!active) return
        setEpisodes([])
      })
      .finally(() => {
        if (active) setIsLoading(false)
      })

    return () => {
      active = false
    }
  }, [requestLimit])

  const groups = useMemo(() => groupLatestEpisodes(episodes, groupLimit), [episodes, groupLimit])

  return { groups, isLoading }
}
