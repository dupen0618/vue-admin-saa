<template>
  <div class="app-container">
    <el-form
      ref="form"
      :model="form"
      label-width="120px"
      style="width: 400px; margin-left: 50px"
    >
      <el-form-item
        v-for="item in form.list"
        :key="item.id"
        :label="item.description"
      >
        <el-input v-model="item.days" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
      </el-form-item>
    </el-form>
    <!-- <el-form
      ref="form"
      :model="form"
      label-width="120px"
      style="width: 500px; margin-left: 50px"
    >
      <el-form-item
        v-for="item in form.list"
        :key="item.id"
        :label="item.description"
      >
        <el-input v-model="item.days" style="width: 280px" />
        <el-button
          type="primary"
          @click="UpdateData(item.id, item.days)"
          style="margin-left: 10px"
          >修改</el-button
        >
      </el-form-item>
    </el-form> -->
  </div>
</template>

<script>
import {
  maintenanceLevelList,
  updateMaintenanceLevelList,
  updateMaintenanceLevel,
} from "@/api/maintenance";

export default {
  data() {
    return {
      form: {
        list: [
          { id: 1, description: "周保（天）", days: 7 },
          { id: 2, description: "月保（天）", days: 30 },
          { id: 3, description: "季保（天）", days: 90 },
          { id: 4, description: "半年保（天）", days: 180 },
          { id: 5, description: "年保（天）", days: 365 },
        ],
      },
    };
  },
  created() {
    this.getLevelList();
  },
  methods: {
    onSubmit() {
      //this.$message("submit!");
      var list = this.form.list;
      console.log(list);
      updateMaintenanceLevelList(list).then(() => {
        this.$notify({
          title: "Success",
          message: "修改成功",
          type: "success",
          duration: 2000,
        });
      });
    },
    UpdateData(id, days) {
      //this.$message("submit!");
      var obj = { id: id, days: days };
      console.log(obj);
      updateMaintenanceLevel(obj).then(() => {
        this.$notify({
          title: "Success",
          message: "修改成功",
          type: "success",
          duration: 2000,
        });
      });
    },
    onCancel() {
      this.$message({
        message: "cancel!",
        type: "warning",
      });
    },
    getLevelList() {
      this.form.list = [];
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
            description: element.Description + " (天)",
            days: element.IntervalDays,
          });
        });
        this.form.list = options;
      });
    },
  },
};
</script>

<style scoped>
.line {
  text-align: center;
}
</style>
