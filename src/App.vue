<template>
  <div id="app">
    <gallery></gallery>
  </div>
</template>

<script>
import thumb from './components/thumb';
import gallery from './components/gallery';

export default {
  name: 'app',
  components: {
    gallery, thumb
  }
};
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
</style>
