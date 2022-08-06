<template>
  <div class="box_6 flex-col">
    <div class="text-wrapper_1 flex-col">
      <span class="text_6">设备状态</span>
    </div>
    <el-row :gutter="20" class="box_7 flex-row" style="margin-left: 12px">
      <el-col :span="3" style="padding: 0">
        <img
          class="label_4"
          referrerpolicy="no-referrer"
          src="@/assets/dashboard/img/psyg84bdrnu8lv3nrjeozll97lfqxdb2zbb1d999802-1ada-4770-99c7-9f2ae21feaa8.png"
        />
      </el-col>
      <el-col :span="6" class="box_7_row-col" style="padding-left: 0px">
        <span class="text_7">设备1流量速度</span>
      </el-col>
      <el-col :span="6" class="box_7_row-col">
        <span class="text_8">10mb&nbsp;&nbsp;&nbsp;&nbsp;10m/s</span>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="box_7 flex-row" style="margin-left: 12px">
      <el-col :span="3" style="padding: 0">
        <div class="block_1 flex-col"></div>
      </el-col>
      <el-col :span="6" class="box_7_row-col" style="padding-left: 0px">
        <span class="text_9" style="margin-left: 0px">设备2流量速度</span>
      </el-col>
      <el-col :span="6" class="box_7_row-col">
        <span class="text_10">20mb&nbsp;&nbsp;&nbsp;&nbsp;20m/s</span>
      </el-col>
    </el-row>
    <el-row
      :gutter="20"
      class="text-wrapper_45 flex-row justify-between"
      style="width: 100%; margin-left: 0"
    >
      <el-col :span="10" class="text-wrapper_45_row-col">
        <span class="text_11">设备流量</span>
      </el-col>
      <el-col :span="10" class="text-wrapper_45_row-col">
        <span class="text_12">设备流量</span>
      </el-col>
    </el-row>
    <el-row
      :gutter="20"
      class="group_27 flex-row justify-between"
      style="width: 100%; margin-left: 10px; margin-right: 10px"
    >
      <el-col :span="10" class="group_4 flex-col">
        <e-charts class="chart" :option="option" />
      </el-col>
      <el-col :span="10" class="group_5 flex-col">
        <e-charts class="chart" :option="option" />
      </el-col>
    </el-row>
    <el-row
      :gutter="24"
      class="group_29 flex-row"
      style="width: 100%; margin-left: 0"
    >
      <el-col :span="12" style="width: 50%">
        <div class="text-wrapper_8 flex-row">
          <span class="text_23">10</span>
          <span class="text_24">mb</span>
        </div>
      </el-col>
      <el-col :span="12" style="width: 50%">
        <div :span="12" class="box_13_1 flex-row justify-between">
          <span class="text_25">20</span>
          <span class="text_26">mb</span>
        </div>
      </el-col>
    </el-row>
    <el-row
      :gutter="20"
      class="text-wrapper_51 flex-row justify-between"
      style="width: 100%; margin-left: 0"
    >
      <el-col :span="10" class="text-wrapper_51_row-col">
        <span class="text_27">设备速度</span>
      </el-col>
      <el-col :span="10" class="text-wrapper_51_row-col">
        <span class="text_28">设备速度</span>
      </el-col>
    </el-row>
    <el-row
      :gutter="20"
      class="group_30 flex-row justify-between"
      style="margin-left: 10px; margin-right: 10px"
    >
      <el-col :span="9" class="group_30_row-col">
        <e-charts class="chart" :option="option" />
      </el-col>
      <el-col :span="9" class="group_30_row-col">
        <e-charts class="chart" :option="option" />
      </el-col>
    </el-row>
    <div class="group_32 flex-row">
      <div class="block_2 flex-col"></div>
      <div class="block_3 flex-col"></div>
      <div class="block_4 flex-col"></div>
      <div class="block_5 flex-col"></div>
    </div>
    <el-row
      :gutter="24"
      class="group_33 flex-row justify-between"
      style="margin-left: 10px; margin-right: 10px"
    >
      <el-col :span="12" style="width: 50%">
        <div class="box_19 flex-row">
          <span class="text_39">10</span>
          <span class="text_40">m/s</span>
          <!-- <div class="box_20 flex-col"></div>
          <div class="box_21 flex-col"></div> -->
        </div>
      </el-col>
      <el-col :span="12" style="width: 50%">
        <div class="box_22 flex-row">
          <span class="text_41">20</span>
          <span class="text_42">m/s</span>
          <div class="section_8 flex-col"></div>
          <div class="section_9 flex-col"></div>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="box_23 flex-row" style="margin-left: 12px">
      <el-col :span="2" style="margin-top: 10px; margin-left: 10px">
        <div class="group_9 flex-col"></div>
      </el-col>
      <el-col :span="6" class="image-text_6 flex-row justify-between">
        <span class="text-group_1">设备1温度湿度</span>
      </el-col>
      <el-col :span="6" style="margin-top: 8px">
        <span class="text_43">10mb&nbsp;&nbsp;&nbsp;&nbsp;10m/s</span>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="box_24 flex-row" style="margin-left: 12px">
      <el-col :span="2" style="margin-top: 10px; margin-left: 10px">
        <div class="box_25 flex-col"></div>
      </el-col>
      <el-col :span="6">
        <div class="image-text_7 flex-row justify-between">
          <span class="text-group_2">设备2温度湿度</span>
        </div>
      </el-col>
      <el-col :span="6" style="margin-top: 8px">
        <span class="text_44">20mb&nbsp;&nbsp;&nbsp;&nbsp;20m/s</span>
      </el-col>
    </el-row>
    <el-row
      :gutter="20"
      class="text-wrapper_56 flex-row justify-between"
      style="margin-left: 0; margin-right: 10px"
    >
      <el-col :span="10" class="text-wrapper_56_row-col">
        <span class="text_45">设备温度</span>
      </el-col>
      <el-col :span="10" class="text-wrapper_56_row-col">
        <span class="text_46">设备湿度</span>
      </el-col>
    </el-row>
    <el-row
      :gutter="20"
      class="group_30 flex-row justify-between"
      style="margin-left: 10px; margin-right: 10px"
    >
      <el-col :span="9" class="group_30_row-col">
        <e-charts class="chart" :option="option" />
      </el-col>
      <el-col :span="9" class="group_30_row-col">
        <e-charts class="chart" :option="option" />
      </el-col>
    </el-row>
    <div class="group_36 flex-row">
      <!-- <div class="block_6 flex-col"></div>
      <div class="block_7 flex-col"></div> -->
      <div class="block_8 flex-col"></div>
      <div class="block_9 flex-col"></div>
    </div>
    <el-row
      :gutter="20"
      class="group_37 flex-row justify-between"
      style="margin-left: 0"
    >
      <el-col :span="10" style="width: 50%">
        <div class="block_10 flex-row">
          <span class="text_57">10</span>
          <span class="text_58">度</span>
          <div class="block_11 flex-col"></div>
          <div class="block_12 flex-col"></div>
        </div>
      </el-col>
      <el-col :span="10" style="width: 50%">
        <div class="block_13 flex-row">
          <span class="text_59">20</span>
          <span class="text_60">度</span>
          <div class="group_11 flex-col"></div>
          <div class="group_12 flex-col"></div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="text-wrapper_60 flex-row justify-between">
      <el-col :span="10" class="text-wrapper_60_row-col">
        <span class="text_61">设备温度</span>
      </el-col>
      <el-col :span="10" class="text-wrapper_60_row-col">
        <span class="text_62">设备湿度</span>
      </el-col>
    </el-row>
    <el-row
      :gutter="20"
      class="group_30 flex-row justify-between"
      style="margin-left: 10px; margin-right: 10px"
    >
      <el-col :span="9" class="group_30_row-col">
        <e-charts class="chart" :option="option" />
      </el-col>
      <el-col :span="9" class="group_30_row-col">
        <e-charts class="chart" :option="option" />
      </el-col>
    </el-row>
    <div class="group_39 flex-row">
      <div class="section_10 flex-col"></div>
      <div class="section_11 flex-col"></div>
      <div class="section_12 flex-col"></div>
      <div class="section_13 flex-col"></div>
    </div>
    <el-row
      :gutter="20"
      class="group_40 flex-row justify-between"
      style="margin-left: 0"
    >
      <el-col :span="10" style="width: 50%">
        <div class="box_35 flex-row">
          <span class="text_73">10</span>
          <span class="text_74">度</span>
          <div class="section_14 flex-col"></div>
          <div class="section_15 flex-col"></div>
        </div>
      </el-col>
      <el-col :span="10" style="width: 50%">
        <div class="box_36 flex-row">
          <span class="text_75">20</span>
          <span class="text_76">度</span>
          <div class="group_13 flex-col"></div>
          <div class="group_14 flex-col"></div>
        </div>
      </el-col>
    </el-row>
    <div class="group_41 flex-row justify-between">
      <div class="box_12 flex-col"></div>
      <div class="box_14 flex-col"></div>
    </div>
    <div class="group_42 flex-row justify-between">
      <div class="box_12 flex-col"></div>
      <div class="box_14 flex-col"></div>
    </div>
  </div>
