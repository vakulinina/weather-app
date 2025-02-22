export type CurrentWeather = {
  temp_c: number
  temp_f: number
  humidity: number
  condition: {
    text: string
    icon: string
  }
}

export type ForecastDay = {
  date: string
  day: {
    maxtemp_c: number
    mintemp_c: number
    maxtemp_f: number
    mintemp_f: number
    condition: {
      text: string
      icon: string
    }
  }
}

export type WeatherState = {
  isCelsius: boolean
  city: string
  current: CurrentWeather | null
  forecast: ForecastDay[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}
