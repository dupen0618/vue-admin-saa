<template>
  <div class="app-container section_2" :style="defaultHeight">
    <el-row class="group_1">
      <el-col :span="8" class="top_group">
        <span class="text_1">{{ dateTime }}</span>
      </el-col>
      <el-col :span="8" class="top_group top_group_col2">
        <span class="text_3">AIOT中控台</span>
      </el-col>
      <el-col :span="8" class="top_group">
        <el-dropdown
          class="avatar-container"
          style="float: right"
          trigger="click"
        >
          <div class="avatar-wrapper">
            <img
              class="label_1"
              referrerpolicy="no-referrer"
              src="@/assets/centerConsole/img/ps1edpi0pd463onqtheb3y9w3wjyyn1epta968e9d9-93e9-46ec-8926-fd76ae2dbf6c.png"
            />
          </div>
          <el-dropdown-menu slot="dropdown" class="user-dropdown">
            <el-dropdown-item divided @click.native="logout">
              <span style="display: block">退出</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
    <el-row :gutter="40" class="panel-group">
      <el-col :xs="12" :sm="12" :lg="4">
        <div class="block_24">
          <el-row :gutter="14" style="height: 90%">
            <el-col :span="12" style="text-align: center">
              <img
                class="label_3"
                referrerpolicy="no-referrer"
                src="@/assets/centerConsole/img/ps6v02ewtftddlvz62ro59hn82i6g1ey2h02f4fb06-4532-462f-9434-8ce90c744b96.png"
              />
            </el-col>
            <el-col
              :span="10"
              style="
                display: flex;
                flex-direction: column;
                height: 100%;
                text-align: right;
              "
            >
              <div class="group_96_1">
                <span class="text_44_1">{{ total }}</span>
              </div>
              <div class="text-wrapper_17_1">
                <span class="text_45_1">机台总数</span>
              </div>
            </el-col>
          </el-row>

          <!-- <div class="group_96">
            <span class="text_44">{{ total }}</span>
          </div>
          <div class="text-wrapper_17">
            <span class="text_45">机台总数</span>
          </div> -->
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="4">
        <div class="block_24">
          <!-- <div class="group_96">
            <img
              class="label_3"
              referrerpolicy="no-referrer"
              src="@/assets/centerConsole/img/psofx4glt8ixzkgxjjmzivj2doihvjd9fg4384d54b-7859-4207-a79f-269c36cf5b7f.png"
            />
            <span class="text_46">{{ normalCnt }}</span>
          </div>
          <div class="text-wrapper_17">
            <span class="text_45">正常运转</span>
          </div> -->
          <el-row :gutter="14" style="height: 90%">
            <el-col :span="12" style="text-align: center">
              <img
                class="label_3"
                referrerpolicy="no-referrer"
                src="@/assets/centerConsole/img/psofx4glt8ixzkgxjjmzivj2doihvjd9fg4384d54b-7859-4207-a79f-269c36cf5b7f.png"
              />
            </el-col>
            <el-col
              :span="10"
              style="
                display: flex;
                flex-direction: column;
                height: 100%;
                text-align: right;
              "
            >
              <div class="group_96_1">
                <span class="text_46_1">{{ normalCnt }}</span>
              </div>
              <div class="text-wrapper_17_1">
                <span class="text_45_1">正常运转</span>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="4">
        <div class="block_24">
          <!-- <div class="group_96">
            <img
              class="label_3"
              referrerpolicy="no-referrer"
              src="@/assets/centerConsole/img/pst2e1jgh67b2bdta6yzfrbxy6xga3grgfe2007fc8-c4e7-4223-9296-ef7845fc1721.png"
            />
            <span class="text_48">{{ alarmCnt }}</span>
          </div>
          <div class="text-wrapper_17">
            <span class="text_45">异常停机</span>
          </div> -->
          <el-row :gutter="14" style="height: 90%">
            <el-col :span="12" style="text-align: center">
              <img
                class="label_3"
                referrerpolicy="no-referrer"
                src="@/assets/centerConsole/img/pst2e1jgh67b2bdta6yzfrbxy6xga3grgfe2007fc8-c4e7-4223-9296-ef7845fc1721.png"
              />
            </el-col>
            <el-col
              :span="10"
              style="
                display: flex;
                flex-direction: column;
                height: 100%;
                text-align: right;
              "
            >
              <div class="group_96_1">
                <span class="text_48_1">{{ alarmCnt }}</span>
              </div>
              <div class="text-wrapper_17_1">
                <span class="text_45_1">异常停机</span>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="4">
        <div class="block_24">
          <!-- <div class="group_96">
            <img
              class="label_3"
              referrerpolicy="no-referrer"
              src="@/assets/centerConsole/img/pscbpi28j7jit3ga31d6ie55zgcefkiol90488cd8-9589-4afe-99e5-c48ad25b3d96.png"
            />
            <span class="text_50">{{ otherCnt }}</span>
          </div>
          <div class="text-wrapper_17">
            <span class="text_45">待机机台</span>
          </div> -->
          <el-row :gutter="14" style="height: 90%">
            <el-col :span="12" style="text-align: center">
              <img
                class="label_3"
                referrerpolicy="no-referrer"
                src="@/assets/centerConsole/img/pscbpi28j7jit3ga31d6ie55zgcefkiol90488cd8-9589-4afe-99e5-c48ad25b3d96.png"
              />
            </el-col>
            <el-col
              :span="10"
              style="
                display: flex;
                flex-direction: column;
                height: 100%;
                text-align: right;
              "
            >
              <div class="group_96_1">
                <span class="text_50_1">{{ otherCnt }}</span>
              </div>
              <div class="text-wrapper_17_1">
                <span class="text_45_1">待机机台</span>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="4">
        <div class="block_24">
          <!-- <div class="group_96">
            <img
              class="label_3"
              referrerpolicy="no-referrer"
              src="@/assets/centerConsole/img/ps7b4kqsji3w9xwwby1xsuw9mqq9xphqh95bd7a52-f66a-400a-a297-30e599e91b3d.png"
            />
            <span class="text_52">{{ offlineCnt }}</span>
          </div>
          <div class="text-wrapper_17">
            <span class="text_45">离线机台</span>
          </div> -->

          <el-row :gutter="14" style="height: 90%">
            <el-col :span="12" style="text-align: center">
              <img
                class="label_3"
                referrerpolicy="no-referrer"
                src="@/assets/centerConsole/img/ps7b4kqsji3w9xwwby1xsuw9mqq9xphqh95bd7a52-f66a-400a-a297-30e599e91b3d.png"
              />
            </el-col>
            <el-col
              :span="10"
              style="
                display: flex;
                flex-direction: column;
                height: 100%;
                text-align: right;
              "
            >
              <div class="group_96_1">
                <span class="text_52_1">{{ offlineCnt }}</span>
              </div>
              <div class="text-wrapper_17_1">
                <span class="text_45_1">离线机台</span>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="4">
        <div class="block_24">
          <!-- <div class="group_96">
            <img
              class="label_3"
              referrerpolicy="no-referrer"
              src="@/assets/centerConsole/img/psd1socg5qxqdt6iljt6fpmw3v11lmkc8ff41c989-0454-494a-937b-b4ef458cdb48.png"
            />
            <span class="text_54">{{ properRate }}</span>
            <span class="text_55">%</span>
          </div>
          <div class="text-wrapper_17">
            <span class="text_45">妥善率</span>
          </div> -->

          <el-row :gutter="14" style="height: 90%">
            <el-col :span="12" style="text-align: center">
              <img
                class="label_3"
                referrerpolicy="no-referrer"
                src="@/assets/centerConsole/img/psd1socg5qxqdt6iljt6fpmw3v11lmkc8ff41c989-0454-494a-937b-b4ef458cdb48.png"
              />
            </el-col>
            <el-col
              :span="10"
              style="
                display: flex;
                flex-direction: column;
                height: 100%;
                text-align: right;
              "
            >
              <div class="group_96_1">
                <span class="text_54_1">{{ properRate }}</span>
              </div>
              <div class="text-wrapper_17_1">
                <span class="text_45_1">妥善率</span>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
    <div class="block_1">
      <el-row :gutter="40" style="margin: 20px 0 0 0">
        <el-col>
          <el-select
            v-model="listQuery.partition"
            placeholder="分区"
            clearable
            popper-class="selectFrom"
            style="
              width: 200px;
              margin-left: 5px;
              background-color: rgba(9, 84, 168, 0.28);
            "
          >
            <el-option
              v-for="(item, index) in lineList"
              :key="index"
              :label="item"
              :value="item"
            />
          </el-select>

          <el-input
            v-model="listQuery.machineNo"
            placeholder="输入机台编号"
            style="
              width: 400px;
              margin-left: 30px;
              background-color: rgba(9, 84, 168, 0.28);
            "
            @keyup.enter.native="handleFilter"
          />
          <el-button
            v-waves
            class="filter-item"
            type="primary"
            icon="el-icon-search"
            style="margin-left: 30px"
            @click="handleFilter"
            >查询</el-button
          >
        </el-col>
      </el-row>
      <el-row :gutter="10" style="margin: 0 0 0 0">
        <el-col
          :xs="12"
          :sm="12"
          :lg="4"
          style="padding-left: 5px; padding-right: 5px"
          v-for="(item, index) in list"
          :key="index"
        >
          <el-card class="box-card">
            <div slot="header" :class="item.statusStyle.fix">
              <router-link
                :to="{
                  name: 'Dashboard',
                  params: { equipmentIp: item.equipmentIp },
                }"
                target="_blank"
                ><span>{{ item.equipment }}</span></router-link
              >
              <el-button :class="item.statusStyle.text1" type="text"
                >{{ item.status }}<i :class="item.statusStyle.icon1"></i
              ></el-button>
            </div>
            <div style="float: left">
              <div class="text item">
                <i :class="item.statusStyle.icon2"></i>制程：{{ item.made }}
              </div>
              <div class="text item">
                <i :class="item.statusStyle.icon2"></i>线体：{{ item.lineBody }}
              </div>
              <div class="text item">
                <i :class="item.statusStyle.icon2"></i>概括：{{ item.summary }}
              </div>
            </div>
            <div style="float: right; height: 100%">
              <img
                class="image_13"
                referrerpolicy="no-referrer"
                :src="item.statusStyle.imgUrl"
              />
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-row :gutter="40" style="margin-top: 20px; margin-bottom: 10px">
        <el-col>
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="listQuery.page"
            :page-size="18"
            layout="->, prev, pager, next, jumper, total"
            :total="total"
          >
          </el-pagination>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import waves from "@/directive/waves"; // waves directive
