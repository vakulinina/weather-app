import '../styles/components/FiveDaysForecast.scss'
import { useSelector } from 'react-redux'
import { DayForecastCard } from './DayForecastCard'
import { WeatherState } from '../redux/slices/types'

export const FiveDaysForecast = () => {
  const { forecast, isCelsius } = useSelector(
    (state: { weather: WeatherState }) => state.weather
  )

  return (
    <section aria-label="5-day weather forecast">
      <p className="forecast-title" role="heading" aria-level={2}>
        5-DAY FORECAST
      </p>
      <div className="forecast-days">
        {forecast.map((day) => (
          <DayForecastCard
            forecast={day}
            isCelsius={isCelsius}
            key={day.date}
          />
        ))}
      </div>
    </section>
  )
}
