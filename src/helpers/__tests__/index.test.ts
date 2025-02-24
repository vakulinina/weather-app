import { getWeekDay } from '../index'
import { describe, expect, it } from 'vitest'

describe('getWeekDay', () => {
  it('returns correct day for given date', () => {
    expect(getWeekDay('2024-03-20')).toBe('Wed')
    expect(getWeekDay('2024-03-21')).toBe('Thu')
    expect(getWeekDay('2024-03-22')).toBe('Fri')
    expect(getWeekDay('')).toBe('')
  })
})
