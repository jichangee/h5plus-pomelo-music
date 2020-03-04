<template>
  <router-link :to="link" class="video-player-container">
    <videoPlayer
      webkit-playsinline
      playsinline
      :options="playerOptions"
      preload="metadata"
    />
  </router-link>
</template>
<script>
import 'video.js/dist/video-js.css'
import { videoPlayer } from 'vue-video-player'

export default {
  props: {
    src: {
      type: String,
      default: ''
    },
    link: {
      type: String,
      default: ''
    },
  },
  components: {
    videoPlayer
  },
  data() {
    return {
      playerOptions: {
        autoplay: false,
        playsinline: true,
        language: 'zh',
        sources: [{
          type: "video/mp4",
          src: this.src
        }],
        controls: false,
        poster: "",
      },
    }
  },
}
</script>
<style lang="less">
.video-player-container{
  width: 100%;
  height: 100%;
  position: relative;
  display: block;
}
</style>
