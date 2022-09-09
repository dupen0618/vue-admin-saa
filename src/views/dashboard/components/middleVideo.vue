<template>
  <div class="middleVideo-container">
    <div style="border: 1px solid rgba(0, 169, 255, 0.48)">
      <vue-core-video-player
        id="video1"
        :src="videoSource"
        :cover="cover"
        :title="title"
        ref="videoPlayer"
        autoplay
        loop
        :controls="true"
      />
      <el-row :gutter="40" class="video-title">
        <el-col :span="12" class="video-title-text-style"
          ><li class="el-icon-warning" />
          <span :style="{ color: isWaring ? '#db1223' : '#ffffff' }">
            保养时间：{{ middleVideoList.maintenanceDate }}
          </span></el-col
        >
        <el-col :span="12" :class="middleVideoList.runingStatus.textStyle">
          {{ middleVideoList.runingStatus.text }}
          <li :class="middleVideoList.runingStatus.icon" />
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { parseTime } from "@/utils";

const statusName = {
  "-99": { eng: "offline", chn: "未連線" },
  "-1": { eng: "offline", chn: "設備未開機" },
  0: { eng: "other", chn: "設備待機狀態" },
  1: { eng: "normal", chn: "設備啟動運轉中" },
  2: { eng: "alarm", chn: "設備異常停止中" },
  3: { eng: "other", chn: "設備異常停止中" },
  4: { eng: "other", chn: ":機台暫停" },
  5: { eng: "alarm", chn: "設備警報通知(不停機)" },
  6: { eng: "other", chn: "設備保養" },
};

export default {
  name: "middleVideo",
  props: ["middleVideoList", "maintenanceDate", "runingStatus"],
  data() {
    return {
      videoSource: [
        {
          src: require("@/assets/dashboard/video/4eb642eaf92e75658387d11bbcd34483.mp4"),
          resolution: 360,
        },
        {
          src: require("@/assets/dashboard/video/4eb642eaf92e75658387d11bbcd34483.mp4"),
          resolution: 720,
        },
        {
          src: require("@/assets/dashboard/video/4eb642eaf92e75658387d11bbcd34483.mp4"),
          resolution: 1080,
        },
      ],
      cover: "",
      title: "",
    };
  },
  computed: {
    isWaring() {
      console.log(this.middleVideoList.maintenanceDate);
      if (
        this.middleVideoList.maintenanceDate == null ||
        this.middleVideoList.maintenanceDate == undefined ||
        this.middleVideoList.maintenanceDate == "" ||
        this.middleVideoList.maintenanceDate == "未设置"
      )
        return true;

      var now = new Date();
      now = now.setDate(now.getDate() + 1);
      now = new Date(parseTime(new Date(now)).substr(0, 10));
      let maintenanceDate = new Date(this.middleVideoList.maintenanceDate);
      if (maintenanceDate < now) return true;

      return false;
    },
  },
  mounted() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.middleVideo-container {
  /* background-color: #f38181; */
  height: 100%;
}
.video-title {
  position: absolute;
  width: 100%;
  z-index: 999;
  top: 5px;
  left: 5px;
  margin: 19px auto auto 22px;
}
.video-title-text-style {
  font-size: 22px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  color: #ffffff;
}
.text-right-style {
  text-align: right;
}

.video-title-text-right-normal {
  font-size: 22px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  color: #12db12;
  text-align: right;
}
.video-title-text-right-alarm {
  font-size: 22px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  color: #db1223;
  text-align: right;
}

.video-title-text-right-offline {
  font-size: 22px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  color: #dcdada;
  text-align: right;
}
.video-title-text-right-other {
  font-size: 22px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  color: #12c4db;
  text-align: right;
}

//正常图片路径
.el-icon-warning {
  /* 图片路径 */
  background: url("~@/assets/dashboard/img/ps1jtw64bujzwsoy23f6bgwpxaufyb80g5466861d-9912-4a66-b272-291e99ed4ddb.png")
    center no-repeat;
  background-size: cover;
}

.el-icon-warning:before {
  content: "\66ff";
  font-size: 36px;
  visibility: hidden;
}

.el-icon-warning {
  font-size: 36px;
}

.el-icon-warning:before {
  content: "\e641";
}

//正常图片路径
.el-icon-normal {
  /* 图片路径 */
  background: url("~@/assets/centerConsole/img/psofx4glt8ixzkgxjjmzivj2doihvjd9fg4384d54b-7859-4207-a79f-269c36cf5b7f.png")
    center no-repeat;
  background-size: cover;
}

.el-icon-normal:before {
  content: "\66ff";
  font-size: 30px;
  visibility: hidden;
}

.el-icon-normal {
  font-size: 30px;
}

.el-icon-normal:before {
  content: "\e641";
}

//异常图片路径
.el-icon-other {
  /* 图片路径 */
  background: url("~@/assets/centerConsole/img/pscbpi28j7jit3ga31d6ie55zgcefkiol90488cd8-9589-4afe-99e5-c48ad25b3d96.png")
    center no-repeat;
  background-size: cover;
}

.el-icon-other:before {
  content: "\66ff";
  font-size: 30px;
  visibility: hidden;
}

.el-icon-other {
  font-size: 30px;
}

.el-icon-other:before {
  content: "\e641";
}

.el-icon-offline {
  /* 图片路径 */
  background: url("~@/assets/centerConsole/img/psfzoehbwa2mdvf3kvzw7hspmeuol2h1de4f65ef2-517f-4a27-84b7-41d2b994667c.png")
    center no-repeat;
  background-size: cover;
}

.el-icon-offline:before {
  content: "\66ff";
  font-size: 30px;
  visibility: hidden;
}

.el-icon-offline {
  font-size: 30px;
}

.el-icon-offline:before {
  content: "\e641";
}

.el-icon-alarm {
  /* 图片路径 */
  background: url("~@/assets/centerConsole/img/psvn4p33jexoocw3x7lstgio44qc4hx4hex9d12abc3-d971-445c-bea6-aaa6e39fe0cc.png")
    center no-repeat;
  background-size: cover;
}

.el-icon-alarm:before {
  content: "\66ff";
  font-size: 30px;
  visibility: hidden;
}

.el-icon-alarm {
  font-size: 30px;
}

.el-icon-alarm:before {
  content: "\e641";
}
</style>