import { fetchData, fetchCnt, reloadLines } from "@/api/centerConsole";
import { parseTime } from "@/utils";

const calendarTypeOptions = [
  { key: "A", display_name: "A区" },
  { key: "B", display_name: "B区" },
  { key: "C", display_name: "C区" },
  { key: "D", display_name: "D区" },
];

/**
 *  normal:正常
 *   alarm:异常
 *   offline:离线
 *   other:其他
 */
const imgUrls = {
  normal:
    "psmbhu3aun2ipyastoivky5nmsptbyfy1n9ac36360-588b-4c6b-b00d-d21d491c00b3.png",
  alarm:
    "psaa47an5nqmoh4wspeuvcdu1qvd3svme9h16d62bf6-8f60-4285-9248-0084b397f558.png",
  offline:
    "psyly3uxmyinojpnkirgj5w3a14tx3kptq5896fcc0-feec-4dbb-a9d0-d217b0469116.png",
  other:
    "psfb5o3tlls88bd9r6dawtfgisgkpje3sv20ae384d-4843-4a72-aa55-e0d2d706cfdc.png",
};

const statusName = ["normal", "alarm", "offline", "other"];
const statusName2 = {
  "-99": "offline",
  "-1": "offline",
  0: "other",
  1: "normal",
  2: "alarm",
  3: "other",
  4: "other",
  5: "alarm",
  6: "other",
};

