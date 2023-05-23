<script>
export default {
  data() {
    return {
      filtroNombre: "",
      navbarOpen: false,
      dropdownOpen: false,
    };
  },
  methods: {
    buscarProductos() {
      this.$router.replace({
        name: "Bienvenido",
        query: { filtroNombre: this.filtroNombre },
      });
    },
  },
};
</script>

<template>
  <nav class="navbar navbar-expand-lg bd-navbar sticky-top">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">
        <img
          src="../assets/logoBP.png"
          alt="BestPrice"
          width="50"
          height="50"
        />
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div
        class="collapse navbar-collapse"
        :class="{ show: navbarOpen }"
        id="navbarSupportedContent"
      >
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link
              class="nav-link active"
              aria-current="page"
              to="/"
              exact-active-class="active"
              style="
                font-weight: bold;
                color: #000;
                font-family: 'Arial Black', sans-serif;
              "
              >Home</router-link
            >
          </li>

          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              style="
                font-weight: bold;
                color: #000;
                font-family: 'Arial Black', sans-serif;
              "
            >
              Gestión
            </a>
            <ul class="dropdown-menu" :class="{ show: dropdownOpen }">
              <!-- <li>
                <router-link
                  class="dropdown-item"
                  to="/originales"
                  style="font-weight: bold"
                  >Productos Originales</router-link
                >
              </li> -->
              <li>
                <router-link
                  class="dropdown-item"
                  to="/blancas"
                  style="font-weight: bold"
                  >Productos
                </router-link>
              </li>
              <li>
                <router-link
                  class="dropdown-item"
                  to="/fisica"
                  style="font-weight: bold"
                  >Tiendas</router-link
                >
              </li>
              <li>
                <router-link
                  class="dropdown-item"
                  to="/propio"
                  style="font-weight: bold"
                  >Estanteria</router-link
                >
              </li>
              <li>
                <hr class="dropdown-divider" />
              </li>
            </ul>
          </li>
        </ul>
        <form class="d-flex" role="search" @submit.prevent="buscarProductos">
          <input
            ref="searchInput"
            class="form-control me-2"
            type="search"
            placeholder="Buscador"
            aria-label="Search"
            v-model="filtroNombre"
          />
          <button class="btn btn-outline-success" type="submit">Buscar</button>
        </form>
      </div>
    </div>
  </nav>
</template>

<style scoped>
nav {
  background: linear-gradient(to right, #09e05f, #f78f2d);
  color: #fff;
  display: flex;
  justify-content: space-between;
  margin-top: -1.5vw;
  width: 100%;
}

.nav-link {
  font-size: 1.2rem;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

li {
  display: inline-block;
  margin-right: 1rem;
}

a {
  color: #fff;
  text-decoration: none;
  font-size: 1.2rem;
}

.navbar-brand img {
  margin-top: -0.5vw;
}

.navbar-toggler {
  border: none;
  background: transparent;
  color: #fff;
}

.dropdown-menu {
  background-color: #ffffff;
}

.dropdown-item {
  color: #030000;
}

.dropdown-divider {
  background-color: #fff;
}

.form-control {
  width: 15rem;
}

.btn-outline-success {
  color: #fff;
  border-color: #fff;
}

.dropdown-toggle {
  cursor: pointer;
}
</style>
