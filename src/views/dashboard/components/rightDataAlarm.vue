<template>
  <div class="rightDataAlarm-container">
    <split-pane split="horizontal" :default-percent="35">
      <!-- 数据分析 -->
      <template slot="paneL">
        <el-card class="box-card">
          <div slot="header" class="clearfix text-wrapper_leftStaus">
            <span class="text1_leftStatus">数据分析</span>
          </div>
          <el-row :gutter="20">
            <el-col :span="2">
              <img
                class="label_6"
                referrerpolicy="no-referrer"
                src="@/assets/dashboard/img/ps76javdz1ltapwdgumx2rasiiujk0m1l8f39812cf-553f-49ec-aa78-ac8d4536e9c3.png"
              />
            </el-col>
            <el-col :span="12" style="margin-top: 10px">
              <span class="text_78"
                >今日计划数{{ dataAnalysis.numberOfPlans }}</span
              >
            </el-col>
            <el-col :span="10" style="margin-top: 10px">
              <span class="text_79">{{ dataAnalysis.nowQty }}</span>
              <span class="text_80">/</span>
              <span class="text_81">{{ dataAnalysis.planQty }}</span>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24"
              ><el-progress
                :percentage="dataAnalysis.completionRate"
                :stroke-width="10"
              ></el-progress
            ></el-col>
          </el-row>
          <el-row
            :gutter="20"
            class="box53_rightDataAlarm"
            style="margin-left: 0px"
          >
            <el-col :span="8" style="height: 100%; width: 33.3%">
              <e-charts class="chart" :option="option" />
            </el-col>
            <el-col :span="8" style="height: 100%; width: 33.3%">
              <e-charts class="chart" :option="option"
            /></el-col>
            <el-col :span="8" style="height: 100%; width: 33.3%">
              <e-charts class="chart" :option="option"
            /></el-col>
          </el-row>
          <el-row :gutter="20" style="margin-top: 10px">
            <el-col :span="8" style="text-align: center">
              <span class="text_83">OEE</span>
            </el-col>
            <el-col :span="8" style="text-align: center">
              <span class="text_84">性能稼动率</span>
            </el-col>
            <el-col :span="8" style="text-align: center">
              <span class="text_85">时间稼动率</span>
            </el-col>
          </el-row>
        </el-card>
      </template>
      <!-- 报警信息 -->
      <template slot="paneR">
        <el-card class="box-card">
          <div slot="header" class="clearfix text-wrapper_leftStaus">
            <span class="text1_leftStatus">报警信息</span>
          </div>

          <el-table
            :data="list"
            style="
              width: 100%;
              margin-left: 0px;
              background-color: rgba(4, 38, 90, 0.3072);
              font-size: 16px;
              color: rgba(255, 255, 255, 1);
              border: none;
            "
            :cell-style="{
              background: '#04265a',
              borderColor: '#00a9ff',
              padding: '5px',
            }"
            :row-style="{ height: '20px' }"
            :header-cell-style="{ background: '#04265a', color: '#ffffff' }"
          >
            <el-table-column label="时间" min-width="200" align="center">
              <template slot-scope="scope">
                {{ scope.row.createDate }}
              </template>
            </el-table-column>
            <el-table-column label="事件" width="195" align="center">
              <template slot-scope="scope">
                {{ scope.row.alarmInfo }}
              </template>
            </el-table-column>
          </el-table>
          <el-row
            :gutter="20"
            class="block26_rightDataAlarm"
            style="margin-top: 10px"
          >
            <el-col :span="24" style="height: 85%; width: 100%">
              <e-charts class="chart" :option="option2" />
            </el-col>
          </el-row>
        </el-card>
      </template>
    </split-pane>
  </div>
</template>

<script>
import splitPane from "vue-splitpane";

export default {
  components: { splitPane },
  props: ["dataAnalysis"],
  computed: {
    option() {
      return {
        series: [
          //系列
          {
            name: "机组效率",
            type: "pie", //pie类型的图实现环形图
            radius: ["60%", "90%"], //数组的话，表示内圆和外圆的半径大小，相对于宽高中较小的那一个。
            center: ["50%", "50%"], //圆心坐标
            avoidLabelOverlap: false, //是否启用防止标签重叠策略
            startAngle: 270, //第一个数据开始绘制的角度，以正交直角坐标系为标准
            label: {
              //每个数据的标签
              show: true, //设置为true则显示第一个数据
              position: "center", //位置居中
              formatter: "{d}%", //{d}表示数据在总数据中的百分比
              fontSize: 20,
              fontWeight: "bold",
            },
            color: ["#00A9FF", "#1E3E55"], //系列的颜色
            emphasis: {
              //高亮，即鼠标经过时的样式
              scale: false, //表示不放大item
            },
            labelLine: {
              show: true,
            },
            data: [
              { value: 80, name: "" },
              {
                value: 20,
                name: "",
                emphasis: {
                  label: {
                    show: false, //这个数据高亮时不显示label，就不会显示替遮住第一个数据的label值了
                  },
                },
              },
            ],
          },
        ],
      };
    },
    option2() {
      return {
        tooltip: {
          trigger: "axis",
        },
        legend: {
          textStyle: {
            fontSize: 15,
            color: "rgba(251, 248, 248, 1)",
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "报警频次数",
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: "line",
            areaStyle: {},
          },
        ],
      };
    },
  },
  name: "rightDataAlarm",
  data() {
    return { list: null };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.list = [];
      for (var i = 0; i < 6; i++) {
        this.list.push({
          createDate: "2022-08-17 14:50:55",
          alarmInfo: "光栅报警停机",
        });
      }
    },
  },
};
</script>

<style scoped lang="css" src="@/assets/dashboard/index.css" />
<style lang="scss" scoped>
.rightDataAlarm-container {
  width: 100%;
  /* background-color: #95e1d3; */
  height: 100%;
  // background-color: rgba(4, 38, 90, 0.3072);
  // border: 1px solid rgba(0, 169, 255, 0.48);
}
.right-top-container {
  // background-color: #fce38a;
  width: 100%;
  height: 100%;
}

.right-bottom-container {
  // background-color: #95e1d3;
  width: 100%;
  height: 100%;
}
.box-card {
  background-color: rgba(4, 38, 90, 0.3072);
  position: absolute;
  left: 0;
  top: -16px;
  width: 100%;
  height: 100%;
  border: 1px solid rgba(0, 169, 255, 0.48);
}
::v-deep .el-card__header {
  border-bottom-width: 0px;
  padding: 10px 20px 10px 20px;
}
::v-deep .el-card__body {
  padding: 10px 10px 10px 10px;
}
::v-deep .el-progress__text {
  color: rgba(7, 103, 254, 1);
}

.chart {
  height: 100%;
}
</style>
