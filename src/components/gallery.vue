<template>
  <section class="photo-view">
    <h2>{{ period.year }}</h2>
    <ul class="photolist">
        <thumb v-for="item in period.photos" :photo="item"></thumb>
    </ul>
  </section>
</template>

<script>
import thumb from './thumb';

export default {
  name: 'gallery',
  components: { thumb },
  props: ['period']
};
</script>

<style lang="scss">
.photo-view {
  padding: 1px 3rem;
  clear: both;
}

ul.photolist, ul.photolist > li {
  margin: 0;
  padding: 0;
}

ul.photolist {
  li {
    list-style-type: none;
    transition: transform 0.1s;
    position: relative;
  }

  button {
    position: absolute;
    right: 2px;
    top: 2px;
    z-index: 100;
    display: none;
  }

  li:hover {
      //overflow: visible;

      button {
          display: block;
      }
  }

  li:hover {
    transform: scale(1.5);
    outline: 4px solid #6AF;
    z-index: 3;
    box-shadow: 0 10px 20px #222;

    &.vertical {
      transform: scale(2);
      outline: 3px solid #6AF;
    }
  }
}
</style>
