<template>
  <div class="bottomInfoList-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix text-wrapper_bottomInfoList"></div>
      <el-table
        :data="list"
        style="
          width: 100%;
          padding-top: 0;
          background-color: rgba(4, 38, 90, 0.3072);
          font-size: 16px;
          color: rgba(255, 255, 255, 1);
        "
        :cell-style="{
          background: '#04265a',
          borderColor: '#00a9ff',
          padding: '3px',
        }"
        :row-style="{ height: '15px' }"
        :header-cell-style="{
          background: '#04265a',
          color: '#ffffff',
          height: '15px',
        }"
      >
        <el-table-column label="生产序号" width="150" align="center">
          <template slot-scope="scope">
            {{ scope.row.productionNo }}
          </template>
        </el-table-column>
        <el-table-column label="料号" width="195" align="center">
          <template slot-scope="scope">
            {{ scope.row.materialNo }}
          </template>
        </el-table-column>
        <el-table-column label="生产批号" width="195" align="center">
          <template slot-scope="scope">
            {{ scope.row.batchNo }}
          </template>
        </el-table-column>
        <el-table-column label="开始时间" width="195" align="center">
          <template slot-scope="scope">
            <!-- {{ scope.row.biginTime | parseTime("{y}-{m}-{d} {h}:{i}") }} -->
            {{ scope.row.biginTime }}
          </template>
        </el-table-column>
        <el-table-column label="结束时间" width="195" align="center">
          <template slot-scope="scope">
            <!-- {{ scope.row.endTime | parseTime("{y}-{m}-{d} {h}:{i}") }} -->
            {{ scope.row.endTime }}
          </template>
        </el-table-column>
        <el-table-column label="达成" width="100" align="center">
          <template slot-scope="{ row }">
            {{ row.status | statusFilter }}
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { parseTime } from "@/utils";

export default {
  name: "bottomInfoList",
  filters: {
    statusFilter(status) {
      const statusMap = {
        success: "完成",
        pending: "未完成",
      };
      return statusMap[status];
    },
  },
  data() {
    return {
      list: null,
      Height: 300,
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.list = [
        {
          productionNo: 1,
          materialNo: "c-2113",
          batchNo: "主线车丝机1#完成车丝",
          biginTime: "2022-7-20 16:40:21",
          endTime: "2022-7-22 13:40:21",
          status: "success",
        },
        {
          productionNo: 2,
          materialNo: "c-2113",
          batchNo: "主线车丝机1#完成车丝",
          biginTime: "2022-7-20 16:40:21",
          endTime: "2022-7-22 13:40:21",
          status: "pending",
        },
        {
          productionNo: 3,
          materialNo: "c-2113",
          batchNo: "主线车丝机1#完成车丝",
          biginTime: "2022-7-20 16:40:21",
          endTime: "2022-7-22 13:40:21",
          status: "success",
        },
        {
          productionNo: 4,
          materialNo: "c-2113",
          batchNo: "主线车丝机1#完成车丝",
          biginTime: "2022-7-20 16:40:21",
          endTime: "2022-7-22 13:40:21",
          status: "pending",
        },
        {
          productionNo: 5,
          materialNo: "c-2113",
          batchNo: "主线车丝机1#完成车丝",
          biginTime: "2022-7-20 16:40:21",
          endTime: "2022-7-22 13:40:21",
          status: "success",
        },
        {
          productionNo: 6,
          materialNo: "c-2113",
          batchNo: "主线车丝机1#完成车丝",
          biginTime: "2022-7-20 16:40:21",
          endTime: "2022-7-22 13:40:21",
          status: "pending",
        },
      ];
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
      }
      return "";
    },
    formatJson(filterVal) {
      return this.list.map((v) =>
        filterVal.map((j) => {
          if (j === "biginTime" || j === "endTime") {
            return parseTime(v[j]);
          } else {
            return v[j];
          }
        })
      );
    },
  },
};
</script>

<style scoped lang="css" src="@/assets/dashboard/index.css" />
<style lang="scss" scoped>
.bottomInfoList-container {
  width: 100%;
  /* background-color: #95e1d3; */
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
</style>
