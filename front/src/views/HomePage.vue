<script setup>
import HelloWorld from '../components/HelloWorld.vue'
import TheGame from '../components/theGame.vue'
import { ref } from 'vue';

const word = ref({word: null, hint: null})

//ws client
import { socket } from '../main.js'
socket.on('init', (msg) => { word.value = msg; });
</script>

<template>
  <header>
    <img alt="Sua Bola de Cristal" class="logo" src="../assets/bolaCristal.png" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld />
    </div>
    
  </header>
  
  <main>
    <TheGame v-if="word.word" :word=word.word :hint=word.hint />
    <h1 style="text-align: center;" v-else>Erro ao tentar conectar com o back</h1>
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>