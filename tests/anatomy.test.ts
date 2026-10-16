import { describe, expect, test } from 'bun:test'
import { emphasis, structures } from '../src/anatomy'

describe('selection emphasis', () => {
  test('keeps every structure normal without a selection', () => {
    expect(structures.every((s) => emphasis(s.id, null) === 'normal')).toBe(true)
  })

  test('keeps the selection solid and ghosts everything else', () => {
    const states = structures.map((s) => emphasis(s.id, 'spleen'))
    expect(states.filter((s) => s === 'selected')).toHaveLength(1)
    expect(emphasis('spleen', 'spleen')).toBe('selected')
    expect(emphasis('stomach', 'spleen')).toBe('ghosted')
  })
})
