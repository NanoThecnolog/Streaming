export interface CepSearchingResponse {
  cep: string
  logradouro: string
  complemento: string
  bairro: string
  localidade: string
  uf: string
  estado: string
  regiao: string
  ibge: string
  gia: string
  ddd: string
  siafi: string
  unidade: string
  erro?: boolean
}

export interface CepSearchError {
  erro: boolean
}
