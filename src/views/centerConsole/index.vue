<template>
  <div class="app-container section_2" :style="defaultHeight">
    <el-row class="group_1">
      <el-col :span="8" class="top_group">
        <span class="text_1">2022-8-7</span>
        <span class="text_2">10:28:46</span>
      </el-col>
      <el-col :span="8" class="top_group top_group_col2">
        <span class="text_3">AIOT中控台</span>
      </el-col>
      <el-col :span="8" class="top_group">
        <img
          class="label_1"
          referrerpolicy="no-referrer"
          src="@/assets/centerConsole/img/ps1edpi0pd463onqtheb3y9w3wjyyn1epta968e9d9-93e9-46ec-8926-fd76ae2dbf6c.png"
        />
      </el-col>
    </el-row>
    <el-row :gutter="40" class="panel-group">
      <el-col :xs="12" :sm="12" :lg="4">
        <div class="block_24">
          <div class="group_96">
            <img
              class="label_3"
              referrerpolicy="no-referrer"
              src="@/assets/centerConsole/img/ps6v02ewtftddlvz62ro59hn82i6g1ey2h02f4fb06-4532-462f-9434-8ce90c744b96.png"
            />
            <span class="text_44">120</span>
          </div>
          <div class="text-wrapper_17">
            <span class="text_45">机台总数</span>
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="4">
        <div class="block_24">
          <div class="group_96">
            <img
              class="label_3"
              referrerpolicy="no-referrer"
              src="@/assets/centerConsole/img/psofx4glt8ixzkgxjjmzivj2doihvjd9fg4384d54b-7859-4207-a79f-269c36cf5b7f.png"
            />
            <span class="text_46">100</span>
          </div>
          <div class="text-wrapper_17">
            <span class="text_45">正常运转</span>
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="4">
        <div class="block_24">
          <div class="group_96">
            <img
              class="label_3"
              referrerpolicy="no-referrer"
              src="@/assets/centerConsole/img/pst2e1jgh67b2bdta6yzfrbxy6xga3grgfe2007fc8-c4e7-4223-9296-ef7845fc1721.png"
            />
            <span class="text_48">20</span>
          </div>
          <div class="text-wrapper_17">
            <span class="text_45">异常停机</span>
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="4">
        <div class="block_24">
          <div class="group_96">
            <img
              class="label_3"
              referrerpolicy="no-referrer"
              src="@/assets/centerConsole/img/pscbpi28j7jit3ga31d6ie55zgcefkiol90488cd8-9589-4afe-99e5-c48ad25b3d96.png"
            />
            <span class="text_50">80</span>
          </div>
          <div class="text-wrapper_17">
            <span class="text_45">待机机台</span>
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="4">
        <div class="block_24">
          <div class="group_96">
            <img
              class="label_3"
              referrerpolicy="no-referrer"
              src="@/assets/centerConsole/img/ps7b4kqsji3w9xwwby1xsuw9mqq9xphqh95bd7a52-f66a-400a-a297-30e599e91b3d.png"
            />
            <span class="text_52">20</span>
          </div>
          <div class="text-wrapper_17">
            <span class="text_45">离线机台</span>
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="4">
        <div class="block_24">
          <div class="group_96">
            <img
              class="label_3"
              referrerpolicy="no-referrer"
              src="@/assets/centerConsole/img/psd1socg5qxqdt6iljt6fpmw3v11lmkc8ff41c989-0454-494a-937b-b4ef458cdb48.png"
            />
            <span class="text_54">80</span>
            <span class="text_55">%</span>
          </div>
          <div class="text-wrapper_17">
            <span class="text_45">妥善率</span>
          </div>
        </div>
      </el-col>
    </el-row>
    <div class="block_1">
      <el-row :gutter="40" style="margin-top: 20px">
        <el-col>
          <el-select
            v-model="listQuery.partition"
            placeholder="分区"
            clearable
            popper-class="selectFrom"
            style="
              width: 200px;
              margin-left: 20px;
              background-color: rgba(9, 84, 168, 0.28);
            "
          >
            <el-option
              v-for="item in calendarTypeOptions"
              :key="item.key"
              :label="item.display_name"
              :value="item.key"
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
      <el-row :gutter="40">
        <el-col
          :xs="12"
          :sm="12"
          :lg="4"
          v-for="(item, index) in list"
          :key="index"
        >
          <el-card class="box-card">
            <div slot="header" :class="item.statusStyle.fix">
              <span>{{ item.equipment }}</span>
              <el-button :class="item.statusStyle.text1" type="text"
                >正常<i :class="item.statusStyle.icon1"></i
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
      <el-row :gutter="40" style="margin-top: 30px; margin-bottom: 30px">
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
import { fetchData } from "@/api/centerConsole";
import { jsxOpeningElement } from "@babel/types";

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

