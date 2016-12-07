<template>
  <div id="app">
    <gallery v-for="item in periods" :period="item"></gallery>
  </div>
</template>

<script>
import thumb from './components/thumb';
import gallery from './components/gallery';

export default {
  name: 'app',
  props: ['photos'],
  components: {
    gallery, thumb
  },
  computed: {
    periods: function () {
      let years = [];
      let curYr = '';
      let lastYr = {};
      for (let i in this.photos) {
        let photo = this.photos[i];
        let tmpYr = photo.date.substring(0, 4);
        if (tmpYr !== curYr) {
          curYr = tmpYr;
          years.push({ year: curYr, photos: [photo] });
          lastYr = years[years.length - 1];
        } else {
          lastYr.photos.push(photo);
        }
      }
      return years;
    }
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
