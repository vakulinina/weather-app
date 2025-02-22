import { useCallback, useState } from 'react'
import { fetchWeatherAsync } from '../redux/slices/weatherSlice'
import { useDispatch } from 'react-redux'
import '../styles/components/SearchInput.scss'
import { AppDispatch } from '../redux/store/store'

export function SearchInput() {
  const dispatch = useDispatch<AppDispatch>()
  const [input, setInput] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleInput = useCallback(
    ({ target }: { target: HTMLInputElement }) => {
      setInput(target.value)
    },
    []
  )

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      if (!input.trim()) {
        setError('City name cannot be empty')
        return
      }

      dispatch(fetchWeatherAsync(input))
      setError(null)
    },
    [dispatch, input]
  )

  return (
    <>
      <form
        className="search-form"
        onSubmit={handleSubmit}
        role="search"
        aria-label="Search weather by city"
      >
        <input
          value={input}
          onChange={handleInput}
          placeholder="Enter city name"
          className="search-input"
          type="search"
          aria-label="Enter city name"
          aria-invalid={error ? 'true' : 'false'}
        />
        <button
          type="submit"
          className="search-button"
          aria-label="Search weather"
        >
          Search
        </button>
        {error && (
          <p className="error-message" role="alert" aria-live="polite">
            {error}
          </p>
        )}
      </form>
    </>
  )
}
