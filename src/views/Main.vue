<template></template>

<script setup>
import { ref } from "vue";

const loading = ref(false);
function load() {
  loading.value = true;
  setTimeout(() => (loading.value = false), 3000);
}
</script>
