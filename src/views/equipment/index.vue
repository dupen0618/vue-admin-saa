<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.ip"
        placeholder="IP"
        style="width: 200px"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />

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
      <el-button
        class="filter-item"
        style="margin-left: 10px"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate"
        >新增</el-button
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
        <template slot-scope="scope">{{ scope.$index + startIndex }}</template>
      </el-table-column>
      <el-table-column label="机台IP" align="center">
        <template slot-scope="scope">{{ scope.row.ipAddress }}</template>
      </el-table-column>
      <el-table-column label="机台PC的IP" align="center">
        <template slot-scope="scope">{{ scope.row.pcIpAddress }}</template>
      </el-table-column>
      <el-table-column label="机台名称" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.machineName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="位置信息" align="center">
        <template slot-scope="scope">{{ scope.row.line }}</template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="created_at"
        label="创建时间"
        width="200"
      >
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.createDate }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="保养级别" align="center">
        <template slot-scope="scope">{{ scope.row.description }}</template>
      </el-table-column>
      <el-table-column label="日常维护保养间隔天数" align="center">
        <template slot-scope="scope">{{ scope.row.days }}</template>
      </el-table-column> -->
      <el-table-column
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
              >编辑</el-button
            >
            <el-button
              v-if="true"
              type="danger"
              size="small"
              icon="el-icon-delete"
              @click="handleDelete(row.id, $index)"
              >删除</el-button
            >
          </el-row>
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

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="left"
        label-width="80px"
        style="width: 400px; margin-left: 50px"
      >
        <el-form-item label="机台IP地址" label-width="120px" prop="ipAddress">
          <el-input v-model="temp.ipAddress" />
        </el-form-item>
        <el-form-item label="PC的IP地址" label-width="120px" prop="pcIpAddress">
          <el-input v-model="temp.pcIpAddress" />
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
  getEquipment,
  getEquipmentConfig,
  createOrUpdateEquipmentConfig,
  findEquipmentConfig,
  deleteEquipmentConfig,
} from "@/api/equipment";
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
    const validateIpAddress = (rule, value, callback) => {
      if (value === "" || value === undefined) {
        callback(new Error("机台的IP不能为空"));
      } else {
        getEquipment({ ip: value }).then((res) => {
          var obj = res.data;
          if (obj == null) {
            callback(new Error("该机台的IP地址不存在"));
          }
          callback();
        });
      }
    };

    const validatePcIpAddress = (rule, value, callback) => {
      if (value === "" || value === undefined) {
        callback(new Error("机台的IP不能为空"));
      } else {
        getEquipmentConfig({ ip: value }).then((res) => {
          var obj = JSON.parse(res.data);
          if (obj != null) {
            callback(new Error("该机台对应PC的IP地址已经存在"));
          }
          callback();
        });
      }
    };

    return {
      total: 20,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        startTime: "",
        endTime: "",
        tag: undefined,
        ip: undefined,
      },
      temp: {
        id: undefined,
        ipAddress: "",
        pcIpAddress: "",
      },
      textMap: {
        update: "编辑",
        create: "创建",
      },
      dialogStatus: "",
      dialogFormVisible: false,
      importanceOptions: [1, 2, 3],
      calendarTypeOptions,
      sortOptions: [
        { label: "ID Ascending", key: "+id" },
        { label: "ID Descending", key: "-id" },
      ],
      roleOptions: [],
      rules: {
        ipAddress: [
          { required: true, validator: validateIpAddress, trigger: "blur" },
        ],
        pcIpAddress: [
          { required: true, validator: validatePcIpAddress, trigger: "blur" },
        ],
      },
      list: null,
      downloadLoading: false,
      startIndex: 0,
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.listLoading = true;
      fetchList(this.listQuery).then((response) => {
        var json = JSON.parse(response.data);
        this.list = json.items;
        this.total = json.total;
        this.startIndex = (this.listQuery.page - 1) * this.listQuery.limit + 1;
        this.listLoading = false;
      });
    },
    getRoleList() {
      this.roleOptions = [];
      roleList().then((response) => {
        var json = response.data;
        // console.log(json);
        var options = [];
        json.forEach(function (element, index, array) {
          // element: 指向当前元素的值
          // index: 指向当前索引
          // array: 指向Array对象本身
          options.push({
            roleId: element.RoleId,
            roleType: element.RoleType,
            description: element.Description,
          });
        });
        this.roleOptions = options;
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
          createOrUpdateEquipmentConfig(this.temp).then(() => {
            // this.list.unshift(this.temp);
            this.fetchData();
            this.dialogFormVisible = false;
            this.$notify({
              title: "Success",
              message: "新建PC与机台的IP对应关系成功",
              type: "success",
              duration: 2000,
            });
          });
        }
      });
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row); // copy obj
      findEquipmentConfig({ id: this.temp.id }).then((res) => {
        var obj = res.data;
        if (obj != null) {
          this.dialogStatus = "update";
          this.dialogFormVisible = true;
          this.$nextTick(() => {
            this.$refs["dataForm"].clearValidate();
          });
        } else {
          this.$msgbox("该机台PC与机台的IP对应关系不存在，请先新增");
        }
      });
    },
    updateData() {
      this.$refs["dataForm"].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp);
          createOrUpdateEquipmentConfig(tempData).then(() => {
            // const index = this.list.findIndex((v) => v.id === this.temp.id);
            this.fetchData();
            this.dialogFormVisible = false;
            this.$notify({
              title: "Success",
              message: "机台PC信息修改成功",
              type: "success",
              duration: 2000,
            });
          });
        }
      });
    },
    handleDelete(id, index) {
      findEquipmentConfig({ id: id }).then((res) => {
        var obj = res.data;
        if (obj != null) {
          deleteEquipmentConfig({ id: id }).then(() => {
            this.fetchData();
            this.$notify({
              title: "Success",
              message: "删除成功",
              type: "success",
              duration: 2000,
            });
            // this.list.splice(index, 1);
            // this.total = this.list.length;
          });
        } else {
          this.$msgbox("该机台PC与机台的IP对应关系不存在，请先新增");
        }
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
  },
};
</script>
