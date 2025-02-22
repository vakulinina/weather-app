import { memo } from 'react'
import { getWeekDay } from '../helpers'
import '../styles/components/DaysForecastCard.scss'
import { ForecastDay } from '../redux/slices/types'

type DayForecastCardProps = {
  forecast: ForecastDay
  isCelsius: boolean
}

const DayForecastCardComponent = ({
  forecast: {
    date,
    day: { mintemp_c, mintemp_f, maxtemp_c, maxtemp_f, condition },
  },
  isCelsius,
  ...props
}: DayForecastCardProps) => {
  const weekDay = getWeekDay(date)
  const minTemp = Math.round(isCelsius ? mintemp_c : mintemp_f)
  const maxTemp = Math.round(isCelsius ? maxtemp_c : maxtemp_f)
  const text = condition.text

  return (
    <article
      className="forecast-day"
      aria-label={`Forecast for ${weekDay}`}
      {...props}
    >
      <p className="week-day">{weekDay}</p>
      <div className="forecast-temp">
        <span aria-label={`High temperature ${maxTemp} degrees`}>
          {`H: ${maxTemp}°`}
        </span>
        <span aria-label={`Low temperature ${minTemp} degrees`}>
          {`L: ${minTemp}°`}
        </span>
      </div>
      <img
        className="forecast-image"
        src={`https:${condition.icon}`}
        alt={text || `Weather condition for ${weekDay}`}
      />
    </article>
  )
}

export const DayForecastCard = memo(DayForecastCardComponent)
