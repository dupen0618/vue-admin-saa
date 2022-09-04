<template>
  <div class="leftStatus-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix text-wrapper_leftStaus">
        <span class="text1_leftStatus">设备状态</span>
      </div>
      <!-- 流量、速度 -->
      <el-row :gutter="20" class="box1_leftStatus" style="margin-left: 10px">
        <el-col :span="2">
          <img
            class="label_4"
            referrerpolicy="no-referrer"
            src="@/assets/dashboard/img/psyg84bdrnu8lv3nrjeozll97lfqxdb2zbb1d999802-1ada-4770-99c7-9f2ae21feaa8.png"
          />
        </el-col>
        <el-col :span="11" class="text2_letfStatus">
          <span>Suction Cup Gas</span>
        </el-col>
        <el-col :span="11" class="text3_letfStatus_1">
          <span>
            {{ statusList.suctionCupGasOption.data }}
            <!-- &nbsp;&nbsp;&nbsp;&nbsp;{{
              statusList.speedOption1.data
            }}m/s-->
          </span>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="box1_leftStatus" style="margin-left: 10px; margin-top: 5px">
        <el-col :span="2">
          <img
            class="label_4"
            referrerpolicy="no-referrer"
            src="@/assets/dashboard/img/psyg84bdrnu8lv3nrjeozll97lfqxdb2zbb1d999802-1ada-4770-99c7-9f2ae21feaa8.png"
          />
        </el-col>
        <el-col :span="11" class="text2_letfStatus">
          <span>Cylinder Gas</span>
        </el-col>
        <el-col :span="11" class="text3_letfStatus_1">
          <span>
            {{ statusList.cylinderGasOption.data }}
            <!-- &nbsp;&nbsp;&nbsp;&nbsp;{{
              statusList.speedOption2.data
            }}m/s-->
          </span>
        </el-col>
      </el-row>

      <el-row :gutter="20" style="margin-top: 10px; text-align: center">
        <el-col :span="12">
          <span class="text4_leftStatus">Suction Cup Gas</span>
        </el-col>
        <el-col :span="12">
          <span class="text4_leftStatus">Cylinder Gas</span>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="group30_leftStatus" style="margin-left: 0">
        <el-col :span="12" class="group30_2_leftStatus">
          <e-charts class="chart" :option="suctionCupGasOption" />
        </el-col>
        <el-col :span="12" class="group30_2_leftStatus">
          <e-charts class="chart" :option="cylinderGasOption" />
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12" style="text-align: center">
          <div class="box19_leftStatus">
            <span class="text_39">
              {{
              statusList.suctionCupGasOption.data
              }}
            </span>
            <span class="text_40"></span>
          </div>
        </el-col>
        <el-col :span="12" style="text-align: center">
          <div class="box19_leftStatus">
            <span class="text_41">{{ statusList.cylinderGasOption.data }}</span>
            <span class="text_42"></span>
          </div>
        </el-col>
      </el-row>

      <!-- <el-row :gutter="20" style="margin-top: 10px; text-align: center">
        <el-col :span="12"
          ><span class="text4_leftStatus">CylinderGas</span></el-col
        >
        <el-col :span="12"
          ><span class="text4_leftStatus">设备速度</span></el-col
        >
      </el-row>
      <el-row :gutter="20" class="group30_leftStatus" style="margin-left: 0">
        <el-col :span="12" class="group30_2_leftStatus"
          ><e-charts class="chart" :option="flowOption2"
        /></el-col>
        <el-col :span="12" class="group30_2_leftStatus"
          ><e-charts class="chart" :option="speedOption2"
        /></el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12" style="text-align: center">
          <div class="box19_leftStatus">
            <span class="text_39">{{ statusList.flowOption1.data }}</span>
            <span class="text_40">mb</span>
          </div>
        </el-col>
        <el-col :span="12" style="text-align: center">
          <div class="box19_leftStatus">
            <span class="text_41">{{ statusList.speedOption2.data }}</span>
            <span class="text_42">m/s</span>
          </div>
        </el-col>
      </el-row>-->

      <!-- 温度 -->
      <el-row :gutter="20" class="box1_leftStatus" style="margin-left: 10px; margin-top: 20px">
        <el-col :span="2">
          <img
            class="label_4"
            referrerpolicy="no-referrer"
            src="@/assets/dashboard/img/psyg84bdrnu8lv3nrjeozll97lfqxdb2zbb1d999802-1ada-4770-99c7-9f2ae21feaa8.png"
          />
        </el-col>
        <el-col :span="11" class="text2_letfStatus">
          <span>Suction Nozzle Life</span>
        </el-col>
        <el-col :span="11" class="text3_letfStatus_1">
          <span>
            {{ statusList.suctionNozzleLifeOption.data }}
            <!-- &nbsp;&nbsp;&nbsp;&nbsp;{{
              statusList.humidityOption1.data
            }}度-->
          </span>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="box1_leftStatus" style="margin-left: 10px; margin-top: 5px">
        <el-col :span="2">
          <img
            class="label_4"
            referrerpolicy="no-referrer"
            src="@/assets/dashboard/img/psyg84bdrnu8lv3nrjeozll97lfqxdb2zbb1d999802-1ada-4770-99c7-9f2ae21feaa8.png"
          />
        </el-col>
        <el-col :span="11" class="text2_letfStatus">
          <span>Power Consumption</span>
        </el-col>
        <el-col :span="11" class="text3_letfStatus_1">
          <span>
            {{ statusList.powerConsumptionOption.data }}
            <!-- &nbsp;&nbsp;&nbsp;&nbsp;{{
              statusList.humidityOption2.data
            }}度-->
          </span>
        </el-col>
      </el-row>

      <el-row :gutter="20" style="margin-top: 10px; text-align: center">
        <el-col :span="12">
          <span class="text4_leftStatus">Suction Nozzle Life</span>
        </el-col>
        <el-col :span="12">
          <span class="text4_leftStatus">Power Consumption</span>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="group30_leftStatus" style="margin-left: 0">
        <el-col :span="12" class="group30_2_leftStatus">
          <e-charts class="chart" :option="suctionNozzleLifeOption" />
        </el-col>
        <el-col :span="12" class="group30_2_leftStatus">
          <e-charts class="chart" :option="powerConsumptionOption" />
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12" style="text-align: center">
          <div class="box19_leftStatus">
            <span class="text_39">
              {{
              statusList.suctionNozzleLifeOption.data
              }}
            </span>
            <span class="text_40"></span>
          </div>
        </el-col>
        <el-col :span="12" style="text-align: center">
          <div class="box19_leftStatus">
            <span class="text_41">
              {{
              statusList.powerConsumptionOption.data
              }}
            </span>
            <span class="text_42"></span>
          </div>
        </el-col>
      </el-row>

      <!-- <el-row :gutter="20" style="margin-top: 10px; text-align: center">
        <el-col :span="12"
          ><span class="text4_leftStatus">设备温度</span></el-col
        >
        <el-col :span="12"
          ><span class="text4_leftStatus">设备湿度</span></el-col
        >
      </el-row>
      <el-row :gutter="20" class="group30_leftStatus" style="margin-left: 0">
        <el-col :span="12" class="group30_2_leftStatus"
          ><e-charts class="chart" :option="temperatureOption2"
        /></el-col>
        <el-col :span="12" class="group30_2_leftStatus"
          ><e-charts class="chart" :option="humidityOption2"
        /></el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12" style="text-align: center">
          <div class="box19_leftStatus">
            <span class="text_39">{{
              statusList.temperatureOption2.data
            }}</span>
            <span class="text_40">度</span>
          </div>
        </el-col>
        <el-col :span="12" style="text-align: center">
          <div class="box19_leftStatus">
            <span class="text_41">{{ statusList.humidityOption2.data }}</span>
            <span class="text_42">度</span>
          </div>
        </el-col>
      </el-row>-->
    </el-card>
  </div>
