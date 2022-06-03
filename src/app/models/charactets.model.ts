export interface CharactersResponseI {
  info: paginationInfo,
  results: CharactetsI[]
}

interface paginationInfo {
  count: number,
  next?: string,
  pages: number,
  prev?: string
}

export interface CharactetsI {
  created: string,
  episode: string[],
  gender: string,
  id: number,
  image: string,
  location: UtilObj,
  name: string,
  origin: UtilObj,
  species: string,
  status: string,
  type: string,
  url: string
}

interface UtilObj {
  name: string,
  url: string
}
