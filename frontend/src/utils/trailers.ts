type ContentType = 'movie' | 'tv'

export interface HeroItem {
  id: number
  type: ContentType
  //url: string
}
export const trailerIds: HeroItem[] = [
  {
    id: 1081003, //supergirl
    type: 'movie',
    //url: ''
  },
  {
    id: 287620, //stuart
    type: 'tv',
    //url: ''
  },
  {
    id: 454639, //he man
    type: 'movie',
    //url: ''
  },
  {
    id: 287238, //furia
    type: 'tv',
    //url: ''
  },
  {
    id: 1314481, //devil veste prada 2
    type: 'movie',
    ///url: ''
  },
  {
    id: 125988, //silo
    type: 'tv',
    //url: ''
  },
  {
    id: 278624, //lucky
    type: 'tv',
    //url: ''
  },
  {
    id: 1275779, //dia D merda
    type: 'movie',
    //url: ''
  },
  {
    id: 94997, //casa do drag
    type: 'tv',
    //url: ''
  },
  {
    id: 1339713, //obsessao
    type: 'movie',
    //url: ''
  },
  {
    id: 113962, //lioness
    type: 'tv',
    //url: ''
  },
  {
    id: 1083381, //backroom
    type: 'movie',
    //url: ''
  },
]
