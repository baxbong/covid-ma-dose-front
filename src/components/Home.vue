<template>
  <div>
    <h1>Covid Ma Dose - Liste des villes</h1>
    <p><b>Cliquez sur une ville</b> pour afficher les doses des centres de cette ville. <b>Activez les notifications</b> pour être averti dès qu'une dose est disponible. Vous pouvez réduire le navigateur ou changer d'onglet, mais ne fermez pas l'onglet pour être notifié.</p>
    <div v-for="city in cities" :key="city.id">
      <h2><router-link :to="city.name">{{ city.name }}</router-link></h2>
      <label v-for="vc in city.vaccinationCenters" :key="vc.id"><a target="_blank" :href="vc.url">{{ vc.name }}</a> | </label>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  import {HTTP} from '@/http-common';
  // import VaccinationCenter from "@/components/VaccinationCenter";
  export default {

    // components: {
    //   VaccinationCenter
    // },

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

  h2 a {
    color: #ff0000;
  }

</style>
