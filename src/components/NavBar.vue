<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand to="/">Covid Ma Dose</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item v-for="city in cities" :key="city.id" :to="`/cities/${city.name}`">{{ city.name }}</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <router-view></router-view>
  </div>
</template>

<script>
  import {HTTP} from '@/http-common';

  export default {

    data() {
      return {
        cities: [],
        errors: []
      }
    },

    created () {
      this.displayCities();
    },

    methods: {

      displayCities () {
        HTTP({
          method: 'get',
          url: "/cities/"
        }).then(response => {
          this.cities = response.data
        })
        .catch(e => {
          this.errors.push(e)
        })
      }
    },
    name: 'Navbar'
  }
</script>

<style scoped>


</style>
