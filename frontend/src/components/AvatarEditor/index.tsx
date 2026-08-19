import Image from 'next/image'
import { ChangeEvent, useEffect, useMemo, useState } from 'react'
import { RefreshCw } from 'lucide-react'
import { toast } from '@/components/ui/Notifications'
import {
  createDiceBearAvatarUrl,
  DiceBearCustomOptions,
  diceBearAvatarConfig,
  diceBearFixedOptions,
  diceBearStyleLabels,
  diceBearStyles,
  DiceBearStyle,
  parseDiceBearAvatarUrl,
} from '@/utils/diceBear'

import styles from './styles.module.scss'

interface DiceBearOptionDescriptor {
  type: 'string' | 'number' | 'range' | 'enum' | 'color' | 'boolean'
  values?: string[]
  min?: number
  max?: number
}

type DiceBearOptionsDescriptor = Record<string, DiceBearOptionDescriptor>

interface AvatarEditorProps {
  value?: string | null
  onChange: (url: string) => void
  disabled?: boolean
  onSave?: () => void
  saving?: boolean
  stickyPreview?: boolean
}

const hiddenOptions = new Set([
  'seed',
  'size',
  'idRandomization',
  'title',
  'borderRadius',
  'scale',
  'rotate',
  'translateX',
  'translateY',
  'backgroundColor',
  'backgroundColorFill',
])

const backgroundColors = [
  { label: 'Vermelho', value: 'd42c2c' },
  { label: 'Azul', value: '2563eb' },
  { label: 'Azul-claro', value: '38bdf8' },
  { label: 'Amarelo', value: 'facc15' },
  { label: 'Laranja', value: 'f97316' },
  { label: 'Roxo', value: '9333ea' },
  { label: 'Rosa', value: 'ec4899' },
  { label: 'Verde', value: '16a34a' },
  { label: 'Cinza', value: '52525b' },
  { label: 'Preto', value: '18181b' },
]

const optionLabels: Record<string, string> = {
  flip: 'Espelhamento',
}

const componentLabels: Record<string, string> = {
  beard: 'Barba',
  earrings: 'Brincos',
  eyebrows: 'Sobrancelhas',
  eyes: 'Olhos',
  freckles: 'Sardas',
  glasses: 'Óculos',
  hair: 'Cabelo',
  hairAccessories: 'Acessórios de cabelo',
  head: 'Formato do rosto',
  mouth: 'Expressão',
  nose: 'Nariz',
  skin: 'Pele',
}

const formatOptionLabel = (name: string): string => {
  if (optionLabels[name]) return optionLabels[name]

  const suffixes = [
    { suffix: 'Variant', label: 'Modelo' },
    { suffix: 'Color', label: 'Cor' },
  ]

  for (const { suffix, label } of suffixes) {
    if (name.endsWith(suffix)) {
      const component = name.slice(0, -suffix.length)
      return `${componentLabels[component] ?? component} - ${label}`
    }
  }

  return name.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/^./, (letter) => letter.toUpperCase())
}

const formatOptionValue = (value: string, index: number): string => {
  const directTranslations: Record<string, string> = {
    none: 'Nenhum',
    horizontal: 'Horizontal',
    vertical: 'Vertical',
    both: 'Horizontal e vertical',
    true: 'Sim',
    false: 'Não',
    flowers: 'Flores',
  }

  if (directTranslations[value]) return directTranslations[value]

  const translatedPattern = value
    .replace(/^variant0?/, 'Modelo ')
    .replace(/^happy0?/, 'Feliz ')
    .replace(/^sad0?/, 'Triste ')
    .replace(/^short0?/, 'Curto ')
    .replace(/^long0?/, 'Longo ')

  return translatedPattern === value ? `Opção ${index + 1}` : translatedPattern
}

const createSeed = (): string =>
  `flixnext-custom-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`

