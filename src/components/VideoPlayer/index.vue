<template>
  <div class="video-player-container tubecss">
    <div
      class="play-btn-container"
      @click="onPlay"
      v-show="!videoInfo.isPlaying"
    >
      <a href="javascript:;" class="play-btn"><img src="../../assets/show/bofang.png" alt=""></a>
    </div>
    <div
      class="play-btn-container"
      @click="onPause"
      v-show="videoInfo.isPlaying && !controls"
    ></div>
    <videoPlayer
      v-if="src"
      ref="videoPlayer"
      webkit-playsinline
      playsinline
      :options="playerOptions"
      preload="metadata"
      :poster="`${src}${MEDIA_SNAPSHOT_URL}`"
      @play="onPlayerPlay($event)"
      @pause="onPlayerPause($event)"
      @timeupdate="onPlayerTimeupdate($event)"
      @canplay="onPlayerCanplay($event)"
    />
  </div>
</template>
<script>
import 'video.js/dist/video-js.css'
import { videoPlayer } from 'vue-video-player'

export default {
  props: {
    cb: {
      type: Function,
      default() {
        return () => {}
      }
    },
    src: {
      type: String,
      default: ''
    },
    played: {
      type: Boolean,
      default: false
    },
    controls: {
      type: Boolean,
      default: false
    }
  },
  components: {
    videoPlayer
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player;
    }
  },
  data() {
    return {
      playerOptions: {
        autoplay: false,
        loop: true,
        playsinline: true,
        language: 'zh',
        controls: this.controls,
        sources: [{
          type: "video/mp4",
          src: this.src
        }],
      },
      videoInfo: {
        isPlaying: false,
        duration: 0,
        currentTime: 0,
        progress: 0,
      },
      clickTimer: null,
      clickTime: 0
    }
  },
  methods: {
    onPlayerCanplay(player) {
      this.videoInfo.duration = player.duration();
    },
    onPlay() {
      if (new Date().getTime() - this.clickTime < 300) {
        this.clickTime = 0;
        clearTimeout(this.clickTimer);
        this.onDblclick();
      } else {
        this.clickTimer = setTimeout(() => {
          this.play();
        }, 300);
        this.clickTime = new Date().getTime();
      }
    },
    onPause() {
      if (new Date().getTime() - this.clickTime < 300) {
        this.clickTime = 0;
        clearTimeout(this.clickTimer);
        this.onDblclick();
      } else {
        this.clickTimer = setTimeout(() => {
          this.pause();
        }, 300);
        this.clickTime = new Date().getTime();
      }
    },
    play() {
      this.player.play();
    },
    pause() {
      this.player.pause();
    },
    onDblclick() {
      this.$emit('vDblclick');
    },
    onPlayerPlay(player) {
      this.videoInfo.isPlaying = true;
    },
    onPlayerPause(player) {
      this.videoInfo.isPlaying = false;
    },
    onPlayerTimeupdate(player) {
      this.videoInfo.currentTime = player.currentTime();
      this.videoInfo.progress = this.videoInfo.currentTime / this.videoInfo.duration * 100;
      this.cb && this.cb(this.videoInfo, this.player);
    }
  },
  mounted() {
    const { played } = this;
    console.log(played);
    if (played) {
      this.play();
    } else {
      this.pause();
    }
  },
  updated() {
    console.log(this.player);
  },
  watch: {
    'played'() {
      const { played } = this;
      console.log(played);
      if (played) {
        this.play();
      } else {
        this.pause();
      }
    }
  }
}
</script>
<style lang="less">
.video-player-container{
  width: 100%;
  height: 100%;
  position: relative;
  .play-btn-container{
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    z-index: 8;
    .play-btn{
      position: absolute;
      top: 50%;
      left: 50%;
      width: 200px;
      height: 200px;
      transform: translate3d(-50%, -50%, 0);
      img{
        float: left;
        width: 100%;
        height: 100%;
      }
    }
  }
  .video-player{
    width: 100%;
    height: 100%;
    .video-js{
      width: 100%;
      height: 100%;
      font-size: 38px;
    }
  }
  .vjs-big-play-button{
    display: none;
  }
}
</style>
