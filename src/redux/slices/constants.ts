import { WeatherState } from './types'

export const INITIAL_STATE: WeatherState = {
  isCelsius: true,
  city: '',
  current: null,
  forecast: [],
  status: 'idle',
  error: null,
}
