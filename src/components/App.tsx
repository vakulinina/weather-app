import '../styles/components/App.scss'
import { SearchInput } from './SearchInput'
import { CurrentWeather } from './CurrentWeather'
import { FiveDaysForecast } from './FiveDaysForecast'
import { useSelector } from 'react-redux'
import { WeatherState } from '../redux/slices/types'
import { Loader } from './Loader'

function App() {
  const { status, error } = useSelector(
    (state: { weather: WeatherState }) => state.weather
  )

  const statusContent = {
    loading: <Loader role="status" aria-live="polite" aria-busy={true} />,
    failed: <p role="alert">{error}</p>,
    idle: (
      <p role="status" aria-live="polite">
        Enter a city name to get started
      </p>
    ),
    succeeded: (
      <>
        <CurrentWeather />
        <FiveDaysForecast />
      </>
    ),
  }

  return (
    <main className="app">
      <SearchInput />
      {statusContent[status]}
    </main>
  )
}

export default App
