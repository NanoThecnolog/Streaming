export interface WatchProvider {
  provider_id: number
  provider_name: string
  logo_path: string | null
  display_priority: number
}

export interface WatchProviderCountry {
  link?: string
  flatrate?: WatchProvider[]
  free?: WatchProvider[]
  ads?: WatchProvider[]
  rent?: WatchProvider[]
  buy?: WatchProvider[]
}

export interface WatchProvidersResponse {
  results?: Record<string, WatchProviderCountry>
}

export interface WithWatchProviders {
  'watch/providers'?: WatchProvidersResponse
}
