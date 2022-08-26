<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.ipAddr"
        placeholder="机台编号"
        style="width: 200px"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-input
        v-model="listQuery.station"
        placeholder="工站"
        style="width: 150px; margin-left: 5px"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-input
        v-model="listQuery.line"
        placeholder="线别"
        style="width: 150px; margin-left: 5px"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-input
        v-model="listQuery.machineType"
        placeholder="机型"
        style="width: 150px; margin-left: 5px"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-input
        v-model="listQuery.description"
        placeholder="报警名称"
        style="width: 200px; margin-left: 5px"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-select
        v-model="listQuery.alarmType"
        placeholder="报警类别"
        clearable
        class="filter-item"
        style="width: 200px; margin-left: 5px"
      >
        <el-option
          v-for="item in alarmTypeOptions"
          :key="item.key"
          :label="item.display_name"
          :value="item.key"
        />
      </el-select>

      <el-date-picker
        v-model="listQuery.startTime"
        type="date"
        placeholder="开始时间"
        style="width: 200px; margin-left: 5px"
      />
      <el-date-picker
        v-model="listQuery.endTime"
        type="date"
        placeholder="结束时间"
        style="width: 200px; margin-left: 5px"
      />

      <el-button
        v-waves
        class="filter-item"
        type="primary"
        style="margin-left: 10px"
        icon="el-icon-search"
        @click="handleFilter"
        >查询</el-button
      >
    </div>
    <split-pane split="vertical" @resize="resize" style="margin-top: 15px">
      <template slot="paneL">
        <div class="left-container">
          <el-table
            v-loading="listLoading"
            :data="list"
            element-loading-text="Loading"
            style="margin-top: 0px"
            border
            fit
            highlight-current-row
          >
            <el-table-column align="center" label="序号" width="95">
              <template slot-scope="scope">{{ scope.$index + 1 }}</template>
            </el-table-column>
            <el-table-column label="编号" align="center">
              <template slot-scope="scope">{{ scope.row.ipAddress }}</template>
            </el-table-column>
            <el-table-column label="名称" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.machineName }}</span>
              </template>
            </el-table-column>
            <el-table-column label="次数" align="center">
              <template slot-scope="scope">{{
                scope.row.description
              }}</template>
            </el-table-column>
          </el-table>

          <pagination
            v-show="total > 0"
            :total="total"
            :page.sync="listQuery.page"
            :limit.sync="listQuery.limit"
            @pagination="fetchData"
          />
        </div>
      </template>
      <template slot="paneR">
        <split-pane split="horizontal">
          <template slot="paneL">
            <div class="top-container">
              <e-charts class="chart" :option="option1" />
            </div>
          </template>
          <template slot="paneR">
            <div class="bottom-container">
              <e-charts class="chart" :option="option2" />
            </div>
          </template>
        </split-pane>
      </template>
    </split-pane>
  </div>
</template>

<script>
import pagination from "@/components/Pagination";
import splitPane from "vue-splitpane";
import waves from "@/directive/waves"; // waves directive

const alarmTypeOptions = [
  { key: -99, display_name: "未連線" },
  { key: -1, display_name: "設備未開機" },
  { key: 0, display_name: "設備待機狀態" },
  { key: 1, display_name: "設備啟動運轉中" },
  { key: 2, display_name: "設備異常停止中" },
  { key: 3, display_name: "手動狀態" },
  { key: 4, display_name: "機台暫停" },
  { key: 5, display_name: "設備警報通知(不停機)" },
  { key: 6, display_name: "設備保養" },
];

export default {
  components: { splitPane, pagination },
  directives: { waves },
  data() {
    return {
      listQuery: {
        ipAddr: undefined,
        station: undefined,
        line: undefined,
        machineType: undefined,
        description: undefined,
        alarmType: undefined,
        startTime: undefined,
        endTime: undefined,
      },
      listLoading: true,
      list: [],
      alarmTypeOptions,
      total: 0,
      data1: [
        {
          name: "Mon",
          value: 2.0,
        },
        {
          name: "Tue",
          value: 4.9,
        },
        {
          name: "Wed",
          value: 7.0,
        },
        {
          name: "Thu",
          value: 23.2,
        },
        {
          name: "Fri",
          value: 25.6,
        },
        {
          name: "Sat",
          value: 76.7,
        },
        {
          name: "Sun",
          value: 135.6,
        },
      ],
      data2: [
        {
          name: "Mon",
          value: 2.0,
        },
        {
          name: "Tue",
          value: 2.2,
        },
        {
          name: "Wed",
          value: 3.3,
        },
        {
          name: "Thu",
          value: 4.5,
        },
        {
          name: "Fri",
          value: 6.3,
        },
        {
          name: "Sat",
          value: 10.2,
        },
        {
          name: "Sun",
          value: 20.3,
        },
      ],
    };
  },
  computed: {
    option1() {
      return {
        title: {
          show: false,
          text: "Referer of a Website",
          subtext: "Fake Data",
          left: "center",
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "horizontal",
          left: "center",
        },
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: "50%",
            data: [
              { value: 1048, name: "严重" },
              { value: 735, name: "警告" },
              { value: 580, name: "一般" },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };
    },
    option2() {
      return {
        xAxis: {
          type: "category",
          data: ["严重", "警告", "一般"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [120, 200, 150],
            type: "bar",
          },
        ],
      };
    },
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.listLoading = false;
    },
    handleFilter() {
      this.listQuery.page = 1;
      this.fetchData();
    },
    resize() {
      console.log("resize");
    },
  },
};
</script>

<style lang="scss" scoped>
.chart {
  height: 400px;
}
.app-container {
  position: relative;
  height: 90vh;
}

.left-container {
  // background-color: #f38181;
  height: 100%;
}

.right-container {
  // background-color: #fce38a;
  height: 200px;
}

.top-container {
  // background-color: #fce38a;
  width: 100%;
  height: 100%;
}

.bottom-container {
  width: 100%;
  // background-color: #95e1d3;
  height: 100%;
}
::v-deep .splitter-pane-resizer {
  .vertical {
    width: 0px;
  }
  .horizontal {
    height: 0px;
  }
}
</style>
