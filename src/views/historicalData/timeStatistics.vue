<template>
  <div class="components-container">
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
        <el-option v-for="(item,index) in lineList" :key="index" :label="item" :value="item" />
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
      >查询</el-button>
    </div>
    <split-pane split="horizontal" @resize="resize">
      <template slot="paneL">
        <div class="top-container">
          <el-table
            v-loading="listLoading"
            :data="list"
            element-loading-text="Loading"
            style="margin-top: 50px;"
            height="calc(100% - 10rem)"
            border
            fit
            highlight-current-row
          >
            <el-table-column align="center" label="序号" width="95">
              <template slot-scope="scope">{{ scope.$index + startIndex }}</template>
            </el-table-column>
            <el-table-column label="类别" align="center">
              <template slot-scope="scope">{{ alarmTypeOptions[scope.row.customLevel] }}</template>
            </el-table-column>
            <el-table-column label="统计数" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.cnt }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="created_at" label="开始时间" width="200">
              <template slot-scope="scope">
                <i class="el-icon-time" />
                <span>{{ scope.row.fromTime }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="created_at" label="结束时间" width="200">
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
import { parseTime } from "@/utils";
import splitPane from "vue-splitpane";
import waves from "@/directive/waves"; // waves directive
import {
  reloadLines,
  reloadAlarmList,
  timeStatisticsPageList,
  timeStatisticsList
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
//   { key: 6, display_name: "設備保養" }
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
        endTime: undefined
      },
      listLoading: true,
      list: [],
      lineList: [],
      alarmTypeOptions,
      alarmList: [],
      total: 0,
      startIndex: 0,
      data1: [
        {
          time: "对比项1",
          value: 320
        },
        {
          time: "对比项2",
          value: 332
        },
        {
          time: "对比项3",
          value: 301
        },
        {
          time: "对比项4",
          value: 334
        },
        {
          time: "对比项5",
          value: 390
        },
        {
          time: "对比项6",
          value: 401
        },
        {
          time: "对比项7",
          value: 350
        }
      ],
      data2: [
        {
          time: "对比项1",
          value: 220
        },
        {
          time: "对比项4",
          value: 182
        },
        {
          time: "对比项1",
          value: 191
        },
        {
          time: "对比项1",
          value: 234
        },
        {
          time: "对比项1",
          value: 290
        },
        {
          time: "对比项1",
          value: 201
        },
        {
          time: "对比项1",
          value: 203
        }
      ],
      data3: [
        {
          time: "对比项1",
          value: 150
        },
        {
          time: "对比项4",
          value: 232
        },
        {
          time: "对比项1",
          value: 201
        },
        {
          time: "对比项1",
          value: 154
        },
        {
          time: "对比项1",
          value: 190
        },
        {
          time: "对比项1",
          value: 150
        },
        {
          time: "对比项1",
          value: 180
        }
      ]
    };
  },
  computed: {
    option() {
      return {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        color: ["#c23531", "yellow", "blue"],
        legend: {
          data: ["严重", "警告", "一般"]
        },
        // toolbox: {
        //   show: true,
        //   orient: "vertical",
        //   left: "right",
        //   top: "center",
        //   feature: {
        //     mark: { show: true },
        //     dataView: { show: true, readOnly: false },
        //     magicType: { show: true, type: ["line", "bar", "stack"] },
        //     restore: { show: true },
        //     saveAsImage: { show: true }
        //   }
        // },
        xAxis: [
          {
            type: "category",
            axisTick: { show: false },
            data: this.data1.map(e => e.time)
          }
        ],
        yAxis: [
          {
            name: "(个)",
            type: "value"
          }
        ],
        series: [
          {
            name: "严重",
            type: "bar",
            barGap: 0,
            // label: labelOption,
            emphasis: {
              focus: "series"
            },
            data: this.data3.map(e => e.value)
          },
          {
            name: "警告",
            type: "bar",
            // label: labelOption,
            emphasis: {
              focus: "series"
            },
            data: this.data2.map(e => e.value)
          },
          {
            name: "一般",
            type: "bar",
            // label: labelOption,
            emphasis: {
              focus: "series"
            },
            data: this.data1.map(e => e.value)
          }
        ]
      };
    }
  },
  created() {
    this.reloadLines();
    this.reloadAlarmList();
    // var now = new Date("2022-01-08 14:00:00");
    var now = new Date();
    this.listQuery.endTime = parseTime(now);
    var yesterday = now.setDate(now.getDate() - 1);
    this.listQuery.startTime = parseTime(yesterday);

    this.fetchData();
    this.fetchChat();
  },
  methods: {
    fetchData() {
      this.listLoading = true;
      timeStatisticsPageList(this.listQuery).then(res => {
        var json = JSON.parse(res.data);
        this.total = json.total;
        this.list = json.items;
        this.startIndex = (this.listQuery.page - 1) * this.listQuery.limit + 1;
        this.listLoading = false;
      });
    },
    fetchChat() {
      this.data1 = [];
      this.data2 = [];
      this.data3 = [];
      timeStatisticsList(this.listQuery).then(res => {
        var json = JSON.parse(res.data);
        json.items.forEach((element, index, array) => {
          this.setOptionData(element);
        });
      });
    },
    setOptionData(el) {
      if (!this.data1.some(e => e.time === el.period)) {
        this.data1.push({ time: el.period, value: 0 });
      }
      if (!this.data2.some(e => e.time === el.period)) {
        this.data2.push({ time: el.period, value: 0 });
      }
      if (!this.data3.some(e => e.time === el.period)) {
        this.data3.push({ time: el.period, value: 0 });
      }
      if (el.customLevel === 1) {
        var index1 = this.data1.findIndex(e => e.time === el.period);
        this.data1[index1].value = el.cnt;
      }
      if (el.customLevel === 2) {
        var index2 = this.data2.findIndex(e => e.time === el.period);
        this.data2[index2].value = el.cnt;
      }
      if (el.customLevel === 3) {
        var index3 = this.data3.findIndex(e => e.time === el.period);
        this.data3[index3].value = el.cnt;
      }
    },
    handleFilter() {
      this.listQuery.page = 1;
      this.fetchData();
      this.fetchChat();
    },
    reloadLines() {
      reloadLines().then(res => {
        var list = JSON.parse(res.data);
        var lineList = [];
        list.forEach((element, index, array) => {
          lineList.push(element.line);
        });
        this.lineList = lineList;
      });
    },
    reloadAlarmList() {
      reloadAlarmList().then(res => {
        var list = JSON.parse(res.data);
        console.log(list);
        var alarmList = [{ key: -1, display_name: "全部" }];
        list.forEach((element, index, array) => {
          console.log(alarmTypeOptions[element.alarmType]);
          alarmList.push({
            key: element.alarmType,
            display_name: alarmTypeOptions[element.alarmType]
          });
        });
        this.alarmList = alarmList;
      });
    },
    resize() {
      console.log("resize");
    }
  }
};
</script>

<style lang="scss" scoped>
.components-container {
  position: relative;
  height: 100vh;
}

.left-container {
  background-color: #f38181;
  height: 100%;
}

.right-container {
  background-color: #fce38a;
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
