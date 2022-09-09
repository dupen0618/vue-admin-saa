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
        type="datetime"
        placeholder="开始时间"
        style="width: 200px; margin-left: 5px"
      />
      <el-date-picker
        v-model="listQuery.endTime"
        type="datetime"
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
          <el-table-column label="报警种类" align="center">
            <template slot-scope="scope">{{
              alarmTypeOptions[scope.row.customLevel]
            }}</template>
          </el-table-column>
          <el-table-column label="统计数" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.cnt }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="created_at"
            label="开始时间"
            width="200"
          >
            <template slot-scope="scope">
              <i class="el-icon-time" />
              <span>{{ scope.row.fromTime }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="created_at"
            label="结束时间"
            width="200"
          >
            <template slot-scope="scope">
              <i class="el-icon-time" />
              <span>{{ scope.row.toTime }}</span>
            </template>
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
import { parseTime } from "@/utils";
import splitPane from "vue-splitpane";
import waves from "@/directive/waves"; // waves directive
import {
  alarmFrequencyList,
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
      alarmTypeOptions,
      lineList: [],
      alarmList: [],
      startIndex: 0,
      total: 0,
      data: [0, 150, 200, 100],
    };
  },
  computed: {
    option() {
      return {
        color: ["#c23531", "#f8fa2e", "#412efa"],
        legend: {
          data: ["严重", "警告", "一般"],
        },
        xAxis: {
          type: "category",
          data: ["严重", "警告", "一般"],
        },
        yAxis: {
          name: "(个)",
          type: "value",
        },
        series: [
          {
            type: "bar",
            data: [
              {
                value: this.data[3],
                itemStyle: {
                  color: "#c23531",
                },
              },
              {
                value: this.data[2],
                itemStyle: {
                  color: "#f8fa2e",
                },
              },
              {
                value: this.data[1],
                itemStyle: {
                  color: "#412efa",
                },
              },
            ],
          },
        ],
      };
    },
  },
  created() {
    this.reloadLines();
    this.reloadAlarmList();
    // var now = new Date("2022-01-08 14:00:00");
    var now = new Date();
    this.listQuery.endTime = parseTime(now);
    var yesterday = now.setDate(now.getDate() - 1);
    this.listQuery.startTime = parseTime(yesterday);

    this.reloadLines();
    this.reloadAlarmList();
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.listLoading = true;
      alarmFrequencyList(this.listQuery).then((res) => {
        var json = JSON.parse(res.data);
        this.total = json.total;
        this.list = json.items;
        var data = [0, 0, 0, 0];
        json.items.forEach((element, index, array) => {
          data[element.customLevel] = element.cnt;
        });
        this.data = data;
        this.listLoading = false;
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
.chart {
  height: 400px;
}
</style>
