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
      <el-table-column label="报警名称" align="center">
        <template slot-scope="scope">{{ scope.row.description }}</template>
      </el-table-column>
      <el-table-column label="类别" align="center">
        <template slot-scope="scope">{{ scope.row.level }}</template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="created_at"
        label="开始时间"
        width="200"
      >
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.beginTime }}</span>
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
          <span>{{ scope.row.endTime }}</span>
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

<script>
import { fetchData, reloadLines } from "@/api/historicalData";
import { parseTime } from "@/utils";
import pagination from "@/components/Pagination";
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
  components: { pagination },
  directives: { waves },
  data() {
    return {
      total: 20,
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
      list: [],
      alarmTypeOptions,
      listLoading: false,
      lineList: [],
    };
  },
  created() {
    this.fetchData();
    this.reloadLines();
  },
  methods: {
    fetchData() {
      console.log(this.listQuery);
      fetchData(this.listQuery).then((response) => {
        var json = JSON.parse(response.data);
        this.total = json.total;
        this.list = json.items;
      });
    },
    handleFilter() {
      this.listQuery.page = 1;
      this.fetchData();
    },
    reloadLines() {
      reloadLines().then((res) => {
        var list = JSON.parse(res.data);
        var lineList = [];
        list.forEach((element, index, array) => {
          lineList.push(element.line);
        });
        this.lineList = lineList;
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
