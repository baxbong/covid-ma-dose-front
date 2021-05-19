<template>
  <div :style="{backgroundColor: bgColor}">
    <h1>Covid Ma Dose - Rennes</h1>
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
        timer: '',
        bgColor: 'white'
      }
    },

    created () {
      this.fetchEventsList();
      this.timer = setInterval(this.fetchEventsList, 10000);
    },

    methods: {
      fetchEventsList () {
        HTTP({
          method: 'get',
          url: '/rennes'
        }).then(response => {
          this.posts = response.data
          if(this.posts.length > 0) {
            this.bgColor = '#99ccff'
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
      }
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
