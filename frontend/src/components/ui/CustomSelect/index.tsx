import { useCallback, useEffect, useRef, useState } from 'react'
import { FaChevronDown } from 'react-icons/fa'
import styles from './styles.module.scss'

export interface CustomSelectOption {
  value: string
  label: string
}

interface CustomSelectProps {
  options: CustomSelectOption[]
  value: string
  onChange: (value: string) => void
  id?: string
  ariaLabel?: string
  disabled?: boolean
}

export default function CustomSelect({
  options,
  value,
  onChange,
  id,
  ariaLabel,
  disabled = false,
}: CustomSelectProps) {
  const [open, setOpen] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(0)
  const rootRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLUListElement>(null)

  const selectedOption = options.find((option) => option.value === value)

  useEffect(() => {
    if (!open) return

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('touchstart', handlePointerDown)

    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('touchstart', handlePointerDown)
    }
  }, [open])

  useEffect(() => {
    if (!open) return

    const currentIndex = options.findIndex((option) => option.value === value)

    setHighlightedIndex(currentIndex >= 0 ? currentIndex : 0)
  }, [open, options, value])

  useEffect(() => {
    if (!open) return

    const node = listRef.current?.children[highlightedIndex] as HTMLElement | undefined

    node?.scrollIntoView({ block: 'nearest' })
  }, [highlightedIndex, open])

  const commitOption = useCallback(
    (index: number) => {
      const option = options[index]

      if (!option) return

      onChange(option.value)
      setOpen(false)
    },
    [onChange, options],
  )

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (disabled) return

    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault()

        if (open) commitOption(highlightedIndex)
        else setOpen(true)

        break
      case 'Escape':
        if (open) {
          event.preventDefault()
          setOpen(false)
        }

        break
      case 'ArrowDown':
        event.preventDefault()

        if (!open) {
          setOpen(true)
          break
        }

        setHighlightedIndex((current) => Math.min(current + 1, options.length - 1))
        break
      case 'ArrowUp':
        event.preventDefault()

        if (!open) {
          setOpen(true)
          break
        }

        setHighlightedIndex((current) => Math.max(current - 1, 0))
        break
      case 'Home':
        if (!open) break

        event.preventDefault()
        setHighlightedIndex(0)
        break
      case 'End':
        if (!open) break

        event.preventDefault()
        setHighlightedIndex(options.length - 1)
        break
      case 'Tab':
        setOpen(false)
        break
    }
  }

  return (
    <div ref={rootRef} className={styles.select} onKeyDown={handleKeyDown}>
      <button
        type="button"
        id={id}
        className={styles.trigger}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={ariaLabel}
        onClick={() => setOpen((current) => !current)}
      >
        <span className={styles.value}>{selectedOption?.label ?? ''}</span>
        <FaChevronDown
          className={open ? styles.chevronOpen : styles.chevron}
          aria-hidden="true"
        />
      </button>

      {open && !disabled && (
        <ul ref={listRef} role="listbox" className={styles.list}>
          {options.map((option, index) => (
            <li
              key={option.value}
              role="option"
              aria-selected={option.value === value}
              className={[
                styles.option,
                index === highlightedIndex ? styles.optionHighlighted : '',
                option.value === value ? styles.optionSelected : '',
              ]
                .join(' ')
                .trim()}
              onPointerMove={() => setHighlightedIndex(index)}
              onClick={() => commitOption(index)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
