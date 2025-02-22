const API_KEY = import.meta.env.VITE_API_KEY
const API_BASE_URL = 'https://api.weatherapi.com/v1'

if (!API_KEY) {
  throw new Error('API key is not set')
}

export const getForecast = async (city: string, days = 5) => {
  const response = await fetch(
    `${API_BASE_URL}/forecast.json?key=${API_KEY}&q=${city}&days=${days}`
  )

  const data = await response.json()

  if (!response.ok) {
    const errorMessage = data.error?.message
    throw new Error(errorMessage)
  }

  return data
}
