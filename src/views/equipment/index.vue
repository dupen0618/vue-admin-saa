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
        <template slot-scope="scope">{{ scope.$index }}</template>
      </el-table-column>
      <el-table-column label="IP" align="center">
        <template slot-scope="scope">{{ scope.row.ipAddress }}</template>
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
      <el-table-column label="保养级别" align="center">
        <template slot-scope="scope">{{ scope.row.description }}</template>
      </el-table-column>
      <el-table-column label="日常维护保养间隔天数" align="center">
        <template slot-scope="scope">{{ scope.row.days }}</template>
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
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="temp.userName" />
        </el-form-item>
        <el-form-item label="登录名">
          <el-input v-model="temp.nickName" />
        </el-form-item>
        <el-form-item label="角色" prop="roleId">
          <el-select
            v-model="temp.roleId"
            class="filter-item"
            placeholder="选择用户角色"
          >
            <el-option
              v-for="item in roleOptions"
              :key="item.roleId"
              :label="item.description"
              :value="item.roleId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input v-model="temp.mobile" />
        </el-form-item>
        <el-form-item label="密码" prop="pwd">
          <el-input v-model="temp.pwd" type="password" />
        </el-form-item>
        <el-form-item label="密码确认" prop="confirmPwd">
          <el-input v-model="temp.confirmPwd" type="password" />
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
import { fetchList } from "@/api/equipment";
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
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.temp.confirmPwd !== "") {
          this.$refs["dataForm"].validateField("confirmPwd");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.temp.pwd) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
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
        userName: "",
        nickName: "",
        roleId: undefined,
        pwd: "",
        confirmPwd: "",
        mobile: "",
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
        userName: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
        ],
        roleId: [
          { required: true, message: "请选择用户角色", trigger: "change" },
        ],
        pwd: [{ required: true, validator: validatePass, trigger: "blur" }],
        confirmPwd: [
          { required: true, validator: validatePass2, trigger: "blur" },
        ],
      },
      list: null,
      downloadLoading: false,
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
          createUser(this.temp).then(() => {
            this.list.unshift(this.temp);
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
  },
};
</script>
