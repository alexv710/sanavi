export interface Address {
  streetName: string
  streetNumber: string
  postalCode: string
  city: string
  canton: string
}

export interface Patient {
  firstname: string
  lastname: string
  ahvNumber: string
  dateOfBirth: string | null
  gender: string
  phone: string
  email: string
  address: Address
}
