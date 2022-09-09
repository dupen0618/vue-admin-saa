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
      <el-select
        v-model="listQuery.line"
        placeholder="线别"
        clearable
        class="filter-item"
        style="width: 200px; margin-left: 5px"
      >
        <el-option
          v-for="(item, index) in lineList"
          :key="index"
          :label="item.display_name"
          :value="item.value"
        />
      </el-select>
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
          v-for="item in alarmList"
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
        <div class="top-container">
          <el-table
            v-loading="listLoading"
            :data="list"
            element-loading-text="Loading"
            style="margin-top: 50px"
            height="calc(100% - 10rem)"
            border
            fit
            highlight-current-row
          >
            <el-table-column align="center" label="序号" width="95">
              <template slot-scope="scope">{{
                scope.$index + startIndex
              }}</template>
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
              <template slot-scope="scope">{{ scope.row.cnt }}</template>
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
        <div class="bottom-container">
          <e-charts class="chart" :option="option" />
        </div>
      </template>
    </split-pane>
  </div>
</template>

<script>
import pagination from "@/components/Pagination";
import splitPane from "vue-splitpane";
import waves from "@/directive/waves"; // waves directive
import {
  alarmRankingList,
  alarmRankingChart,
  reloadLines,
  reloadAlarmList,
} from "@/api/historicalData";

// const alarmTypeOptions = [
//   { key: -99, display_name: "未連線" },
//   { key: -1, display_name: "設備未開機" },
//   { key: 0, display_name: "設備待機狀態" },
//   { key: 1, display_name: "設備啟動運轉中" },
//   { key: 2, display_name: "設備異常停止中" },
//   { key: 3, display_name: "手動狀態" },
//   { key: 4, display_name: "機台暫停" },
//   { key: 5, display_name: "設備警報通知(不停機)" },
//   { key: 6, display_name: "設備保養" },
// ];
const alarmTypeOptions = ["其他", "一般", "警告", "严重"];

export default {
  components: { splitPane, pagination },
  directives: { waves },
  data() {
    return {
      listQuery: {
        page: 1,
        limit: 20,
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
      lineList: [],
      alarmTypeOptions,
      alarmList: [],
      total: 0,
      startIndex: 0,
      data1: [],
      data2: [],
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
            name: "个",
            axisLabel: {
              formatter: "{value}",
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
    this.reloadLines();
    this.reloadAlarmList();
    this.fetchData();
    this.fetchChart();
  },
  methods: {
    fetchData() {
      this.listLoading = true;
      alarmRankingList(this.listQuery).then((res) => {
        var json = JSON.parse(res.data);
        this.total = json.total;
        this.list = json.items;
        this.startIndex = (this.listQuery.page - 1) * this.listQuery.limit + 1;
        this.listLoading = false;
      });
    },
    fetchChart() {
      alarmRankingChart(this.listQuery).then((res) => {
        var json = JSON.parse(res.data);
        var data1 = [];
        var data2 = [];
        json.items.forEach((element, index, array) => {
          data1.push({ name: element.MachineName, value: element.Cnt });
          data2.push({ name: element.MachineName, value: element.Per });
        });
        this.data1 = data1;
        this.data2 = data2;
      });
    },
    handleFilter() {
      this.listQuery.page = 1;
      this.fetchData();
    },
    reloadLines() {
      reloadLines().then((res) => {
        var list = JSON.parse(res.data);
        var lineList = [{ value: "", display_name: "全部" }];
        list.forEach((element, index, array) => {
          lineList.push({ value: element.line, display_name: element.line });
        });
        this.lineList = lineList;
      });
    },
    reloadAlarmList() {
      reloadAlarmList().then((res) => {
        var list = JSON.parse(res.data);
        var alarmList = [{ key: -1, display_name: "全部" }];
        list.forEach((element, index, array) => {
          alarmList.push({
            key: element.alarmType,
            display_name: alarmTypeOptions[element.alarmType],
          });
        });
        this.alarmList = alarmList;
      });
    },
    resize() {
      console.log("resize");
    },
  },
};
</script>

<style lang="scss" scoped>
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
.chart {
  height: 400px;
}
</style>
