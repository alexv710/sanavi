<script setup lang="ts">
const user = useUserStore()
</script>

<template>
  <div>
    <div i-twemoji:waving-hand inline-block animate-shake-x animate-duration-5000 text-4xl />
    <h3 text-2xl font-500>
      Hi, {{ user.savedName }}
    </h3>
    <div text-xl>
        Please add a new Patient 
    </div>
    <PatientForm></PatientForm>
    <div>
      <NuxtLink
        class="m-3 text-sm btn"
        to="/"
      >
        Back
      </NuxtLink>
    </div>
  </div>
</template>
