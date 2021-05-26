<template>
  <b-container :style="{backgroundColor: bgColor}">
    <h1>{{ $route.params.city }}</h1>
    <h2>Centres de vaccinations</h2>
    <pre><label v-for="vc in vaccinationCenters" :key="vc.id"><a target="_blank" :href="vc.url">{{ vc.name }}</a> </label></pre>
    <h2>Doses disponibles à {{ $route.params.city }}</h2>
    <div>Dernière mise à jour le <strong>{{ lastUpdate }}</strong></div>
    <div v-if="vaccinationCentersWithDose.length === 0">Aucune chronodose (dose pour aujourd'hui ou demain) disponible à {{ $route.params.city }} pour l'instant. Patientez...</div>
    <div v-for="vc in vaccinationCentersWithDose" :key="vc.id">
      <a target="_blank" :href="vc.url ">{{ vc.name }}</a>
    </div>
  </b-container>
</template>

<script>
  import {HTTP} from '@/http-common';
  export default {

    data() {
      return {
        vaccinationCenters:[],
        vaccinationCentersWithDose: [],
        errors: [],
        lastUpdate: '',
        timer: '',
        bgColor: 'white'
      }
    },

    created () {
      this.requestNotification();
      this.displayAllVaccinationsCenters();
      this.displayVaccinationsCentersWithDose();
      this.timer = setInterval(this.displayVaccinationsCentersWithDose, 10000);
    },

    asyncComputed: {
      async getAllVaccinationCenters() {
        return await HTTP({
          method: 'get',
          url: "/vaccination-centers/" + this.$route.params.city
        }).then(response => {
          this.vaccinationCenters = response.data
        })
        .catch(e => {
          this.errors.push(e)
        })
      }
    },

    methods: {

      requestNotification() {
        Notification.requestPermission();
      },

      notifyMe(vc) {
        // Let's check if the browser supports notifications
        if (!("Notification" in window)) {
          alert("This browser does not support desktop notification");
        }

        // Let's check whether notification permissions have already been granted
        else if (Notification.permission === "granted") {
          // If it's okay let's create a notification
          var notification = new Notification(vc.name);
          notification.onclick = function(event) {
            event.preventDefault(); // empêcher le navigateur de passer le focus sur l'onglet de la navigation
            window.open(vc.url, '_blank');
          }
        }
      },

      displayAllVaccinationsCenters() {

        HTTP({
          method: 'get',
          url: "/vaccination-centers/" + this.$route.params.city
        }).then(response => {
          this.vaccinationCenters = response.data
        })
        .catch(e => {
          this.errors.push(e)
        })

      },

      displayVaccinationsCentersWithDose () {
        HTTP({
          method: 'get',
          url: "/chronodoses/" + this.$route.params.city
        }).then(response => {
          var options = {weekday: "long", year: "numeric", month: "long", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit"};
          this.lastUpdate = new Date().toLocaleDateString("fr-FR", options);
          this.vaccinationCentersWithDose = response.data
          if(this.vaccinationCentersWithDose.length > 0) {
            this.bgColor = '#99ccff'
            this.vaccinationCentersWithDose.forEach(vc => this.notifyMe(vc));
          } else {
            this.bgColor = 'white'
          }
        })
        .catch(e => {
          this.errors.push(e)
        })
      },
      cancelAutoUpdate () {
        clearInterval(this.timer);
      },
    },
    beforeDestroy () {
      this.cancelAutoUpdate();
    },
    name: 'VaccinationCenter'
  }
</script>

<style scoped>


</style>
