<script setup lang="ts">
const user = useUserStore()
const name = ref('')

function save() {
  if (name.value)
    user.setNewName(name.value as string)
}
</script>

<template>
  <div>
    <input
      id="input"
      v-model="name"
      placeholder="What's your name?"
      type="text" autocomplete="off"
      p="x-4 y-2" m="t-5" w="250px"
      text="center" bg="transparent"
      outline="none active:none"
      @input="save"
    >
  </div>
</template>
