import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getForecast } from '../../api'
import { INITIAL_STATE } from './constants'

export const fetchWeatherAsync = createAsyncThunk(
  'weather/fetchWeather',
  async (city: string, { rejectWithValue }) => {
    try {
      if (!city) {
        throw new Error('City name cannot be empty')
      }
      const response = await getForecast(city, 5)
      return response
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Unknown error'
      )
    }
  }
)

export const weatherSlice = createSlice({
  name: 'weather',
  initialState: INITIAL_STATE,
  reducers: {
    toggleUnit: (state) => {
      state.isCelsius = !state.isCelsius
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherAsync.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchWeatherAsync.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.current = action.payload.current
        state.city = action.payload.location.name
        state.forecast = action.payload.forecast.forecastday
      })
      .addCase(fetchWeatherAsync.rejected, (state, action) => {
        state.status = 'failed'
        state.error =
          typeof action.payload === 'string' ? action.payload : 'Unknown error'
      })
  },
})

export const { toggleUnit } = weatherSlice.actions
export default weatherSlice.reducer
