<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
  <!-- <login></login> -->
  <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
  <router-view></router-view>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import Login from "./views/login.vue";
export default {
  name: "App",
  components: {
    HelloWorld,
    Login,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
