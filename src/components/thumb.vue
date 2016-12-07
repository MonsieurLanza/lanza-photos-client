<template>
    <li class="photo">
        <a v-bind:href="photo.src" v-bind:data-big="photo.src">
            <img v-bind:src="photo.thumbsrc" v-bind:alt="photo.title" data-w="400" data-h="300">
        </a>
    </li>
</template>

<script>
export default {
  name: 'thumb',
  props: ['photo']
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
