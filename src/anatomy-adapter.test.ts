import { describe, expect, test } from 'bun:test'
import {
  anatomyTree,
  assertAnatomyMapping,
  groupIds,
  hiddenFromVisibility,
  normalizeVisibility,
  sceneIdsForNode,
  visibilityFromHidden,
} from './anatomy-adapter'
import { structures } from './anatomy'

describe('anatomy tree adapter', () => {
  test('groups every structure exactly once under interface group rows', () => {
    expect(groupIds).toEqual(['group-spleen', 'group-splenic-vessels', 'group-neighbouring-organs'])
    expect(anatomyTree.flatMap((group) => group.children!.map(({ id }) => id)).sort()).toEqual(
      structures.map(({ id }) => id).sort(),
    )
  })

  test('marks group rows as non-selectable and colours leaves like their meshes', () => {
    for (const group of anatomyTree) {
      expect(group.selectable).toBe(false)
      expect(group.color).toBeUndefined()
      for (const leaf of group.children!) {
        expect(leaf.selectable).toBeUndefined()
        expect(leaf.color).toBe(structures.find(({ id }) => id === leaf.id)!.color)
      }
    }
  })

  test('maps group rows to their scene leaves and leaves to themselves', () => {
    expect(sceneIdsForNode('group-splenic-vessels')).toEqual([
      'splenic-artery',
      'splenic-vein',
      'celiac-trunk',
      'superior-mesenteric-vein',
    ])
    expect(sceneIdsForNode('splenic-vein')).toEqual(['splenic-vein'])
    expect(sceneIdsForNode('unknown')).toEqual([])
    expect(sceneIdsForNode(null)).toEqual([])
  })

  test('treats missing visibility entries as visible', () => {
    const visibility = normalizeVisibility({ stomach: false })
    expect(visibility.stomach).toBe(false)
    expect(visibility.spleen).toBe(true)
    expect(Object.keys(visibility)).toHaveLength(structures.length)
  })

  test('round-trips the hidden set through the tree visibility map', () => {
    const hidden = new Set(['stomach', 'pancreas'])
    const visibility = visibilityFromHidden(hidden)
    expect(visibility).toEqual({ stomach: false, pancreas: false })
    expect(hiddenFromVisibility(visibility)).toEqual(hidden)
    expect(hiddenFromVisibility({ spleen: true })).toEqual(new Set())
  })

  test('rejects missing, unknown, and duplicate leaves', () => {
    expect(() => assertAnatomyMapping()).not.toThrow()
    const [first, ...rest] = anatomyTree
    expect(() => assertAnatomyMapping(rest)).toThrow(/missing=spleen/)
    expect(() =>
      assertAnatomyMapping([...anatomyTree, { id: 'splenic-hilum', label: 'Splenic hilum' }]),
    ).toThrow(/unknown=splenic-hilum/)
    expect(() =>
      assertAnatomyMapping([...anatomyTree, { id: 'g', label: 'Again', children: [first] }]),
    ).toThrow(/duplicates=spleen/)
  })
})
