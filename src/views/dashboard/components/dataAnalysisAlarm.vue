<template>
  <div class="box_39 flex-col">
    <div class="box_50 flex-row">
      <div class="box_40 flex-col"></div>
      <span class="text_77">数据分析</span>
      <div class="box_41 flex-col"></div>
      <div class="box_42 flex-col"></div>
    </div>
    <img
      class="image_6"
      referrerpolicy="no-referrer"
      src="@/assets/dashboard/img/psi1z7wgvwezdlqdl2qk4lcfrk934yuvj3b804ea5-08d3-42f5-bacc-5980815e3419.png"
    />
    <el-row :gutter="20" class="box_51 flex-row">
      <el-col :span="3">
        <img
          class="label_6"
          referrerpolicy="no-referrer"
          src="@/assets/dashboard/img/ps76javdz1ltapwdgumx2rasiiujk0m1l8f39812cf-553f-49ec-aa78-ac8d4536e9c3.png"
        />
      </el-col>
      <el-col :span="10" style="margin-top: 10px">
        <span class="text_78">今日计划数100</span>
      </el-col>
      <el-col :span="7" style="margin-top: 10px">
        <span class="text_79">80</span>
        <span class="text_80">/</span>
        <span class="text_81">100</span>
      </el-col>
    </el-row>
    <el-row
      :gutter="20"
      class="box_52 flex-row justify-between"
      style="margin-left: 10px"
    >
      <el-col :span="20" style="width: 100%; height: 40px">
        <div class="group_15 flex-col" style="margin-top: 30px">
          <div class="group_16 flex-col"></div>
        </div>
        <span class="text_82" style="margin-top: 30px">80%</span>
      </el-col>
    </el-row>
    <el-row
      :gutter="24"
      class="box_53 flex-row justify-between"
      style="margin-left: 5px; margin-right: -12px"
    >
      <el-col :span="8" style="height: 100%; width: 33.3%; margin-top: 20px">
        <e-charts class="chart" :option="option" />
      </el-col>
      <el-col :span="8" style="height: 100%; width: 33.3%; margin-top: 20px">
        <e-charts class="chart" :option="option" />
      </el-col>
      <el-col :span="8" style="height: 100%; width: 33.3%; margin-top: 20px">
        <e-charts class="chart" :option="option" />
      </el-col>
    </el-row>
    <el-row
      :gutter="24"
      class="text-wrapper_67 flex-row"
      style="margin-left: 0; width: 100%; text-align: center"
    >
      <el-col :span="8" style="width: 33%; margin-top: 15px">
        <span class="text_83">OEE</span>
      </el-col>
      <el-col :span="8" style="width: 33%; margin-top: 15px">
        <span class="text_84">性能稼动率</span>
      </el-col>
      <el-col :span="8" style="width: 33%; margin-top: 15px">
        <span class="text_85">时间稼动率</span>
      </el-col>
    </el-row>
    <div class="box_54 flex-row">
      <div class="image-text_9 flex-row justify-between">
        <div class="group_17 flex-col"></div>
        <span class="text-group_4">报警信息</span>
      </div>
      <div class="group_18 flex-col"></div>
      <div class="group_19 flex-col"></div>
    </div>
    <img
      class="image_7"
      referrerpolicy="no-referrer"
      src="@/assets/dashboard/img/pshq9yi38nlda0112obhknmggeasvkveo0uhh35235d38-9046-44a7-8749-fc6d1b086936.png"
    />
    <div class="text-wrapper_26 flex-row">
      <span class="text_86">时间</span>
      <span class="text_87">事件</span>
    </div>
    <div class="text-wrapper_27 flex-row">
      <span class="text_88">2021-3-20&nbsp;6:20</span>
      <span class="text_89">光栅报警停机</span>
    </div>
    <div class="text-wrapper_28 flex-row">
      <span class="text_90">2021-3-20&nbsp;6:20</span>
      <span class="text_91">光栅报警停机</span>
    </div>
    <div class="text-wrapper_29 flex-row">
      <span class="text_92">2021-3-20&nbsp;6:20</span>
      <span class="text_93">光栅报警停机</span>
    </div>
    <div class="text-wrapper_30 flex-row">
      <span class="text_94">2021-3-20&nbsp;6:20</span>
      <span class="text_95">光栅报警停机</span>
    </div>
    <div class="text-wrapper_31 flex-row">
      <span class="text_96">2021-3-20&nbsp;6:20</span>
      <span class="text_97">光栅报警停机</span>
    </div>
    <div class="text-wrapper_32 flex-row">
      <span class="text_98">2021-3-20&nbsp;6:20</span>
      <span class="text_99">光栅报警停机</span>
    </div>
    <!-- <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="date" label="日期" style="width: 50%">
      </el-table-column>
      <el-table-column prop="name" label="姓名" style="width: 50%">
      </el-table-column>
    </el-table> -->
    <!-- <div class="box_55 flex-row justify-between">
      <div class="section_16 flex-col"></div>
      <span class="text_100">报警频次数</span>
    </div>
    <div class="box_56 flex-row justify-between">
      <div class="text-wrapper_68 flex-col">
        <span class="text_101">50</span>
        <span class="text_102">40</span>
        <span class="text_103">30</span>
        <span class="text_104">20</span>
        <span class="text_105">10</span>
        <span class="text_106">0</span>
      </div>
      <div class="section_22 flex-row">
        <div class="group_20 flex-col"></div>
        <div class="group_21 flex-col">
          <div class="group_22 flex-col"></div>
        </div>
      </div>
      <div class="group_20 flex-col"></div>
    </div>
    <div class="text-wrapper_69 flex-row justify-between">
      <span class="text_107">1:00</span>
      <span class="text_108">3:00</span>
      <span class="text_109">5:00</span>
      <span class="text_110">7:00</span>
      <span class="text_111">9:00</span>
      <span class="text_112">10:00</span>
    </div>

    <div class="block_26 flex-col">
      <div class="block_27 flex-col align-center">
        <div class="box_46 flex-col">
          <div class="box_47 flex-col"></div>
        </div>
      </div>
    </div> -->
    <div class="block_26 flex-col">
      <e-charts class="chart" :option="option2" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
        },
      ],
    };
  },
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
            fontSize: 20,
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
};
</script>

<style scoped lang="css" src="@/assets/dashboard/index.css" />
<style scoped>
.chart {
  height: 100%;
  width: 100%;
}
</style>
