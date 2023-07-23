import { acceptHMRUpdate, defineStore } from 'pinia'
import type { Patient } from '@/types/Patient'

export const usePatientStore = defineStore('patient', () => {
  const patient: Ref<Patient> = ref({
    firstname: '',
    lastname: '',
    ahvNumber: '',
    dateOfBirth: null,
    gender: '',
    phone: '',
    email: '',
    address: {
      streetName: '',
      streetNumber: '',
      postalCode: '',
      city: '',
      canton: '',
    },
  })

  const recentPatients = ref([])

  function setPatientData(newData) {
    // Set a copy of new data to avoid mutating original data
    patient.value = { ...patient.value, ...JSON.parse(JSON.stringify(newData)) }

    // Add the updated patient to the recent patients list.
    recentPatients.value.unshift(patient.value)

    // Limit the list to the last 5 patients.
    if (recentPatients.value.length > 5)
      recentPatients.value.pop()
  }

  function clearPatientData() {
    patient.value = {
      firstname: '',
      lastname: '',
      ahvNumber: '',
      dateOfBirth: null,
      gender: '',
      phone: '',
      email: '',
      address: {
        streetName: '',
        streetNumber: '',
        postalCode: '',
        city: '',
        canton: '',
      },
    }
  }

  return {
    patient,
    recentPatients,
    setPatientData,
    clearPatientData,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(usePatientStore, import.meta.hot))