</template>

<script>
// import splitPane from "vue-splitpane";

export default {
  // components: { splitPane },
  props: [
    "flowOption1",
    "flowOption2",
    "speedOption1",
    "speedOption2",
    "temperatureOption1",
    "temperatureOption2",
    "humidityOption1",
    "humidityOption2",
    "suctionCupGasOption",
    "cylinderGasOption",
    "suctionNozzleLifeOption",
    "powerConsumptionOption",
    "statusList"
  ],
  name: "leftStatus",
  setup() {
    return {};
  },
  computed: {
    option() {
      return {
        series: [
          {
            name: "Pressure",
            type: "gauge",
            // 开始角度
            startAngle: 180,
            // 结束角度
            endAngle: 0,
            // 半径
            radius: 65,
            // 位置下移
            center: ["50%", "90%"],
            axisLine: {
              lineStyle: {
                // 仪表盘宽度
                width: 10
                // 颜色渐变
              }
            },
            progress: {
              show: true,
              itemStyle: {
                color: "#00A9FF"
              }
            },
            // 指针
            pointer: {
              itemStyle: {
                color: "#00A9FF"
              },
              icon:
                "path://M39.66,80a17,17,0,0,1-2-.14h0A19.74,19.74,0,0,1,23.82,72a18.45,18.45,0,0,1,.44-23,19.07,19.07,0,0,1,6.59-5.17.6.6,0,0,0,.39-.52c.89-5.67,1.8-11.33,2.69-17q1.14-7.18,2.27-14.38c.52-3.32,1-6.63,1.58-9.95A2.22,2.22,0,0,1,39.57,0a2.15,2.15,0,0,1,2.3,1,4.85,4.85,0,0,1,.44,1.52q1,6.2,2,12.4.93,5.86,1.85,11.73T48,38.37c.27,1.66.53,3.32.81,5a.59.59,0,0,0,.29.4,19.38,19.38,0,0,1,7.66,6.54,18.46,18.46,0,0,1,1.38,18.57,19.27,19.27,0,0,1-7.07,7.92,20.81,20.81,0,0,1-8.2,3l-.71.1a14.7,14.7,0,0,1-1.63.09Z",
              // 指针宽度
              width: "10",
              // 指针高度
              length: "30"
            },
            // 隐藏分隔线
            splitLine: {
              show: true
            },
            // 隐藏刻度
            axisTick: {
              show: true,
              // distance: 0, // 分隔线与轴线的距离。
              length: 8, // 刻度线长。支持相对半径的百分比。
              lineStyle: {
                // { color , width , type , dashOffset , cap , join , miterLimit , shadowBlur , shadowColor , shadowOffsetX , shadowOffsetY , opacity }
                color: "#00A9FF",
                width: 2
              }
            },
            // 隐藏刻度
            axisLabel: {
              show: false
            },
            // 隐藏详情
            detail: {
              show: false
            },
            data: [
              {
                value: 50
              }
            ]
          }
        ]
      };
    }
  }
};
</script>

<style scoped lang="css" src="@/assets/dashboard/index.css" />
<style lang="scss" scoped>
.leftStatus-container {
  /* background-color: #f38181; */
  height: 100%;
}
.left-top-container {
  background-color: #fce38a;
  width: 100%;
  height: 100%;
}

.left-bottom-container {
  width: 100%;
  background-color: #95e1d3;
  height: 100%;
}

.text {
  font-size: 14px;
  color: aliceblue;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
::v-deep .el-card__header {
  border-bottom-width: 0px;
  padding: 10px 20px 10px 20px;
}
::v-deep .el-card__body {
  padding: 10px 10px 10px 10px;
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
.chart {
  height: 100%;
}
</style>
