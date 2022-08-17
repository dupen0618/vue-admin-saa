<template>
  <div class="box_48 flex-col" ref="tableCot">
    <img
      class="image_9"
      referrerpolicy="no-referrer"
      src="@/assets/dashboard/img/pszhxbjjby01iugdnjmwj4dlagzklzr1ymv7760dbe4-9071-4494-a6ca-c0dd45d59e5b.png"
    />
    <!-- <div class="text-wrapper_70 flex-row">
      <span class="text_116">生产序号</span>
      <span class="text_117">料号</span>
      <span class="text_118">生产批号</span>
      <span class="text_119">开始时间</span>
      <span class="text_120">完成时间</span>
      <span class="text_121">达成</span>
    </div>
    <div class="text-wrapper_39 flex-row">
      <span class="text_122">1</span>
      <span class="text_123">c-2113</span>
      <span class="text_124">主线车丝机1#完成车丝</span>
      <span class="text_125">2022-7-20&nbsp;16:40:21</span>
      <span class="text_126">2022-7-22&nbsp;13:40:21</span>
      <span class="text_127">完成</span>
    </div>
    <div class="text-wrapper_71 flex-row">
      <span class="text_128">2</span>
      <span class="text_129">c-2113</span>
      <span class="text_130">主线车丝机1#完成车丝</span>
      <span class="text_131">2022-7-20&nbsp;16:40:21</span>
      <span class="text_132">2022-7-22&nbsp;13:40:21</span>
      <span class="text_133">未完成</span>
    </div>
    <div class="text-wrapper_41 flex-row">
      <span class="text_134">3</span>
      <span class="text_135">c-2113</span>
      <span class="text_136">主线车丝机1#完成车丝</span>
      <span class="text_137">2022-7-20&nbsp;16:40:21</span>
      <span class="text_138">2022-7-22&nbsp;13:40:21</span>
      <span class="text_139">完成</span>
    </div>
    <div class="text-wrapper_72 flex-row">
      <span class="text_140">4</span>
      <span class="text_141">c-2113</span>
      <span class="text_142">主线车丝机1#完成车丝</span>
      <span class="text_143">2022-7-20&nbsp;16:40:21</span>
      <span class="text_144">2022-7-22&nbsp;13:40:21</span>
      <span class="text_145">完成</span>
    </div>
    <div class="text-wrapper_43 flex-row">
      <span class="text_146">5</span>
      <span class="text_147">c-2113</span>
      <span class="text_148">主线车丝机1#完成车丝</span>
      <span class="text_149">2022-7-20&nbsp;16:40:21</span>
      <span class="text_150">2022-7-22&nbsp;13:40:21</span>
      <span class="text_151">未完成</span>
    </div>
    <div class="text-wrapper_73 flex-row">
      <span class="text_152">6</span>
      <span class="text_153">c-2113</span>
      <span class="text_154">主线车丝机1#完成车丝</span>
      <span class="text_155">2022-7-20&nbsp;16:40:21</span>
      <span class="text_156">2022-7-22&nbsp;13:40:21</span>
      <span class="text_157">完成</span>
    </div> -->
    <el-table
      :data="list"
      style="
        width: 100%;
        padding-top: 15px;
        background-color: rgba(4, 38, 90, 0.3072);
        font-size: 16px;
        color: rgba(255, 255, 255, 1);
      "
      :cell-style="{
        background: '#04265a',
        borderColor: '#00a9ff',
        padding: '3px',
      }"
      :row-style="{ height: '20px' }"
      :header-cell-style="{ background: '#04265a', color: '#ffffff' }"
    >
      <el-table-column label="生产序号" width="195" align="center">
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
  </div>
</template>

<script>
import { parseTime } from "@/utils";

export default {
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
  mounted() {},
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
<style scoped>
.el-table .warning-row {
  height: "20px";
  background: "#04265a";
  bordercolor: "#00a9ff";
  padding: "3px";
}

.el-table .success-row {
  height: "20px";
  background: #f0f9eb;
  bordercolor: "#00a9ff";
  padding: "3px";
}
</style>
