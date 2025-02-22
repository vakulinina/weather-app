import '../styles/components/CurrentWeather.scss'
import { useDispatch, useSelector } from 'react-redux'
import { toggleUnit } from '../redux/slices/weatherSlice'
import { useCallback } from 'react'
import { WeatherState } from '../redux/slices/types'

export function CurrentWeather() {
  const { current, isCelsius, city } = useSelector(
    (state: { weather: WeatherState }) => state.weather
  )
  const dispatch = useDispatch()

  const handleToggleUnit = useCallback(() => {
    dispatch(toggleUnit())
  }, [dispatch])

  if (!current) return null

  const { temp_c, temp_f, humidity, condition } = current
  const formattedTemp = Math.round(isCelsius ? temp_c : temp_f)

  return (
    <section aria-label="Current weather information">
      <p className="title" role="heading" aria-level={1}>
        {city}
      </p>
      <div className="current-weather">
        <div className="current-weather-section">
          <div style={{ whiteSpace: 'nowrap' }}>
            <span
              className="temperature"
              aria-label={`Temperature ${formattedTemp} ${
                isCelsius ? 'Celsius' : 'Fahrenheit'
              }`}
            >
              {formattedTemp}
            </span>
            <button
              onClick={handleToggleUnit}
              className="unit-toggle"
              aria-label="Toggle temperature unit"
            >
              <p>
                <span className={isCelsius ? 'active' : ''}>°C</span>
                {' | '}
                <span className={!isCelsius ? 'active' : ''}>°F</span>
              </p>
            </button>
          </div>
          <p className="humidity" aria-label={`Humidity ${humidity}%`}>
            <span>{`${humidity}%`}</span>
            <span className="humidity-caption">humidity</span>
          </p>
        </div>
        <div className="condition">
          <img
            src={`https:${condition.icon}`}
            alt={condition.text || 'Weather condition'}
            width={64}
            height={64}
          />
        </div>
      </div>
    </section>
  )
}
