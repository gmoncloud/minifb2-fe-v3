<template>
  <div>
  </div>
</template>

<script>
export default {
  name: 'toaster-modal',
  mounted() {
    this.$toast.open({
      message: "Test message from Vue",
      type: "success",
      duration: 5000,
      dismissible: true
    })
  }
}
</script>

<style scoped>

</style>