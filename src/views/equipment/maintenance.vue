<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.nickName"
        placeholder="机台编号"
        style="width: 200px"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-select
        v-model="listQuery.levelId"
        placeholder="保养级别"
        clearable
        style="width: 120px"
        class="filter-item"
      >
        <el-option
          v-for="item in levelOptions"
          :key="item.id"
          :label="item.description"
          :value="item.id"
        />
      </el-select>

      <el-date-picker
        v-model="listQuery.startTime"
        type="datetime"
        placeholder="开始时间"
        style="width: 200px"
      />
      <el-date-picker
        v-model="listQuery.endTime"
        type="datetime"
        placeholder="结束时间"
        style="width: 200px"
      />
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
        >查询</el-button
      >
      <el-button
        class="filter-item"
        style="margin-left: 10px"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate"
        >保养记录登记</el-button
      >
      <!-- <el-button
        v-waves
        :loading="downloadLoading"
        class="filter-item"
        type="primary"
        icon="el-icon-upload2"
        @click="handleDownload"
        >保养日期默认值维护</el-button
      > -->
      <!-- <el-button
        v-waves
        :loading="downloadLoading"
        class="filter-item"
        type="primary"
        icon="el-icon-download"
        @click="handleDownload"
        >导出</el-button
      > -->
    </div>

    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="序号" width="95">
        <template slot-scope="scope">{{ scope.$index }}</template>
        <!-- <template slot-scope="scope">{{ scope.row.nickName }}</template> -->
      </el-table-column>
      <el-table-column align="center" label="机台编号" width="120">
        <template slot-scope="scope">{{ scope.row.ipAddress }}</template>
      </el-table-column>
      <el-table-column label="登记时间" align="center">
        <template slot-scope="scope">{{ scope.row.createDate }}</template>
      </el-table-column>
      <el-table-column label="日常保养间隔天数" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.interval }}</span>
        </template>
      </el-table-column>
      <el-table-column label="上一次保养日期" align="center">
        <template slot-scope="scope">{{ scope.row.lastDate }}</template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="created_at"
        label="下一次保养日期"
        width="200"
      >
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.netxtDate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="保养次数" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.frequency }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column
        class-name="small-padding fixed-width"
        label="操作"
        width="200"
        align="center"
      >
        <template slot-scope="{ row, $index }">
          <el-row>
            <el-button
              v-if="true"
              type="success"
              size="small"
              icon="el-icon-edit"
              @click="handleUpdate(row)"
            >
              编辑
            </el-button>
            <el-button
              v-if="true"
              type="danger"
              size="small"
              icon="el-icon-delete"
              @click="handleDelete(row.id, $index)"
            >
              删除
            </el-button>
          </el-row>
        </template>
      </el-table-column> -->
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="fetchData"
    />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="left"
        label-width="80px"
        style="width: 400px; margin-left: 50px"
      >
        <el-form-item label="机台编号" prop="ipAddress">
          <el-input v-model="temp.ipAddress" />
        </el-form-item>
        <el-form-item label="保养日期" prop="nextDate">
          <el-date-picker
            v-model="temp.nextDate"
            type="date"
            placeholder="Please pick a date"
          />
        </el-form-item>
        <el-form-item label="保养周期" prop="levelId">
          <el-select
            v-model="temp.levelId"
            class="filter-item"
            placeholder="保养周期"
          >
            <el-option
              v-for="item in levelOptions"
              :key="item.id"
              :label="item.description"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false"> 取消 </el-button>
        <el-button
          type="primary"
          @click="dialogStatus === 'create' ? createData() : updateData()"
        >
          确认
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  fetchList,
  maintenanceLevelList,
  createMaintenance,
} from "@/api/maintenance";
import waves from "@/directive/waves"; // waves directive
import { parseTime } from "@/utils";
import pagination from "@/components/Pagination";

const calendarTypeOptions = [
  { key: "CN", display_name: "China" },
  { key: "US", display_name: "USA" },
  { key: "JP", display_name: "Japan" },
  { key: "EU", display_name: "Eurozone" },
];

