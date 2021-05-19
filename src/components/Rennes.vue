<template>
  <div :style="{backgroundColor: bgColor}">
    <h1>Covid Ma Dose - Rennes</h1>
    <div v-if="posts.length !== 0">Aucune dose disponible à Rennes pour l'instant. Patientez...</div>
    <div>Dernière mise à jour le {{ lastUpdate }}</div>
    <div v-for="doctolink in posts" :key="doctolink.id">
        <a :href="doctolink.url ">{{ doctolink.nom }}</a>
    </div>
  </div>
</template>

<script>
  import {HTTP} from '@/http-common';
  export default {

    data() {
      return {
        posts: [],
        errors: [],
        lastUpdate: '',
        timer: '',
        bgColor: 'white'
      }
    },

    created () {
      this.fetchEventsList();
      this.timer = setInterval(this.fetchEventsList, 10000);
    },

    methods: {

      notifyMe() {
        // Let's check if the browser supports notifications
        if (!("Notification" in window)) {
          alert("This browser does not support desktop notification");
        }

        // Let's check whether notification permissions have already been granted
        else if (Notification.permission === "granted") {
          // If it's okay let's create a notification
          var notification = new Notification("Une nouvelle dose est disponible");
          notification.onclick = function(event) {
            event.preventDefault(); // empêcher le navigateur de passer le focus sur l'onglet de la navigation
            window.open('https://covid-ma-dose.herokuapp.com/', '_blank');
          }
        }

        // Otherwise, we need to ask the user for permission
        else if (Notification.permission !== "denied") {
          Notification.requestPermission().then(function (permission) {
            // If the user accepts, let's create a notification
            if (permission === "granted") {
              new Notification("Une nouvelle dose est disponible");
            }
          });
        }

        // At last, if the user has denied notifications, and you
        // want to be respectful there is no need to bother them any more.
      },

      fetchEventsList () {
        HTTP({
          method: 'get',
          url: '/rennes'
        }).then(response => {
          var options = {weekday: "long", year: "numeric", month: "long", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit"};
          this.lastUpdate = new Date().toLocaleDateString("fr-FR", options);
          this.posts = response.data
          if(this.posts.length > 0) {
            this.bgColor = '#99ccff'
            this.notifyMe();
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
