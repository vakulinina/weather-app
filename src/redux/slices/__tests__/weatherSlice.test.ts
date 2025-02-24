import { describe, expect, it } from 'vitest'
import weatherReducer, { toggleUnit, fetchWeatherAsync } from '../weatherSlice'
import { INITIAL_STATE } from '../constants'

describe('weatherSlice', () => {
  const initialState = INITIAL_STATE

  it('should handle initial state', () => {
    expect(weatherReducer(undefined, { type: 'unknown' })).toEqual(initialState)
  })

  it('should handle toggleUnit', () => {
    const actual = weatherReducer(initialState, toggleUnit())
    expect(actual.isCelsius).toEqual(false)
  })

  it('should handle fetchWeatherAsync.pending', () => {
    const actual = weatherReducer(
      initialState,
      fetchWeatherAsync.pending('', 'London')
    )
    expect(actual.status).toEqual('loading')
    expect(actual.error).toBeNull()
  })

  it('should handle fetchWeatherAsync.fulfilled', () => {
    const mockPayload = {
      location: { name: 'London' },
      current: { temp_c: 20 },
      forecast: { forecastday: [] },
    }

    const actual = weatherReducer(
      initialState,
      fetchWeatherAsync.fulfilled(mockPayload, '', 'London')
    )

    expect(actual.status).toEqual('succeeded')
    expect(actual.city).toEqual('London')
  })
})
