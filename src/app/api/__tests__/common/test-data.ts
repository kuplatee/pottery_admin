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

export const collectionDocs = [
  {
    id: 'col-1',
    data: () => ({
      names: { en: 'Cafe Latte', fi: 'Cafe Latte' },
      description: { en: 'Cozy cafe vibes', fi: 'Kodikas kahvilatunnelma' }
    })
  },
  {
    id: 'col-2',
    data: () => ({
      names: { en: 'Forest', fi: 'Metsä' },
      description: { en: 'Inspired by forests', fi: 'Metsän inspiroimana' }
    })
  }
]

export const pieceDocs = [
  {
    id: 'piece-1',
    data: () => ({
      designId: 'design-1',
      imageFileNames: ['img1.jpg'],
      sold: false,
      collectionId: 'col-1'
    })
  },
  {
    id: 'piece-2',
    data: () => ({
      designId: 'design-2',
      imageFileNames: ['img2.jpg', 'img3.jpg'],
      sold: true
    })
  }
]
