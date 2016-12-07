<template>
  <section id="photo-view">
    <h2>{{ year }}</h2>
    <ul class="photolist">
        <thumb v-for="photo in photos" v-bind:photo="photo"></thumb>
    </ul>
  </section>
</template>

<script>
import thumb from './thumb';

export default {
  name: 'gallery',
  components: { thumb },
  props: ['photos']
};
</script>

<style lang="css">
</style>
