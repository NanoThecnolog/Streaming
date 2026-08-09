import { blockedDomains, fakePatterns } from '@/utils/Variaveis'

interface PersonalDataValidation {
  name: string
  cpf: string
  phoneNumber: string
  password: string
  confirmPassword: string
}

interface CreditCardValidation {
  holderName: string
  holderDocument: string
  number: string
  expiryMonth: string
  expiryYear: string
  cvv: string
}

export class Validate {
  private static readonly emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  private static onlyNumbers(value: string): string {
    return value.replace(/\D/g, '')
  }

  static email(email: string): boolean {
    const normalizedEmail = email.trim().toLowerCase()

    if (!this.emailRegex.test(normalizedEmail)) {
      return false
    }

    const [user, domain] = normalizedEmail.split('@')

    if (!user || !domain) {
      return false
    }

    const environment = process.env.NEXT_PUBLIC_DEBUG

    if (environment === 'production' && blockedDomains.includes(domain)) {
      return false
    }

    if (user.length < 3 || domain.length < 5) {
      return false
    }

    if (fakePatterns.some((pattern) => user.includes(pattern.toLowerCase()))) {
      return false
    }

    return true
  }

  static samePassword(password: string, confirmation: string): boolean {
    return password === confirmation
  }

  static fullName(name: string): boolean {
    const parts = name.trim().split(/\s+/).filter(Boolean)

    return parts.length >= 2 && parts.every((part) => part.length >= 2)
  }

  static cpf(cpf: string): boolean {
    if (cpf === '') return false
    const cleaned = this.onlyNumbers(cpf)

    if (cleaned.length !== 11) {
      return false
    }

    if (/^(\d)\1{10}$/.test(cleaned)) {
      return false
    }

    let sum = 0

    for (let index = 0; index < 9; index++) {
      sum += Number(cleaned[index]) * (10 - index)
    }

    let firstDigit = (sum * 10) % 11

    if (firstDigit === 10) {
      firstDigit = 0
    }

    if (firstDigit !== Number(cleaned[9])) {
      return false
    }

    sum = 0

    for (let index = 0; index < 10; index++) {
      sum += Number(cleaned[index]) * (11 - index)
    }

    let secondDigit = (sum * 10) % 11

    if (secondDigit === 10) {
      secondDigit = 0
    }

    return secondDigit === Number(cleaned[10])
  }

  static phone(value: string): boolean {
    const phone = value.replace(/\D/g, '')

    if (!/^[1-9]{2}9\d{8}$/.test(phone)) {
      return false
    }

    if (/^(\d)\1+$/.test(phone)) {
      return false
    }

    return true
  }

  static cep(cep: string): boolean {
    const cleaned = this.onlyNumbers(cep)

    return cleaned.length === 8
  }

  static password(password: string): boolean {
    return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/.test(password)
  }

  static cardHolderName(holderName: string): boolean {
    const normalized = holderName.trim()

    if (normalized.length < 3) {
      return false
    }

    return /^[\p{L}\s.'-]+$/u.test(normalized)
  }
  static cardHolderDocument(holderDocument: string): boolean {
    return this.cpf(holderDocument)
  }

  static creditCardNumber(cardNumber: string): boolean {
    const cleaned = this.onlyNumbers(cardNumber)

    if (cleaned.length < 13 || cleaned.length > 19) {
      return false
    }

    if (/^(\d)\1+$/.test(cleaned)) {
      return false
    }

    /*
     * Algoritmo de Luhn.
     * Detecta diversos erros de digitação,
     * mas não confirma que o cartão existe.
     */
    let sum = 0
    let shouldDouble = false

    for (let index = cleaned.length - 1; index >= 0; index--) {
      let digit = Number(cleaned[index])

      if (shouldDouble) {
        digit *= 2

        if (digit > 9) {
          digit -= 9
        }
      }

      sum += digit
      shouldDouble = !shouldDouble
    }

    return sum % 10 === 0
  }

  static cardExpiry(expiryMonth: string, expiryYear: string): boolean {
    if (!/^\d{2}$/.test(expiryMonth) || !/^\d{4}$/.test(expiryYear)) {
      return false
    }

    const month = Number(expiryMonth)
    const year = Number(expiryYear)

    if (month < 1 || month > 12) {
      return false
    }

    const now = new Date()
    const currentMonth = now.getMonth() + 1
    const currentYear = now.getFullYear()

    return year > currentYear || (year === currentYear && month >= currentMonth)
  }

  static cvv(cvv: string): boolean {
    const cleaned = this.onlyNumbers(cvv)

    return /^\d{3,4}$/.test(cleaned)
  }

  static addressNumber(addressNumber: string): boolean {
    const normalized = addressNumber.trim()

    if (normalized.length < 1 || normalized.length > 20) {
      return false
    }

    /*
     * Aceita valores como:
     * 123
     * 123-A
     * S/N
     */
    return /^[\p{L}\p{N}./-]+$/u.test(normalized)
  }

  static personalData(data: PersonalDataValidation): boolean {
    return (
      this.fullName(data.name) && this.cpf(data.cpf) && this.phone(data.phoneNumber) /*&&
            this.password(data.password) &&
            data.password === data.confirmPassword*/
    )
  }
  /*static password(value: string): boolean {
        return value.length >= 8
    }*/

  static creditCard(creditCard: CreditCardValidation): boolean {
    return (
      this.cardHolderName(creditCard.holderName) &&
      this.cardHolderDocument(creditCard.holderDocument) &&
      this.creditCardNumber(creditCard.number) &&
      this.cardExpiry(creditCard.expiryMonth, creditCard.expiryYear) &&
      this.cvv(creditCard.cvv)
    )
  }
}
