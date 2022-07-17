<template>
  <div class="back-container">
    <a class="back-btn" @click="$router.go(-1)">
      <i class="fa-solid fa-arrow-left-long"></i>
      Back
    </a>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.back-container {
  margin: 50px 0;
}
.back-btn {
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  background-color: var(--c-elements);
  padding: 10px 35px;
  box-shadow: 0 0 10px var(--c-shadow);
  border-radius: 5px;
  transition: 0.3s ease;
}
.back-btn:hover {
  box-shadow: 0 0 30px 0 var(--c-shadow);
}
.back-btn i {
  padding-right: 5px;
}
</style>