export default {
  directives: { waves },
  data() {
    return {
      dateTime: undefined,
      constants: {},
      form: {
        region: "",
      },
      listQuery: {
        page: 1,
        limit: 18,
        startTime: undefined,
        endTime: undefined,
        partition: undefined,
        machineNo: undefined,
        type: undefined,
        mobile: undefined,
      },
      calendarTypeOptions,
      lineList: [],
      currentPage: 1,
      list: [],
      defaultHeight: {
        height: "",
      },
      timer: undefined,
      total: 100,
      normalCnt: 0,
      alarmCnt: 0,
      offlineCnt: 0,
      otherCnt: 0,
      properRate: 0,
      cntList: {
        normalCnt: 0,
        alarmCnt: 0,
        offlineCnt: 0,
        otherCnt: 0,
      },
    };
  },
  created() {
    this.fetchCnt();
    this.fetchData();
    //页面创建时执行一次getHeight进行赋值，顺道绑定resize事件
    window.addEventListener("resize", this.getHeight);
    // this.getHeight();
    this.reloadLines();
    this.timer = setInterval(() => {
      this.updateDateTime();
    }, 1000); //单位是毫
  },
  methods: {
    fetchCnt() {
      fetchCnt().then((response) => {
        var list = JSON.parse(response.data);
        this.initCntList();
        list.forEach((element, index, array) => {
          this.setStatus(element.status);
        });

        this.normalCnt = this.cntList.normalCnt;
        this.alarmCnt = this.cntList.alarmCnt;
        this.offlineCnt = this.cntList.offlineCnt;
        this.otherCnt = this.cntList.otherCnt;
        this.properRate =
          ((this.normalCnt * 1.0) / this.total).toFixed(2) * 100;
      });
    },
    fetchData() {
      fetchData(this.listQuery).then((response) => {
        var json = JSON.parse(response.data);
        this.total = json.total;
        var list = [];
        json.items.forEach((element, index, array) => {
          var obj = {
            equipmentIp: element.ipAddr,
            equipment: element.equipment,
            made: element.made,
            lineBody: element.lineBody,
            summary: element.summary,
            status: this.setStatus(element.status),
            statusStyle: this.setStyle(element.status),
          };
          list.push(obj);
        });
        this.list = list;
      });
    },
    updateDateTime() {
      var now = new Date();
      this.dateTime = parseTime(now);
    },
    initCntList() {
      this.cntList = {
        normalCnt: 0,
        alarmCnt: 0,
        offlineCnt: 0,
        otherCnt: 0,
      };
    },
    setStatus(val) {
      if (val === -99) {
        this.cntList.offlineCnt++;
        return "未連線";
      }
      if (val === -1) {
        this.cntList.offlineCnt++;
        return "設備未開機";
      }
      if (val === 0) {
        this.cntList.otherCnt++;
        return "設備待機狀態";
      }
      if (val === 1) {
        this.cntList.normalCnt++;
        return "設備啟動運轉中";
      }
      if (val === 2) {
        this.cntList.alarmCnt++;
        return "設備異常停止中";
      }
      if (val === 3) {
        this.cntList.otherCnt++;
        return "手動狀態";
      }
      if (val === 4) {
        this.cntList.otherCnt++;
        return "機台暫停";
      }
      if (val === 5) {
        this.cntList.alarmCnt++;
        return "設備警報通知(不停機)";
      }
      if (val === 6) {
        this.cntList.otherCnt++;
        return "設備保養";
      }
      return val;
    },
    setStyle(type) {
      var style = statusName2[type];
      return {
        fix: style + "fix",
        text1: "text-" + style,
        icon1: "el-icon-" + style + " el-icon--right",
        icon2: "el-icon-" + style + "_1 el-icon--left",
        imgUrl: require("@/assets/centerConsole/img/" + imgUrls[style]),
      };
    },
    handleFilter() {},
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      console.log(this.listQuery.page);
      this.fetchData();
    },
    reloadLines() {
      reloadLines().then((res) => {
        var list = JSON.parse(res.data);
        var lineList = [];
        list.forEach((element, index, array) => {
          lineList.push(element.line);
        });
        this.lineList = lineList;
      });
    },
    getHeight() {
      this.defaultHeight.height = window.innerHeight - 0 + "px";
    },
    async logout() {
      await this.$store.dispatch("user/logout");
      // this.$router.push(`/login?redirect=${this.$route.fullPath}`);
      this.$router.push(`/login`);
    },
  },
  destroyed: function () {
    // 每次离开当前界面时，清除定时器
    clearInterval(this.timer);
    this.timer = null;
  },
};
</script>
<style scoped lang="css" src="@/assets/centerConsole/index.css" />
<style lang="scss" scoped>
.top_group {
  margin: 22px 0 0 0;
}
.top_group_col2 {
  text-align: center;
}
.panel-group {
  margin-top: 10px;

  .card-panel-col {
    margin-bottom: 32px;
  }
}

