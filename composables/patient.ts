import { acceptHMRUpdate, defineStore } from 'pinia'

export const usePatientStore = defineStore('patient', () => {
  const patient = ref({
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
    patient.value = {...patient.value, ...newData}

    // Add the updated patient to the recent patients list.
    recentPatients.value.unshift(patient.value)

    // Limit the list to the last 5 patients.
    if (recentPatients.value.length > 5) {
      recentPatients.value.pop()
    }
  }

  return {
    patient,
    recentPatients,
    setPatientData,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(usePatientStore, import.meta.hot))