export default function AvatarEditor({
  value,
  onChange,
  disabled,
  onSave,
  saving,
  stickyPreview,
}: AvatarEditorProps) {
  const savedAvatar = useMemo(() => parseDiceBearAvatarUrl(value), [value])
  const [style, setStyle] = useState<DiceBearStyle>(
    () => savedAvatar?.style ?? diceBearAvatarConfig.style,
  )
  const [seed, setSeed] = useState(() => savedAvatar?.seed ?? createSeed())
  const [customOptions, setCustomOptions] = useState<DiceBearCustomOptions>(() => ({
    backgroundColor: 'd42c2c',
    ...savedAvatar?.options,
    ...diceBearFixedOptions,
  }))
  const [descriptors, setDescriptors] = useState<DiceBearOptionsDescriptor>({})
  const [loadingOptions, setLoadingOptions] = useState(true)
  const [search, setSearch] = useState('')

  const previewUrl = useMemo(
    () => createDiceBearAvatarUrl(style, seed, customOptions),
    [customOptions, seed, style],
  )

  useEffect(() => {
    onChange(previewUrl)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [previewUrl])

  useEffect(() => {
    const controller = new AbortController()

    const loadOptions = async () => {
      setLoadingOptions(true)
      setDescriptors({})

      try {
        const response = await fetch(`https://api.dicebear.com/10.x/${style}/options.json`, {
          signal: controller.signal,
        })

        if (!response.ok) throw new Error(`DiceBear respondeu ${response.status}`)
        setDescriptors((await response.json()) as DiceBearOptionsDescriptor)
      } catch (error) {
        if (!controller.signal.aborted) {
          console.error('Não foi possível carregar as opções do DiceBear:', error)
          toast.warning('O avatar pode ser escolhido, mas as opções avançadas não carregaram.')
        }
      } finally {
        if (!controller.signal.aborted) setLoadingOptions(false)
      }
    }

    void loadOptions()
    return () => controller.abort()
  }, [style])

  const visibleOptions = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase()

    return Object.entries(descriptors).filter(([name]) => {
      if (
        hiddenOptions.has(name) ||
        name.endsWith('Probability') ||
        name.endsWith('ColorFill') ||
        name.endsWith('ColorFillStops') ||
        name.endsWith('ColorAngle') ||
        name.endsWith('ColorOrder')
      )
        return false
      if (!normalizedSearch) return true
      return formatOptionLabel(name).toLowerCase().includes(normalizedSearch)
    })
  }, [descriptors, search])

  const selectedBackground = customOptions.backgroundColor
  const gradientColors = Array.isArray(selectedBackground) ? selectedBackground.map(String) : null

  const updateOption = (name: string, v: string | number | readonly string[] | undefined) => {
    setCustomOptions((current) => {
      const probabilityOption = name.endsWith('Variant')
        ? `${name.slice(0, -'Variant'.length)}Probability`
        : null

      if (v === undefined || v === '') {
        const next = { ...current }
        delete next[name]
        if (probabilityOption) delete next[probabilityOption]
        return next
      }

      return {
        ...current,
        [name]: v,
        ...(probabilityOption ? { [probabilityOption]: 100 } : {}),
      }
    })
  }

  const setSolidBackground = (color: string) => {
    setCustomOptions((current) => {
      const next: DiceBearCustomOptions = { ...current, backgroundColor: color }
      delete next.backgroundColorFill
      return next
    })
  }

  const setGradientBackground = (first = 'd42c2c', second = '2563eb') => {
    setCustomOptions((current) => ({
      ...current,
      backgroundColor: [first, second],
      backgroundColorFill: 'linear',
    }))
  }

  const selectStyle = (nextStyle: DiceBearStyle) => {
    if (nextStyle === style) return

    setStyle(nextStyle)
    setSearch('')
    setCustomOptions({
      ...diceBearFixedOptions,
      backgroundColor: 'd42c2c',
    })
  }

  const renderOption = (name: string, descriptor: DiceBearOptionDescriptor) => {
    const v = customOptions[name]
    const controlId = `dicebear-${name}`

    if (descriptor.type === 'enum' || descriptor.type === 'boolean') {
      const values = descriptor.type === 'boolean' ? ['true', 'false'] : (descriptor.values ?? [])

      return (
        <select
          id={controlId}
          value={typeof v === 'string' || typeof v === 'number' ? v : ''}
          onChange={(event) => updateOption(name, event.target.value || undefined)}
          disabled={disabled}
        >
          <option value="">Padrão do estilo</option>
          {values.map((item, index) => (
            <option key={item} value={item}>
              {formatOptionValue(item, index)}
            </option>
          ))}
        </select>
      )
    }

    if (descriptor.type === 'color') {
      const color = typeof v === 'string' ? v.replace(/^#/, '') : '27272a'

      return (
        <div className={styles.colorControl}>
          <input
            id={controlId}
            type="color"
            value={`#${color}`}
            disabled={disabled}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              updateOption(name, event.target.value.replace('#', ''))
            }
          />
          <span>#{color.toUpperCase()}</span>
        </div>
      )
    }

    const min = descriptor.min ?? (descriptor.type === 'range' ? 0 : undefined)
    const max = descriptor.max
    const numericValue = typeof v === 'number' ? v : ''
    const canUseRange = Number.isFinite(min) && Number.isFinite(max)

    return (
      <div className={styles.numericControl}>
        <input
          id={controlId}
          type={canUseRange ? 'range' : 'number'}
          min={min}
          max={max}
          value={numericValue}
          placeholder="Padrão"
          disabled={disabled}
          onChange={(event) =>
            updateOption(name, event.target.value === '' ? undefined : Number(event.target.value))
          }
        />
        <span>{numericValue === '' ? 'Padrão' : numericValue}</span>
      </div>
    )
  }

  return (
    <div
      className={
        stickyPreview ? `${styles.content} ${styles.contentSticky}` : styles.content
      }
    >
      <aside
        className={
          stickyPreview
            ? `${styles.previewPanel} ${styles.previewPanelSticky}`
            : styles.previewPanel
        }
      >
        <div className={styles.preview}>
          <Image
            src={previewUrl}
            alt="Prévia do avatar"
            fill
            sizes="210px"
            unoptimized
            priority
          />
        </div>

        <button
          type="button"
          className={styles.randomButton}
          onClick={() => setSeed(createSeed())}
          disabled={disabled}
        >
          <RefreshCw size={17} />
          Gerar outra combinação
        </button>

        {onSave && (
          <button
            type="button"
            className={styles.saveButton}
            disabled={disabled || saving || previewUrl === value}
            onClick={() => void onSave()}
          >
            {saving ? 'Salvando...' : 'Usar este avatar'}
          </button>
        )}
      </aside>

      <div className={styles.editor}>
        <section>
          <h2>Estilo</h2>
          <div className={styles.styleGrid}>
            {diceBearStyles.map((item) => {
              const stylePreview = createDiceBearAvatarUrl(item, 'flixnext-style-preview', {
                backgroundColor: '27272a',
              })

              return (
                <button
                  key={item}
                  type="button"
                  className={`${styles.styleButton} ${style === item ? styles.selectedStyle : ''}`}
                  aria-pressed={style === item}
                  onClick={() => selectStyle(item)}
                  disabled={disabled}
                >
                  <span>
                    <Image src={stylePreview} alt="" fill sizes="58px" unoptimized />
                  </span>
                  {diceBearStyleLabels[item]}
                </button>
              )
            })}
          </div>
        </section>

        <section className={styles.backgroundSection}>
          <div className={styles.backgroundHeader}>
            <div>
              <h2>Fundo</h2>
              <span>Escolha uma cor sólida ou combine duas cores.</span>
            </div>

            <button
              type="button"
              className={gradientColors ? styles.activeGradient : ''}
              onClick={() =>
                gradientColors
                  ? setSolidBackground(gradientColors[0] ?? 'd42c2c')
                  : setGradientBackground()
              }
              disabled={disabled}
            >
              {gradientColors ? 'Usar cor sólida' : 'Criar gradiente'}
            </button>
          </div>

          {gradientColors ? (
            <div className={styles.gradientColors}>
              {[0, 1].map((index) => (
                <label key={index}>
                  <span>{index === 0 ? 'Primeira cor' : 'Segunda cor'}</span>
                  <input
                    type="color"
                    value={`#${gradientColors[index] ?? (index === 0 ? 'd42c2c' : '2563eb')}`}
                    disabled={disabled}
                    onChange={(event) => {
                      const nextColors = [
                        gradientColors[0] ?? 'd42c2c',
                        gradientColors[1] ?? '2563eb',
                      ]
                      nextColors[index] = event.target.value.replace('#', '')
                      setGradientBackground(nextColors[0], nextColors[1])
                    }}
                  />
                </label>
              ))}
            </div>
          ) : (
            <div className={styles.backgroundColors}>
              {backgroundColors.map((color) => (
                <button
                  key={color.value}
                  type="button"
                  className={selectedBackground === color.value ? styles.selectedColor : ''}
                  aria-label={`Usar fundo ${color.label}`}
                  aria-pressed={selectedBackground === color.value}
                  onClick={() => setSolidBackground(color.value)}
                  disabled={disabled}
                >
                  <span style={{ backgroundColor: `#${color.value}` }} />
                  {color.label}
                </button>
              ))}
            </div>
          )}
        </section>

        <section className={styles.optionsSection}>
          <div className={styles.optionsHeader}>
            <div>
              <h2>Detalhes</h2>
              <span>{visibleOptions.length} opções disponíveis</span>
            </div>
            <input
              type="search"
              value={search}
              placeholder="Buscar opção"
              aria-label="Buscar opção de personalização"
              onChange={(event) => setSearch(event.target.value)}
              disabled={disabled}
            />
          </div>

          {loadingOptions ? (
            <div className={styles.optionsLoading}>Carregando opções...</div>
          ) : (
            <div className={styles.optionsGrid}>
              {visibleOptions.map(([name, descriptor]) => (
                <label key={name} className={styles.option} htmlFor={`dicebear-${name}`}>
                  <span>{formatOptionLabel(name)}</span>
                  {renderOption(name, descriptor)}
                </label>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}