::v-deep .el-input__inner {
  background-color: transparent !important;
  border-color: rgba(44, 137, 229, 0.5);
  color: #d9d9d9;
  height: 40px;
}
/**修改边框和字体颜色 */
::v-deep .el-select {
  position: relative;
  width: 450px;
  .el-input {
    input {
      height: 40px;
      border-color: rgba(44, 137, 229, 0.5);
      color: #fff;
    }
  }
}
/**修改下拉图标颜色 */
::v-deep .el-input__suffix {
  .el-input__suffix-inner {
    .el-icon-arrow-up:before {
      color: rgba(44, 137, 229, 0.5);
      padding-left: 0.11rem;
    }
  }
}

::v-deep .el-card__header {
  border-bottom-width: 0px;
  padding-top: 10px;
  padding-bottom: 10px;
}
::v-deep .el-card__body {
  padding-top: 5px;
  padding-bottom: 5px;
}

.text {
  font-size: 12px;
  color: #fff;
}

.item {
  margin-bottom: 15px;
}
/**
  normal:正常
  alarm:异常
  offline:离线
  other:其他
*/
.clearfix {
  color: rgba(0, 209, 89, 1);
  font-size: 16px;
  font-family: SourceHanSansCN-Regular;
  text-align: left;
  white-space: nowrap;
  line-height: 16px;
  margin-top: 3px;
  border-bottom: 1px solid #1340aa;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

/* 正常卡片标题样式 */
.normalfix {
  color: rgba(0, 209, 89, 1);
  font-size: 16px;
  font-family: SourceHanSansCN-Regular;
  text-align: left;
  white-space: nowrap;
  line-height: 16px;
  margin-top: 3px;
  border-bottom: 1px solid #1340aa;
}
.normalfix:before,
.normalfix:after {
  display: table;
  content: "";
}
.normalfix:after {
  clear: both;
}

/* 异常卡片标题样式 */
.alarmfix {
  color: rgba(200, 13, 13, 1);
  font-size: 16px;
  font-family: SourceHanSansCN-Regular;
  text-align: left;
  white-space: nowrap;
  line-height: 16px;
  margin-top: 3px;
  border-bottom: 1px solid #1340aa;
}
.alarmfix:before,
.alarmfix:after {
  display: table;
  content: "";
}
.alarmfix:after {
  clear: both;
}

/* 离线卡片标题样式 */
.offlinefix {
  color: #bebebe;
  font-size: 16px;
  font-family: SourceHanSansCN-Regular;
  text-align: left;
  white-space: nowrap;
  line-height: 16px;
  margin-top: 3px;
  border-bottom: 1px solid #1340aa;
}
.offlinefix:before,
.offlinefix:after {
  display: table;
  content: "";
}
.offlinefix:after {
  clear: both;
}

/* 离线卡片标题样式 */
.otherfix {
  color: #01eaff;
  font-size: 16px;
  font-family: SourceHanSansCN-Regular;
  text-align: left;
  white-space: nowrap;
  line-height: 16px;
  margin-top: 3px;
  border-bottom: 1px solid #1340aa;
}
.otherfix:before,
.otherfix:after {
  display: table;
  content: "";
}
.otherfix:after {
  clear: both;
}

.box-card {
  width: 98%;
  box-shadow: 0px 2px 18px 0px rgba(6, 80, 128, 0.8);
  background-color: rgba(4, 45, 95, 0.88);
  border-radius: 8px;
  height: 30%;
  border: 1px solid rgba(15, 100, 221, 1);
  margin: 20px 0 0 5px;
}

.box-card-normal {
  width: 90%;
  margin-top: 20px;
  box-shadow: 0px 2px 18px 0px rgba(6, 80, 128, 0.8);
  background-color: rgba(4, 45, 95, 0.88);
  border-radius: 8px;
  height: 30%;
  border: 1px solid rgba(15, 100, 221, 1);
  margin-left: 29px;
}

.text-normal {
  float: right;
  padding: 3px 0;
  color: rgba(0, 209, 89, 1);
}
.text-alarm {
  float: right;
  padding: 3px 0;
  color: rgba(200, 13, 13, 1);
}
.text-offline {
  float: right;
  padding: 3px 0;
  color: #bebebe;
}

.text-other {
  float: right;
  padding: 3px 0;
  color: #01eaff;
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
  font-size: 16px;
  visibility: hidden;
}

.el-icon-normal {
  font-size: 16px;
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
  font-size: 16px;
  visibility: hidden;
}

.el-icon-other {
  font-size: 16px;
}

.el-icon-other:before {
  content: "\e641";
}

.el-icon-alarm_1 {
  /* 图片路径 */
  background: url("~@/assets/centerConsole/img/psy18jhxmdvh839yq17eh0zbw8v246r5llld96de396-c51f-4388-a5e9-407a90ff9d77.png")
    center no-repeat;
  background-size: cover;
}

.el-icon-alarm_1:before {
  content: "\66ff";
  font-size: 16px;
  visibility: hidden;
}

.el-icon-alarm_1 {
  font-size: 16px;
}

.el-icon-alarm_1:before {
  content: "\e641";
}

.el-icon-normal_1 {
  /* 图片路径 */
  background: url("~@/assets/centerConsole/img/psyulc7os849kbtc9eqzd32q32xgoz96h3ebbc78b5b-137c-4504-a98a-36d2825ebe71.png")
    center no-repeat;
  background-size: cover;
}

.el-icon-normal_1:before {
  content: "\66ff";
  font-size: 16px;
  visibility: hidden;
}

.el-icon-normal_1 {
  font-size: 16px;
}

.el-icon-normal_1:before {
  content: "\e641";
}

.el-icon-offline_1 {
  /* 图片路径 */
  background: url("~@/assets/centerConsole/img/psy4jhhqt7pedxb5xbkj5algtuxf0z6vfe662693d8-d62d-4259-804f-87c6858da673.png")
    center no-repeat;
  background-size: cover;
}

.el-icon-offline_1:before {
  content: "\66ff";
  font-size: 16px;
  visibility: hidden;
}

.el-icon-offline_1 {
  font-size: 16px;
}

.el-icon-offline_1:before {
  content: "\e641";
}

.el-icon-other_1 {
  /* 图片路径 */
  background: url("~@/assets/centerConsole/img/pszfit316ky1oxl1zndpvadxoqg5mkc1erbf100b2d-fb1a-42a3-b2c0-4021226b6d65.png")
    center no-repeat;
  background-size: cover;
}

.el-icon-other_1:before {
  content: "\66ff";
  font-size: 16px;
  visibility: hidden;
}

.el-icon-other_1 {
  font-size: 16px;
}

.el-icon-other_1:before {
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
  font-size: 16px;
  visibility: hidden;
}

.el-icon-offline {
  font-size: 16px;
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
  font-size: 16px;
  visibility: hidden;
}

.el-icon-alarm {
  font-size: 16px;
}

.el-icon-alarm:before {
  content: "\e641";
}

::v-deep {
  .el-pagination.is-background .btn-prev {
    background: url(~@/assets/centerConsole/img/psuxctvt94b9pbbzexbzqrdik4dxl3gs5j8b7d8723-946b-4105-aa2f-6a4d1ae9af53.png)
      100% no-repeat;
    background-size: 100% 100%;
    // background-color: #fff; // 进行修改未选中背景和字体
    color: #fff;
  }
  .el-pagination.is-background .btn-next {
    background: url(~@/assets/centerConsole/img/psuxctvt94b9pbbzexbzqrdik4dxl3gs5j8b7d8723-946b-4105-aa2f-6a4d1ae9af53.png)
      100% no-repeat;
    background-size: 100% 100%;
    // background-color: #fff; // 进行修改未选中背景和字体
    color: #fff;
  }
  .el-pagination.is-background .el-pager li:not(.disabled) {
    background: url(~@/assets/centerConsole/img/psuxctvt94b9pbbzexbzqrdik4dxl3gs5j8b7d8723-946b-4105-aa2f-6a4d1ae9af53.png)
      100% no-repeat;
    background-size: 100% 100%;
    // background-color: #fff; // 进行修改未选中背景和字体
    color: #fff;
  }
  .el-pagination.is-background .el-pager li:not(.disabled).active {
    background: url(~@/assets/centerConsole/img/psmkw5orjugwcfaonjupq2mi7p17hucldwb666fd7b-2e12-410f-ac9c-19c0ce6617cf.png)
      100% no-repeat;
    background-size: 100% 100%;
    // background-color: #4f75ff; // 进行修改选中项背景和字体
    color: #fff;
  }
  .el-pagination.is-background .el-pagination__jump {
    color: #fff;
  }
  .el-pagination.is-background .el-pagination__total {
    margin-left: 30px;
    margin-right: 50px;
    color: #fff;
  }
}
</style>