export default {
  components: { pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "gray",
        deleted: "danger",
      };
      return statusMap[status];
    },
  },
  data() {
    return {
      total: 20,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        startTime: "",
        endTime: "",
        ipAddress: undefined,
        levelId: undefined,
      },
      temp: {
        id: undefined,
        userName: "",
        nickName: "",
        roleId: undefined,
        pwd: "",
        confirmPwd: "",
        mobile: "",
        levelId: undefined,
        ipAddress: "",
        nextDate: new Date(),
      },
      textMap: {
        update: "编辑",
        create: "保养记录登记",
      },
      dialogStatus: "",
      dialogFormVisible: false,
      levelOptions: [{ id: 1, description: "周保", days: "7天" }],
      calendarTypeOptions,
      sortOptions: [
        { label: "ID Ascending", key: "+id" },
        { label: "ID Descending", key: "-id" },
      ],
      roleOptions: [],
      rules: {
        ipAddress: [
          { required: true, message: "设备编号不能为空", trigger: "blur" },
        ],
        nextDate: [
          {
            type: "date",
            required: true,
            message: "请选择保养日期",
            trigger: "change",
          },
        ],
        levelId: [
          { required: true, message: "请选择保养周期", trigger: "change" },
        ],
      },
      list: null,
      downloadLoading: false,
    };
  },
  created() {
    this.fetchData();
    this.getLevelList();
  },
  methods: {
    fetchData() {
      this.listLoading = true;
      fetchList(this.listQuery).then((response) => {
        var json = JSON.parse(response.data);
        this.list = json.items;
        var list = [];
        // json.items.forEach(function (element, index, array) {
        //   list.push({
        //     id: element.Id,
        //     frequency: element.Frequency,
        //     createDate: formatDate(element.CreateDate),
        //     nextDate: element.NextDate,
        //     lastDate: element.LastDate,
        //     tag: elementm.Tag,
        //     maintenanceLevelId: element.MaintenanceLevelId,
        //     description: element.Description,
        //     interval: element.IntervalDays,
        //   });
        // });
        this.total = json.total;
        this.listLoading = false;
      });
    },
    getLevelList() {
      this.roleOptions = [];
      maintenanceLevelList().then((response) => {
        var json = response.data;
        // console.log(json);
        var options = [];
        json.forEach(function (element, index, array) {
          // element: 指向当前元素的值
          // index: 指向当前索引
          // array: 指向Array对象本身
          options.push({
            id: element.Id,
            description:
              element.Description + " " + element.IntervalDays + "天",
          });
        });
        this.levelOptions = options;
      });
    },
    handleFilter() {
      this.listQuery.page = 1;
      this.fetchData();
    },
    handleCreate() {
      this.resetTemp();
      this.dialogStatus = "create";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        userName: "",
        nickName: "",
        roleId: undefined,
        pwd: "",
        confirmPwd: "",
        mobile: "",
      };
    },
    createData() {
      console.log(this.temp);
      this.$refs["dataForm"].validate((valid) => {
        if (valid) {
          createMaintenance(this.temp).then(() => {
            //this.list.unshift(this.temp);
            this.fetchData();
            this.dialogFormVisible = false;
            this.$notify({
              title: "Success",
              message: "新建用户成功",
              type: "success",
              duration: 2000,
            });
          });
        }
      });
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row); // copy obj
      this.dialogStatus = "update";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    updateData() {
      this.$refs["dataForm"].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp);
          updateUser(tempData).then(() => {
            const index = this.list.findIndex((v) => v.id === this.temp.UserId);
            this.list.splice(index, 1, this.temp);
            this.dialogFormVisible = false;
            this.$notify({
              title: "Success",
              message: "用户信息修改成功",
              type: "success",
              duration: 2000,
            });
          });
        }
      });
    },
    handleDelete(id, index) {
      deleteUser(id).then(() => {
        this.$notify({
          title: "Success",
          message: "删除成功",
          type: "success",
          duration: 2000,
        });
        this.list.splice(index, 1);
        this.total = this.list.length;
      });
    },
    handleDownload() {
      this.downloadLoading = true;
      import("@/vendor/Export2Excel").then((excel) => {
        const tHeader = [
          "id",
          "登录名",
          "用户名",
          "角色",
          "手机",
          "密码",
          "创建时间",
        ];
        const filterVal = [
          "id",
          "nickName",
          "userName",
          "description",
          "mobile",
          "pwd",
          "createDate",
        ];
        const data = this.formatJson(filterVal);
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: "用户信息",
        });
        this.downloadLoading = false;
      });
    },
    formatJson(filterVal) {
      return this.list.map((v) =>
        filterVal.map((j) => {
          if (j === "timestamp") {
            return parseTime(v[j]);
          } else {
            return v[j];
          }
        })
      );
    },
    confirmEdit(row) {},
    confirmDelete(row) {},
    formatDate(val) {
      return this.$moment(timeVal).format("YYYY-MM-DD");
    },
  },
};
</script>