export default {
  directives: { waves },
  data() {
    return {
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
      currentPage: 1,
      total: 100,
      list: [],
      defaultHeight: {
        height: "",
      },
    };
  },
  created() {
    this.fetchData();
    //页面创建时执行一次getHeight进行赋值，顺道绑定resize事件
    window.addEventListener("resize", this.getHeight);
    this.getHeight();
  },
  methods: {
    fetchData() {
      // for (var i = 0; i < 18; i++) {
      //   var obj = {
      //     equipment: "AIOT-01",
      //     made: "综化线",
      //     lineBody: "#2",
      //     summary: "设备启动运转中",
      //     statusStyle: this.setStyle(i % 4),
      //   };
      //   this.list.push(obj);
      // }
      fetchData(this.listQuery).then((response) => {
        var json = JSON.parse(response.data);
        this.total = json.total;
        var list = [];
        json.items.forEach((element, index, array) => {
          var obj = {
            equipment: element.equipment,
            made: element.made,
            lineBody: element.lineBody,
            summary: element.summary,
            statusStyle: this.setStyle(index % 4),
          };
          list.push(obj);
        });
        this.list = list;
      });
    },
    setStyle(type) {
      return {
        fix: statusName[type] + "fix",
        text1: "text-" + statusName[type],
        icon1: "el-icon-" + statusName[type] + " el-icon--right",
        icon2: "el-icon-" + statusName[type] + "_1 el-icon--left",
        imgUrl: require("@/assets/centerConsole/img/" +
          imgUrls[statusName[type]]),
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
    getHeight() {
      this.defaultHeight.height = window.innerHeight - 30 + "px";
    },
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
  margin-top: 18px;

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
}

.text {
  font-size: 14px;
  color: #fff;
}

.item {
  margin-bottom: 18px;
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
  width: 90%;
  margin-top: 20px;
  box-shadow: 0px 2px 18px 0px rgba(6, 80, 128, 0.8);
  background-color: rgba(4, 45, 95, 0.88);
  border-radius: 8px;
  height: 200px;
  border: 1px solid rgba(15, 100, 221, 1);
  margin-left: 29px;
}

.box-card-normal {
  width: 90%;
  margin-top: 20px;
  box-shadow: 0px 2px 18px 0px rgba(6, 80, 128, 0.8);
  background-color: rgba(4, 45, 95, 0.88);
  border-radius: 8px;
  height: 200px;
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
  background: url("./img/psofx4glt8ixzkgxjjmzivj2doihvjd9fg4384d54b-7859-4207-a79f-269c36cf5b7f.png")
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
  background: url("./img/pscbpi28j7jit3ga31d6ie55zgcefkiol90488cd8-9589-4afe-99e5-c48ad25b3d96.png")
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
  background: url("./img/psy18jhxmdvh839yq17eh0zbw8v246r5llld96de396-c51f-4388-a5e9-407a90ff9d77.png")
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
  background: url("./img/psyulc7os849kbtc9eqzd32q32xgoz96h3ebbc78b5b-137c-4504-a98a-36d2825ebe71.png")
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
  background: url("./img/psy4jhhqt7pedxb5xbkj5algtuxf0z6vfe662693d8-d62d-4259-804f-87c6858da673.png")
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
  background: url("./img/pszfit316ky1oxl1zndpvadxoqg5mkc1erbf100b2d-fb1a-42a3-b2c0-4021226b6d65.png")
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
  background: url("./img/psfzoehbwa2mdvf3kvzw7hspmeuol2h1de4f65ef2-517f-4a27-84b7-41d2b994667c.png")
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
  background: url("./img/psvn4p33jexoocw3x7lstgio44qc4hx4hex9d12abc3-d971-445c-bea6-aaa6e39fe0cc.png")
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
    background: url(./img/psuxctvt94b9pbbzexbzqrdik4dxl3gs5j8b7d8723-946b-4105-aa2f-6a4d1ae9af53.png)
      100% no-repeat;
    background-size: 100% 100%;
    // background-color: #fff; // 进行修改未选中背景和字体
    color: #fff;
  }
  .el-pagination.is-background .btn-next {
    background: url(./img/psuxctvt94b9pbbzexbzqrdik4dxl3gs5j8b7d8723-946b-4105-aa2f-6a4d1ae9af53.png)
      100% no-repeat;
    background-size: 100% 100%;
    // background-color: #fff; // 进行修改未选中背景和字体
    color: #fff;
  }
  .el-pagination.is-background .el-pager li:not(.disabled) {
    background: url(./img/psuxctvt94b9pbbzexbzqrdik4dxl3gs5j8b7d8723-946b-4105-aa2f-6a4d1ae9af53.png)
      100% no-repeat;
    background-size: 100% 100%;
    // background-color: #fff; // 进行修改未选中背景和字体
    color: #fff;
  }
  .el-pagination.is-background .el-pager li:not(.disabled).active {
    background: url(./img/psmkw5orjugwcfaonjupq2mi7p17hucldwb666fd7b-2e12-410f-ac9c-19c0ce6617cf.png)
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
