import { useEffect, useState } from 'react'
import { MdDeleteOutline, MdWarningAmber } from 'react-icons/md'
import { toast } from '@/components/ui/Notifications'

import { CardsProps } from '@/@types/Cards'
import { debug } from '@/classes/DebugLogger'
import { mongoService } from '@/classes/MongoContent'

import styles from './styles.module.scss'
import { TVProps } from '../Create'
import { SeriesProps } from '@/@types/series'
import { useTMDB } from '@/contexts/TMDBContext'

interface DeleteProps {
  tmdbid: number
}

const Delete = ({ tmdbid }: DeleteProps) => {
  const [serie, setSerie] = useState<SeriesProps | null>(null)
  const [loadingserie, setLoadingSerie] = useState(true)
  const [deleting, setDeleting] = useState(false)
  const [deleted, setDeleted] = useState(false)
  const [confirmed, setConfirmed] = useState(false)
  const [poster, setPoster] = useState('')

  const { serieData } = useTMDB()

  useEffect(() => {
    const find = serieData.find((serie) => serie.id === tmdbid)
    if (!find) return
    setPoster(find.poster_path)
  }, [tmdbid])

  useEffect(() => {
    let isCurrentRequest = true

    const getSerie = async () => {
      setLoadingSerie(true)
      setSerie(null)
      setDeleted(false)
      setConfirmed(false)

      try {
        const serieData = await mongoService.findOneSerieById(tmdbid)

        if (!isCurrentRequest) return

        if (!serieData) {
          toast.warning('serie não encontrado no catálogo.')
          return
        }

        setSerie(serieData)
      } catch (error) {
        if (!isCurrentRequest) return

        debug.log('Erro ao carregar serie:', error)
        toast.error('Não foi possível carregar o serie.')
      } finally {
        if (isCurrentRequest) {
          setLoadingSerie(false)
        }
      }
    }

    getSerie()

    return () => {
      isCurrentRequest = false
    }
  }, [tmdbid])

  const handleDelete = async () => {
    if (!serie || !confirmed || deleting) return

    setDeleting(true)

    try {
      const response = await mongoService.deleteSerie(tmdbid)

      debug.log('serie removido:', response)

      setSerie(null)
      setConfirmed(false)
      setDeleted(true)

      toast.success('serie removido do catálogo!')
    } catch (error) {
      debug.log('Erro ao remover serie:', error)
      toast.error('Não foi possível remover o serie.')
    } finally {
      setDeleting(false)
    }
  }

  if (loadingserie) {
    return (
      <div className={styles.loadingState} role="status">
        <span className={styles.spinner} />

        <strong>Carregando serie</strong>

        <p>Buscando o TMDB ID {tmdbid} no catálogo...</p>
      </div>
    )
  }

  if (deleted) {
    return (
      <div className={styles.successState}>
        <MdDeleteOutline aria-hidden="true" />

        <strong>serie removido</strong>

        <p>O serie com TMDB ID {tmdbid} foi removido do catálogo.</p>

        <small>Selecione outro ID para continuar gerenciando os series.</small>
      </div>
    )
  }

  if (!serie) {
    return (
      <div className={styles.notFoundState}>
        <MdWarningAmber aria-hidden="true" />

        <strong>serie não encontrado</strong>

        <p>Não existe um serie com o TMDB ID {tmdbid} no catálogo.</p>
      </div>
    )
  }

  return (
    <section className={styles.container}>
      <div className={styles.warningHeader}>
        <div className={styles.warningIcon}>
          <MdWarningAmber aria-hidden="true" />
        </div>

        <div>
          <span>Ação permanente</span>

          <h2>Excluir serie do catálogo</h2>

          <p>Confira os dados abaixo antes de continuar. Esta ação não poderá ser desfeita.</p>
        </div>
      </div>

      <article className={styles.serieCard}>
        {
          <div className={styles.poster}>
            <img
              src={`https://image.tmdb.org/t/p/w500${poster}` || '/fundo-alto.jpg'}
              alt={`Capa de ${serie.title}`}
            />
          </div>
        }

        <div className={styles.serieDetails}>
          <div className={styles.contentType}>serie selecionado</div>

          <h3>{serie.title}</h3>

          {serie.subtitle && <p className={styles.subtitle}>{serie.subtitle}</p>}

          <div className={styles.metadata}>
            <span>TMDB ID: {tmdbid}</span>

            {serie.season.length && (
              <span>
                {serie.season.length} {serie.season.length > 1 ? 'Temporadas' : 'Temporada'}
              </span>
            )}

            {serie.faixa && <span>{serie.faixa}</span>}
          </div>

          {serie.description && <p className={styles.description}>{serie.description}</p>}

          {serie.genero?.length > 0 && (
            <ul className={styles.genres}>
              {serie.genero.map((genre) => (
                <li key={genre}>{genre}</li>
              ))}
            </ul>
          )}
        </div>
      </article>

      <label className={styles.confirmation}>
        <input
          type="checkbox"
          checked={confirmed}
          disabled={deleting}
          onChange={(event) => {
            setConfirmed(event.target.checked)
          }}
        />

        <span className={styles.checkbox} />

        <span>
          Confirmo que desejo remover permanentemente <strong>{serie.title}</strong> do catálogo.
        </span>
      </label>

      <div className={styles.actions}>
        <button
          type="button"
          className={styles.deleteButton}
          disabled={!confirmed || deleting}
          onClick={handleDelete}
        >
          <MdDeleteOutline aria-hidden="true" />

          {deleting ? 'Excluindo Serie...' : 'Excluir permanentemente'}
        </button>
      </div>
    </section>
  )
}

export default Delete
