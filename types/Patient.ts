export interface Patient {
  id?: string
  firstname: string
  lastname: string
  gender: string
  email: string
  phone: string
  ahvNumber: string
  dateOfBirth: string | null
  streetName: string
  streetNumber: string
  postalCode: string
  city: string
  canton: string
}
