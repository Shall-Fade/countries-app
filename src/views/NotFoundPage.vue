<template>
  <div class="error-page-container">
    <div class="error-page-group">
      <h1 class="error-page-title">404 - Not Found</h1>
      <button @click="$router.push('/')" class="error-page-btn">
        <i class="fa-solid fa-arrow-left-long"></i>Go Home
      </button>
    </div>
    <img
      class="error-page-img"
      src="../assets/images/404-not-found.png"
      alt="Not Found"
    />
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.error-page-container {
  height: 85vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.error-page-group {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.error-page-title {
  font-size: 62px;
  color: var(--c-text);
}
.error-page-btn {
  display: flex;
  align-items: center;
  margin-top: 50px;
  background-color: var(--c-elements);
  font-size: 18px;
  padding: 15px 60px;
  border-radius: 50px;
  box-shadow: 0 0 10px var(--c-shadow);
  transition: 0.3s ease;
}
.error-page-btn:hover {
  box-shadow: 0 0 30px 0 var(--c-shadow);
}
.error-page-btn i {
  padding-right: 15px;
}
.error-page-img {
  width: 700px;
}
</style>
