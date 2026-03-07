export const categoryDocs = [
  { id: 'cat-1', data: () => ({ names: { en: 'Cups', fi: 'Kupit' } }) },
  { id: 'cat-2', data: () => ({ names: { en: 'Bowls', fi: 'Kulhot' } }) },
  { id: 'cat-3', data: () => ({ names: { en: 'Plates', fi: 'Lautaset' } }) }
]

export const designDocs = [
  {
    id: 'design-1',
    data: () => ({
      names: { en: 'Wave', fi: 'Aalto' },
      categoryIds: ['cat-1'],
      description: { en: 'A wave pattern', fi: 'Aalto-kuvio' },
      details: { en: { height: '10cm' }, fi: { korkeus: '10cm' } }
    })
  },
  {
    id: 'design-2',
    data: () => ({
      names: { en: 'Stone', fi: 'Kivi' },
      categoryIds: ['cat-1', 'cat-2'],
      description: { en: 'A stone texture', fi: 'Kivi-rakenne' },
      details: { en: { width: '8cm' }, fi: { leveys: '8cm' } }
    })
  }
]
