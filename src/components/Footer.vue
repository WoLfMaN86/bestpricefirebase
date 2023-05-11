<template>
  <footer class="footer">
    <div class="container">
      <p class="text-center">
        Todos los derechos reservados &copy; {{ currentYear }} BestPrice
      </p>
    </div>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      currentYear: new Date().getFullYear(),
    };
  },
};
</script>

<style scoped>
.footer {
  background-color: #f8f9fa;
  padding: 1rem;
  margin-top: auto;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.text-center {
  text-align: center;
}
</style>
