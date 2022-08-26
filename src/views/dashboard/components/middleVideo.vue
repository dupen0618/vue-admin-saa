<template>
  <div class="middleVideo-container">
    <div
      class="player-container"
      style="border: 1px solid rgba(0, 169, 255, 0.48)"
    >
      <vue-core-video-player
        :src="videoSource"
        :cover="cover"
        :title="title"
        autoplay
        loop
        :controls="true"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "middleVideo",
  data() {
    return {
      videoSource: [
        {
          src: "https://klxxcdn.oss-cn-hangzhou.aliyuncs.com/histudy/hrm/media/bg2.mp4",
          resolution: 360,
        },
        {
          src: "https://klxxcdn.oss-cn-hangzhou.aliyuncs.com/histudy/hrm/media/bg2.mp4",
          resolution: 720,
        },
        {
          src: "https://klxxcdn.oss-cn-hangzhou.aliyuncs.com/histudy/hrm/media/bg2.mp4",
          resolution: 1080,
        },
      ],
      cover: "",
      title: "保养时间",
    };
  },
};
</script>

<style lang="scss" scoped>
.middleVideo-container {
  /* background-color: #f38181; */
  height: 100%;
}
</style>