</template>

<script>
export default {
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
                width: 10,
                // 颜色渐变
              },
            },
            progress: {
              show: true,
              itemStyle: {
                color: "#00A9FF",
              },
            },
            // 指针
            pointer: {
              itemStyle: {
                color: "#00A9FF",
              },
              icon: "path://M39.66,80a17,17,0,0,1-2-.14h0A19.74,19.74,0,0,1,23.82,72a18.45,18.45,0,0,1,.44-23,19.07,19.07,0,0,1,6.59-5.17.6.6,0,0,0,.39-.52c.89-5.67,1.8-11.33,2.69-17q1.14-7.18,2.27-14.38c.52-3.32,1-6.63,1.58-9.95A2.22,2.22,0,0,1,39.57,0a2.15,2.15,0,0,1,2.3,1,4.85,4.85,0,0,1,.44,1.52q1,6.2,2,12.4.93,5.86,1.85,11.73T48,38.37c.27,1.66.53,3.32.81,5a.59.59,0,0,0,.29.4,19.38,19.38,0,0,1,7.66,6.54,18.46,18.46,0,0,1,1.38,18.57,19.27,19.27,0,0,1-7.07,7.92,20.81,20.81,0,0,1-8.2,3l-.71.1a14.7,14.7,0,0,1-1.63.09Z",
              // 指针宽度
              width: "10",
              // 指针高度
              length: "30",
            },
            // 隐藏分隔线
            splitLine: {
              show: true,
            },
            // 隐藏刻度
            axisTick: {
              show: true,
              //distance: 0, // 分隔线与轴线的距离。
              length: 8, // 刻度线长。支持相对半径的百分比。
              lineStyle: {
                // { color , width , type , dashOffset , cap , join , miterLimit , shadowBlur , shadowColor , shadowOffsetX , shadowOffsetY , opacity }
                color: "#00A9FF",
                width: 2,
              },
            },
            // 隐藏刻度
            axisLabel: {
              show: false,
            },
            // 隐藏详情
            detail: {
              show: false,
            },
            data: [
              {
                value: 50,
              },
            ],
          },
        ],
      };
    },
  },
};
</script>

<style scoped lang="css" src="@/assets/dashboard/index.css" />
<style scoped>
.chart {
  height: 100%;
}
</style>
