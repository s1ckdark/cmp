import { useRef } from 'react'
import Styles from './index.module.scss';

export interface SearchBarProps {
  placeholder: string
  onChange: (value: string) => void
  value: string
  disabled?: boolean
}

const SearchBar = ({
  placeholder,
  onChange,
  value,
  disabled = false,
  ...props
}: SearchBarProps) => {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div className={Styles.searchBar}>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        ref={inputRef}
        role="searchbox"
        {...props}
      />
      <button type="button" disabled={disabled}  onClick={() => inputRef?.current?.focus()}>Search</button>
    </div>
  )
}
export default SearchBar;