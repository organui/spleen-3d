export type Structure = {
  id: string
  fma: string
  name: string
  sourceName: string
  /** Source STL file name when it differs from the FMA ID. */
  file?: string
  group: 'Spleen' | 'Splenic vessels' | 'Neighbouring organs'
  color: string
  description: string
  note: string
}

export const anatomySource =
  'https://training.seer.cancer.gov/anatomy/lymphatic/components/spleen.html'
export const structures: Structure[] = [
  {
    id: 'spleen',
    fma: 'FMA7196',
    name: 'Spleen',
    sourceName: 'spleen',
    group: 'Spleen',
    color: '#8d4f63',
    description:
      'The largest lymphatic organ. It filters blood, removes worn-out red blood cells, and helps the immune system respond to infection.',
    note: 'One surface mesh. The hilum, poles and borders are not separate structures; the internal red and white pulp is not modelled.',
  },
  {
    id: 'splenic-artery',
    fma: 'FMA14773',
    name: 'Splenic artery',
    sourceName: 'splenic artery',
    group: 'Splenic vessels',
    color: '#c46a5c',
    description:
      'Carries blood from the celiac trunk along the upper border of the pancreas to the spleen.',
    note: 'Its branches to the stomach and pancreas are simplified or omitted. Colors are illustrative.',
  },
  {
    id: 'splenic-vein',
    fma: 'FMA14331',
    name: 'Splenic vein',
    sourceName: 'splenic vein',
    group: 'Splenic vessels',
    color: '#6f8aa6',
    description:
      'Drains blood from the spleen behind the pancreas. It joins the superior mesenteric vein to form the portal vein, which carries it to the liver.',
    note: 'The portal vein itself is not included in this selection.',
  },
  {
    id: 'celiac-trunk',
    fma: 'FMA50737',
    name: 'Celiac trunk',
    sourceName: 'celiac artery',
    group: 'Splenic vessels',
    color: '#d2896f',
    description:
      'A short branch of the abdominal aorta that divides to supply the stomach, liver and spleen. The splenic artery is its largest branch.',
    note: 'The aorta it arises from is omitted, so the trunk ends abruptly.',
  },
  {
    id: 'superior-mesenteric-vein',
    fma: 'FMA14332',
    name: 'Superior mesenteric vein',
    sourceName: 'superior mesenteric vein',
    group: 'Splenic vessels',
    color: '#8ea3b5',
    description:
      'Drains the small intestine and joins the splenic vein behind the neck of the pancreas.',
    note: 'Only a short segment near the splenic vein junction is represented in the source.',
  },
  {
    id: 'stomach',
    fma: 'FMA7148',
    name: 'Stomach',
    sourceName: 'stomach',
    group: 'Neighbouring organs',
    color: '#d3ad94',
    description:
      'Lies in front of and to the right of the spleen. The spleen’s front surface rests against the back of the stomach.',
    note: 'Included for orientation. Hide it to see the spleen from the front.',
  },
  {
    id: 'pancreas',
    fma: 'FMA7198',
    name: 'Pancreas',
    sourceName: 'pancreas, nsn',
    file: 'FMA7198nsn',
    group: 'Neighbouring organs',
    color: '#dcbf7d',
    description:
      'Its tail reaches toward the splenic hilum, and the splenic vessels run along its upper border and back.',
    note: 'Included for orientation. The source file is listed as “pancreas, nsn”; the pancreatic duct is a separate source mesh and is omitted.',
  },
  {
    id: 'left-kidney',
    fma: 'FMA7205',
    name: 'Left kidney',
    sourceName: 'left kidney',
    group: 'Neighbouring organs',
    color: '#a87268',
    description:
      'Sits behind and below the spleen. The spleen’s inner surface touches the upper part of the left kidney.',
    note: 'Included for orientation. Its vessels and ureter are omitted.',
  },
  {
    id: 'left-adrenal',
    fma: 'FMA15630',
    name: 'Left adrenal gland',
    sourceName: 'left adrenal gland',
    group: 'Neighbouring organs',
    color: '#c79a5e',
    description:
      'A small hormone-producing gland on top of the left kidney, close to the spleen’s inner surface.',
    note: 'Included for orientation.',
  },
]
export const groups = ['Spleen', 'Splenic vessels', 'Neighbouring organs'] as const
export const byId = Object.fromEntries(structures.map((s) => [s.id, s]))
export type View = 'Anterior' | 'Posterior' | 'Left lateral'
// From behind, the spleen, its vessels and the kidney are all in view; from
// the front the stomach covers most of the spleen.
export const defaultView: View = 'Posterior'
export const tour: { id: string; title: string; text: string; view: View; isolate?: boolean }[] = [
  {
    id: 'spleen',
    title: 'Tucked under the ribs',
    text: 'The spleen sits high on the left side, behind the stomach and under the lower ribs. From the side you see its smooth outer surface, which faces the diaphragm.',
    view: 'Left lateral',
  },
  {
    id: 'stomach',
    title: 'Its closest neighbour',
    text: 'From the front, the stomach hides most of the spleen. Their surfaces meet where the spleen curves around the back of the stomach.',
    view: 'Anterior',
  },
  {
    id: 'splenic-artery',
    title: 'Blood in',
    text: 'Follow the splenic artery from the celiac trunk along the top of the pancreas. It winds toward the spleen’s inner surface, the hilum.',
    view: 'Posterior',
  },
  {
    id: 'splenic-vein',
    title: 'Blood out, toward the liver',
    text: 'The splenic vein leaves the hilum and runs behind the pancreas until it meets the superior mesenteric vein. Together they form the portal vein, which is not shown.',
    view: 'Posterior',
  },
  {
    id: 'spleen',
    title: 'The organ on its own',
    text: 'Here the spleen is isolated and seen from the front. Its concave inner surface, which faces the stomach, is where the vessels enter and leave. Restore all to bring back its neighbours.',
    view: 'Anterior',
    isolate: true,
  },
]

export type Emphasis = 'normal' | 'selected' | 'ghosted'
// With nothing selected every structure keeps its own color. A selection
// keeps its structure solid and ghosts the rest so it stays visible even
// when it sits behind or inside other geometry (spleen behind the stomach).
export function emphasis(id: string, selected: string | null): Emphasis {
  if (!selected) return 'normal'
  return id === selected ? 'selected' : 'ghosted'
}
