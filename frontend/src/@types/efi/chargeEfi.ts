export interface ChargeDetailResponse {
  code: number
  data: ChargeData
}

export interface ChargeData {
  charge_id: number
  total: number
  status: string
  subscription: Subscription
  custom_id: string
  created_at: Date
  notification_url: string
  items: Item[]
  history: History[]
  customer: Customer
  payment: Payment
}

export interface Customer {
  name: string
  cpf: string
  //birth: Date;
  email: string
  phone_number: string
  //address: Address;
}

export interface Address {
  street: string
  number: string
  complement: string | null
  neighborhood: string
  city: string
  state: string
  zipcode: string
}

export interface History {
  message: string
  created_at: Date
}

export interface Item {
  name: string
  value: number
  amount: number
}

export interface Payment {
  method: string
  created_at: Date
  message: string | null
  banking_billet?: BankingBillet
  credit_card?: CreditBillet
}

export interface BankingBillet {
  barcode: string
  pix: Pix
  link: string
  billet_link: string
  pdf: PDF
  expire_at: Date
}

export interface CreditBillet {
  holder_document: string
  holder_name: string
  installment_value: number
  installments: number
  mask: string
}

export interface PDF {
  charge: string
}

export interface Pix {
  qrcode: string
  qrcode_image: string
}

export interface Subscription {
  subscription_id: number
  status: string
  plan_id: number
}
