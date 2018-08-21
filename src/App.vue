<template>
  <div id="app">
    <div>
      <label for="Nome:"></label>
      <input type="text" v-model="name">
      <label for="Sobrenome:"></label>
      <input type="text" v-model="sobrenome">
      <button @click="submitName">Add</button>
    </div>
    <div>
      <ul>
        <li v-for="personName in nomes" :key="personName['.key']">
          <div v-if="!personName.edit">
            <p>{{personName.name}}</p>
          <button @click="remover(personName['.key'])">Remover</button>
          <button @click="editar(personName['.key'])">Editar</button>
          </div>
          <div v-else>
            <input type="text" v-model="personName.name">
            <button @click="salvar(personName)">Salvar</button>
            <button @click="cancelar(personName['.key'])">Cancelar</button>
          </div>
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
import {namesRef} from './firebase.js'
export default {
  name: 'app',
  data () {
    return {
      name: ''
    }
  },
  methods: {
    submitName () {
      namesRef.push({name: this.name, sobrenome: this.sobrenome, edit: false})
      this.name = ''
    },
    remover (key) {
      namesRef.child(key).remove()
    },
    editar (key) {
      namesRef.child(key).update({edit: true})
    },
    cancelar (key) {
      namesRef.child(key).update({edit: false})
    },
    salvar (person) {
      const key = person['.key']
      namesRef.child(key).set({name: person.name, edit: false})
    }
  },
  firebase: {
    nomes: namesRef
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {  
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
