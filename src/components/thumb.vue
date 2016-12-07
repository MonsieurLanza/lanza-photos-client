<template>
    <li :class="klass" :data-w="width" :data-h="height">
        <a :href="src" :data-big="src">
            <img src="static/logo.png" :data-src="thumbsrc" :alt="photo.title" >
        </a>
    </li>
</template>

<script>
export default {
  name: 'thumb',
  props: ['photo'],
  computed: {
    thumbsrc: function () { return `photos/${this.photo.id}/thumb.jpg`; },
    src: function () { return `photos/${this.photo.id}/raw.jpg`; },
    width: function () { return this.photo.size.raw.width; },
    height: function () { return this.photo.size.raw.height; },
    klass: function () {
      return `photo${this.height > this.width ? ' vertical' : ''}`;
    }
  }
};
</script>
<style>
.photolist .photo {
  float: left;
  margin: 3px;
  box-sizing: content-box;
  overflow: hidden;
  position: relative; }

.photolist .photo img {
  display: block;
  width: auto;
  height: 100%; }
</style>
