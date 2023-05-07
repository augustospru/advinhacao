<script setup>
import { ref } from 'vue';
import Button from "primevue/button";
import InputText from 'primevue/inputtext';
import { socket } from '../main.js';

const characterTried  = ref(false);
let lose = ref(false);
let win = ref(false);
const character = ref("a");
character.value = null;
let listCharacters =  [];
let count = ref(0);
count.value = parseInt(props.word.slice(props.word.indexOf("],")+2));
console.log(count.value);
let answer = ref({});
answer.value = props.word.slice(1, props.word.indexOf("],"));
console.log(answer.value);

const props = defineProps({
  word: {
    type: String,
    required: true
  },
  hint: {
    type: String,
    required: true
  }
});

const sendCharacter = () => {
  if (listCharacters.find(element => element === character.value)) { characterTried.value = true }
  else if(character.value) {
    characterTried.value = false;
    listCharacters.push(character.value);
    socket.emit('temptative', { char: character.value });
  }
  character.value = null;
}
socket.on('word', (msg) => {
  const split = msg.word.indexOf("],")
  answer.value = msg.word.slice(1, split)
  count.value = parseInt(msg.word.slice(split+2));
  if (answer.value.match('_') <= 0) {
    win.value = true;
    lose.value = false;
  } else if (count.value <= 0) {
    win.value = false;
    lose.value = true;
  } else {
    win.value = false;
    lose.value = false;
  }
});

const reloadPage = () => {window.location.reload();};

</script>

<template>
  <h1>Adivinhe!</h1>
  <h2>dica: {{ hint }}</h2>
  
  <h2>
      <span> {{ answer }} </span>
  </h2>

  <div>
    <h1>Vidas restantes: {{ count }}</h1>
  
    <InputText autofocus type="text" v-model="character" placeholder="Character" maxlength="1" v-on:keyup.enter="sendCharacter" :disabled="win || lose" />
    <Button label="Envia" :disabled="win || lose || !character" v-on:click="sendCharacter" style="margin-left: 5px" />
  </div>
  
  <div>
    <span v-for="character in listCharacters" :key="character">
      <span>{{ character }}, </span>
    </span>
  </div>
  <div> 
    <h2 v-if="win">Voce ganhou! 🥳</h2>
    <h2 v-if="lose">Voce perdeu!</h2>
    <Button v-if="win || lose" label="Novo jogo" v-on:click="reloadPage"/>
    <h2 v-if="characterTried">Character repetido</h2>
  </div>

</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
  text-align: center;
}

h2,
div {
  text-align: center;
}
</style>
