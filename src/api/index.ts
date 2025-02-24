const API_KEY = import.meta.env.VITE_API_KEY
const API_BASE_URL = 'https://api.weatherapi.com/v1'

if (!API_KEY) {
  throw new Error('API key is not set')
}

export const getForecast = async (city: string, days = 5) => {
  const params = new URLSearchParams({
    key: API_KEY,
    q: city,
    days: days.toString(),
  })

  const response = await fetch(`${API_BASE_URL}/forecast.json?${params}`)

  const data = await response.json()

  if (!response.ok) {
    const errorMessage = data.error?.message
    throw new Error(errorMessage)
  }

  return data
}
