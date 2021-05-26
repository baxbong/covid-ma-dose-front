<template>
  <b-container >
    <b-jumbotron header="Covid Ma Dose" lead="Réservez votre vaccin rapidement">
      <p><strong>Cliquez sur une ville</strong> (ci-dessus) pour afficher les doses des centres de cette ville. <strong>Activez les notifications</strong> pour être averti dès qu'une dose est disponible. Vous pouvez réduire le navigateur ou changer d'onglet, mais ne fermez pas l'onglet pour être notifié.</p>
      <router-view></router-view>
    </b-jumbotron>
  </b-container>
</template>

<script>

  export default {
    name: 'Home'
  }
</script>

<style scoped>

</style>
