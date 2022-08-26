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
        <el-table
          v-loading="listLoading"
          :data="list"
          element-loading-text="Loading"
          style="margin-top: 50px"
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
          <el-table-column label="设备名称" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.machineName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="次数" align="center">
            <template slot-scope="scope">{{ scope.row.description }}</template>
          </el-table-column>
        </el-table>

        <pagination
          v-show="total > 0"
          :total="total"
          :page.sync="listQuery.page"
          :limit.sync="listQuery.limit"
          @pagination="fetchData"
        />
      </template>
      <template slot="paneR">
        <e-charts class="chart" :option="option" />
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
    option() {
      return {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999",
            },
          },
        },
        // legend: {
        //   isShow: false,
        //   data: ["参数", "异常率"],
        // },
        xAxis: [
          {
            type: "category",
            data: this.data1.map((e) => e.name),
            axisPointer: {
              type: "shadow",
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            // name: "异常参数",
            min: 0,
            axisLabel: {
              formatter: "{value} 个",
            },
          },
          {
            type: "value",
            // name: "异常率",
            min: 0,
            axisLabel: {
              formatter: "{value} %",
            },
          },
        ],
        series: [
          {
            // name: "参数",
            type: "bar",
            tooltip: {
              valueFormatter: function (value) {
                return value + " 个";
              },
            },
            data: this.data1.map((e) => e.value),
          },
          {
            // name: "异常率",
            type: "line",
            yAxisIndex: 1,
            tooltip: {
              valueFormatter: function (value) {
                return value + " %";
              },
            },
            data: this.data2.map((e) => e.value),
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
</style>
