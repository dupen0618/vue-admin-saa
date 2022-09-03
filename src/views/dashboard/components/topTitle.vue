<template>
  <div class="top-container group_topContainer">
    <el-row :gutter="20">
      <el-col :span="8"
        ><div class="grid-content bg-purple">{{ dateTime }}</div></el-col
      >
      <el-col :span="8"
        ><div class="grid-content bg-purple-center">
          {{ equipmentName }}
        </div></el-col
      >
      <el-col :span="8"
        ><div class="grid-content bg-purple-right">
          <el-dropdown class="avatar-container" trigger="click">
            <div class="avatar-wrapper">
              <img
                referrerpolicy="no-referrer"
                src="@/assets/dashboard/img/psb4hbo5wsqnn3x3leqcyhb7tvxrc3cji67440422f2-a997-4ef0-95d5-4c21bbd5c76e.png"
              />
            </div>
            <el-dropdown-menu slot="dropdown" class="user-dropdown">
              <router-link
                :to="{
                  name: 'DashboardSetting',
                  params: { equipmentIp: equipmentIp },
                }"
                target="_blank"
              >
                <el-dropdown-item> 本地看板设置 </el-dropdown-item>
              </router-link>
              <!-- <el-dropdown-item @click.native="goSetting">
                本地看板设置
              </el-dropdown-item> -->
              <el-dropdown-item divided @click.native="logout">
                <span style="display: block">退出</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <!-- <router-link
            :to="{
              name: 'DashboardSetting',
              params: { equipmentIp: equipmentIp },
            }"
          >
            <img
              referrerpolicy="no-referrer"
              src="@/assets/dashboard/img/psb4hbo5wsqnn3x3leqcyhb7tvxrc3cji67440422f2-a997-4ef0-95d5-4c21bbd5c76e.png"
            />
          </router-link> -->
        </div></el-col
      >
    </el-row>
  </div>
</template>

<script>
import { parseTime } from "@/utils";

export default {
  name: "topTitle",
  props: ["equipmentName", "equipmentIp"],
  data() {
    return {
      dateTime: undefined,
      timer: undefined,
    };
  },
  created() {
    this.timer = setInterval(() => {
      this.updateDateTime();
    }, 1000); //单位是毫
  },
  methods: {
    updateDateTime() {
      var now = new Date();
      this.dateTime = parseTime(now);
    },
    async logout() {
      await this.$store.dispatch("user/logout");
      // this.$router.push(`/login?redirect=${this.$route.fullPath}`);
      this.$router.push(`/login`);
    },
    goSetting() {
      const newPage = this.$router.resolve({
        name: "DashboardSetting",
        params: { equipmentIp: this.equipmentIp },
      });
      window.open(newPage.href, "_blank");
    },
  },
  destroyed: function () {
    // 每次离开当前界面时，清除定时器
    clearInterval(this.timer);
    this.timer = null;
  },
};
</script>
<style scoped lang="css" src="@/assets/dashboard/index.css" />
<style lang="scss" scoped>
.top-container {
  /* background-color: #fce38a; */
  width: 100%;
  height: 100%;
}

.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  width: 82px;
  height: 12px;
  overflow-wrap: break-word;
  color: rgba(255, 255, 255, 1);
  font-size: 16px;
  font-family: VisitorTT1BRK;
  text-align: left;
  white-space: nowrap;
  line-height: 16px;
  margin: 46px 0 0 25px;
}
.bg-purple-light {
  background: #e5e9f2;
}
.bg-purple-center {
  text-align: center;
  text-shadow: 0px 0px 0px rgba(231, 236, 243, 0.5);
  background-image: linear-gradient(
    180deg,
    rgba(5, 63, 152, 1) 0,
    rgba(5, 63, 152, 0.501961) 0,
    rgba(255, 255, 255, 1) 100%,
    rgba(255, 255, 255, 1) 100%
  );
  overflow-wrap: break-word;
  color: rgba(255, 255, 255, 1);
  font-size: 48px;
  font-family: SourceHanSansCN-Bold;
  line-height: 20px;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 30px 0 0 0;
}
.bg-purple-right {
  text-align: right;
  margin-right: 50px;
  margin-top: 35px;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
