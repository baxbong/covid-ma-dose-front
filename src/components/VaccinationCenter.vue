<template>
  <div :style="{backgroundColor: bgColor}">
    <h1>Covid Ma Dose - {{ this.ville }}</h1>
    <div v-if="vaccinationCenters.length === 0">Aucune chronodose (dose pour aujourd'hui ou demain) disponible à {{ this.ville }} pour l'instant. Patientez...</div>
    <div>Dernière mise à jour le {{ lastUpdate }}</div>
    <div v-for="vc in vaccinationCenters" :key="vc.id">
        <a :href="vc.url ">{{ vc.nom }}</a>
    </div>
  </div>
</template>

<script>
  import {HTTP} from '@/http-common';
  export default {

    props: ['ville'],
    data() {
      return {
        vaccinationCenters: [],
        errors: [],
        lastUpdate: '',
        timer: '',
        bgColor: 'white'
      }
    },

    created () {
      this.requestNotification();
      this.displayVaccinationsCentersWithDose();
      this.timer = setInterval(this.displayVaccinationsCentersWithDose, 10000);
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
          var notification = new Notification("Une nouvelle dose est disponible à " + vc.nom);
          notification.onclick = function(event) {
            event.preventDefault(); // empêcher le navigateur de passer le focus sur l'onglet de la navigation
            window.open(vc.url, '_blank');
          }
        }

        // At last, if the user has denied notifications, and you
        // want to be respectful there is no need to bother them any more.
      },

      displayVaccinationsCentersWithDose () {
        HTTP({
          method: 'get',
          url: this.ville
        }).then(response => {
          var options = {weekday: "long", year: "numeric", month: "long", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit"};
          this.lastUpdate = new Date().toLocaleDateString("fr-FR", options);
          this.vaccinationCenters = response.data
          if(this.vaccinationCenters.length > 0) {
            this.bgColor = '#99ccff'
            this.vaccinationCenters.forEach(vc => this.notifyMe(vc));
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
    name: 'Bonus'
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
