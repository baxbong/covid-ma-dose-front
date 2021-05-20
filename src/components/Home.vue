<template>
  <div>
    <div v-for="city in cities" :key="city.id">
      <ul>
        <VaccinationCenter :city="city.name"/>
      </ul>
    </div>
  </div>
</template>

<script>
  import {HTTP} from '@/http-common';
  import VaccinationCenter from "@/components/VaccinationCenter";
  export default {

    components: {
      VaccinationCenter
    },

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
    name: 'Home'
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h3 {
    margin: 40px 0 0;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #ff0000;
  }

</style>
