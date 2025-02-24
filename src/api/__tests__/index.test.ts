import { describe, expect, it, beforeAll, afterAll, afterEach } from 'vitest'
import { setupServer } from 'msw/node'
import { http, HttpResponse } from 'msw'
import { getForecast } from '../index'

const server = setupServer(
  http.get('*/forecast.json', ({ request }) => {
    const query = new URL(request.url).searchParams.get('q')

    if (query === 'InvalidCity') {
      return HttpResponse.json(
        {
          error: {
            code: 1006,
            message: 'No matching location found.',
          },
        },
        {
          status: 400,
        }
      )
    }

    return HttpResponse.json({
      forecast: {
        forecastday: Array(
          Number(new URL(request.url).searchParams.get('days')) || 5
        ).fill({
          date: '2024-03-20',
          day: {
            maxtemp_c: 20,
            mintemp_c: 10,
          },
        }),
      },
    })
  })
)

// Start server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))

// Reset handlers after each test
afterEach(() => server.resetHandlers())

// Clean up after all tests
afterAll(() => server.close())

describe('getForecast', () => {
  it('should make a request to the correct URL', async () => {
    import.meta.env.VITE_API_KEY = 'test-api-key'
    expect(import.meta.env.VITE_API_KEY).toBe('test-api-key')

    let requestUrl: string | undefined
    server.events.on('request:start', ({ request }) => {
      requestUrl = request.url
    })

    await getForecast('London', 3)
    expect(requestUrl).toEqual(
      'https://api.weatherapi.com/v1/forecast.json?key=test-api-key&q=London&days=3'
    )
  })

  it('should fetch forecast', async () => {
    const forecast = await getForecast('London', 3)
    expect(forecast).toBeDefined()
    expect(forecast.forecast.forecastday.length).toBe(3)
  })

  it('should throw an error if the city is not found', async () => {
    await expect(getForecast('InvalidCity')).rejects.toThrow(
      'No matching location found.'
    )
  })

  it('should send default 5 days forecast if no days are provided', async () => {
    const forecast = await getForecast('London')
    expect(forecast.forecast.forecastday.length).toBe(5)
  })
})
