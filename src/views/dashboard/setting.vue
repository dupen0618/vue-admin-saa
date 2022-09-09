<template>
  <div
    style="width: 600px; border: 1px solid black; margin: 10px auto auto auto"
  >
    <el-row :gutter="20">
      <el-col>
        <h1 style="margin-left: 60px">状态栏仪表信息设置</h1>
      </el-col>
    </el-row>
    <el-row style="border: 1px solid black; margin: -20px 30px 10px 30px">
      <el-col>
        <el-form
          ref="dataForm"
          :rules="rules"
          :model="form"
          label-width="150px"
        >
          <el-form-item label="Suction Cup Gas">
            <el-col :span="10">
              <el-form-item prop="suctionCupGas.min">
                <el-input
                  v-model="form.suctionCupGas.min"
                  placeholder="量程下"
                />
              </el-form-item>
            </el-col>
            <el-col :span="1" style="text-align: center">
              <span class="text-gray-500">-</span>
            </el-col>
            <el-col :span="10">
              <el-form-item prop="suctionCupGas.max">
                <el-input
                  v-model="form.suctionCupGas.max"
                  placeholder="量程上"
                />
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="Cylinder Gas">
            <el-col :span="10">
              <el-form-item prop="cylinderGas.min">
                <el-input v-model="form.cylinderGas.min" placeholder="量程下" />
              </el-form-item>
            </el-col>
            <el-col :span="1" style="text-align: center">
              <span class="text-gray-500">-</span>
            </el-col>
            <el-col :span="10">
              <el-form-item prop="cylinderGas.max">
                <el-input v-model="form.cylinderGas.max" placeholder="量程上" />
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="Suction Nozzle Life">
            <el-col :span="10">
              <el-form-item prop="suctionNozzleLife.min">
                <el-input
                  v-model="form.suctionNozzleLife.min"
                  placeholder="量程下"
                />
              </el-form-item>
            </el-col>
            <el-col :span="1" style="text-align: center">
              <span class="text-gray-500">-</span>
            </el-col>
            <el-col :span="10">
              <el-form-item prop="suctionNozzleLife.max">
                <el-input
                  v-model="form.suctionNozzleLife.max"
                  placeholder="量程上"
                />
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="Power Consumption">
            <el-col :span="10">
              <el-form-item prop="powerConsumption.min">
                <el-input
                  v-model="form.powerConsumption.min"
                  placeholder="量程下"
                />
              </el-form-item>
            </el-col>
            <el-col :span="1" style="text-align: center">
              <span class="text-gray-500">-</span>
            </el-col>
            <el-col :span="10">
              <el-form-item prop="powerConsumption.max">
                <el-input
                  v-model="form.powerConsumption.max"
                  placeholder="量程上"
                />
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item> </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <!-- <el-row :gutter="20">
      <el-col>
        <h1 style="margin-left: 60px">每日计划数设定</h1>
      </el-col>
    </el-row>
    <el-row style="border: 1px solid black; margin: -20px 30px 10px 30px">
      <el-col>
        <el-form
          ref="dataForm"
          :rules="rules"
          :model="form"
          label-width="120px"
        >
          <el-form-item label="日期区间">
            <el-col :span="10">
              <el-form-item prop="beginDate">
                <el-date-picker
                  v-model="form.beginDate"
                  type="date"
                  placeholder="开始日期"
                  style="width: 100%"
                />
              </el-form-item>
            </el-col>
            <el-col :span="2" style="text-align: center">
              <span class="text-gray-500">-</span>
            </el-col>
            <el-col :span="10">
              <el-form-item prop="endDate">
                <el-date-picker
                  v-model="form.endDate"
                  type="date"
                  placeholder="结束日期"
                  style="width: 100%"
                />
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="星期一">
            <el-col :span="10">
              <el-input
                v-model="form.production.mon"
                placeholder="每日计划数"
              />
            </el-col>
          </el-form-item>
          <el-form-item label="星期二">
            <el-col :span="10">
              <el-input
                v-model="form.production.tues"
                placeholder="每日计划数"
              />
            </el-col>
          </el-form-item>
          <el-form-item label="星期三">
            <el-col :span="10">
              <el-input
                v-model="form.production.wednes"
                placeholder="每日计划数"
              />
            </el-col>
          </el-form-item>
          <el-form-item label="星期四">
            <el-col :span="10">
              <el-input
                v-model="form.production.thurs"
                placeholder="每日计划数"
              />
            </el-col>
          </el-form-item>
          <el-form-item label="星期五">
            <el-col :span="10">
              <el-input
                v-model="form.production.fri"
                placeholder="每日计划数"
              />
            </el-col>
          </el-form-item>
          <el-form-item label="星期六">
            <el-col :span="10">
              <el-input
                v-model="form.production.satur"
                placeholder="每日计划数"
              />
            </el-col>
          </el-form-item>
          <el-form-item label="星期日">
            <el-col :span="10">
              <el-input
                v-model="form.production.sun"
                placeholder="每日计划数"
              />
            </el-col>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>-->
    <el-row :gutter="20">
      <el-col>
        <el-button style="margin: 10px; float: right" @click="goBack"
          >取消</el-button
        >
        <el-button
          type="primary"
          @click="onSubmit"
          style="margin: 10px; float: right"
          >提交</el-button
        >
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { UpdateOrCreate, reloadProductionConfig } from "@/api/dashboard";
import { parseTime } from "@/utils";

export default {
  data() {
    var validatesuctionCupGasMin = (rule, value, callback) => {
      console.log("validatesuctionCupGasMin" + value);
      if (value === "" || value === undefined) {
        callback(new Error("请输数值"));
      } else {
        if (this.form.suctionCupGas.max !== "") {
          this.$refs["dataForm"].validateField("suctionCupGasMax");
        }
        callback();
      }
    };
    var validatesuctionCupGasMax = (rule, value, callback) => {
      if (value === "" || value === undefined) {
        callback(new Error("请输数值"));
      } else if (value <= this.form.suctionCupGas.min) {
        callback(new Error("上限值不能小于下限值"));
      } else {
        callback();
      }
    };

    var validatecylinderGasMin = (rule, value, callback) => {
      if (value === "" || value === undefined) {
        callback(new Error("请输数值"));
      } else {
        if (this.form.suctionCupGas.max !== "") {
          this.$refs["dataForm"].validateField("cylinderGasMax");
        }
        callback();
      }
    };
    var validatecylinderGasMax = (rule, value, callback) => {
      if (value === "" || value === undefined) {
        callback(new Error("请输数值"));
      } else if (value <= this.form.cylinderGas.min) {
        callback(new Error("上限值不能小于下限值"));
      } else {
        callback();
      }
    };

    var validatesuctionNozzleLifeMin = (rule, value, callback) => {
      if (value === "" || value === undefined) {
        callback(new Error("请输数值"));
      } else {
        if (this.form.suctionNozzleLife.max !== "") {
          this.$refs["dataForm"].validateField("suctionNozzleLifeMax");
        }
        callback();
      }
    };
    var validatesuctionNozzleLifeMax = (rule, value, callback) => {
      if (value === "" || value === undefined) {
        callback(new Error("请输数值"));
      } else if (value <= this.form.suctionNozzleLife.min) {
        callback(new Error("上限值不能小于下限值"));
      } else {
        callback();
      }
    };

    var validatepowerConsumptionMin = (rule, value, callback) => {
      if (value === "" || value === undefined) {
        callback(new Error("请输数值"));
      } else {
        if (this.form.powerConsumption.max !== "") {
          this.$refs["dataForm"].validateField("powerConsumptionMax");
        }
        callback();
      }
    };
    var validatepowerConsumptionMax = (rule, value, callback) => {
      if (value === "" || value === undefined) {
        callback(new Error("请输数值"));
      } else if (value <= this.form.powerConsumption.min) {
        callback(new Error("上限值不能小于下限值"));
      } else {
        callback();
      }
    };

    return {
      equipmentIp: undefined,
      form: {
        name: "",
        suctionCupGas: {
          min: undefined,
          max: undefined,
        },
        //状态栏仪表信息
        cylinderGas: {
          min: undefined,
          max: undefined,
        },

        suctionNozzleLife: {
          min: undefined,
          max: undefined,
        },
        powerConsumption: {
          min: undefined,
          max: undefined,
        },
        beginDate: "",
        endDate: "",
      },
      rules: {
        suctionCupGas: {
          max: [
            {
              required: true,
              validator: validatesuctionCupGasMax,
              trigger: "blur",
            },
          ],
          min: [
            {
              required: true,
              validator: validatesuctionCupGasMin,
              trigger: "blur",
            },
          ],
        },
        cylinderGas: {
          min: [
            {
              required: true,
              validator: validatecylinderGasMin,
              trigger: "blur",
            },
          ],
          max: [
            {
              required: true,
              validator: validatecylinderGasMax,
              trigger: "blur",
            },
          ],
        },
        suctionNozzleLife: {
          min: [
            {
              required: true,
              validator: validatesuctionNozzleLifeMin,
              trigger: "blur",
            },
          ],
          max: [
            {
              required: true,
              validator: validatesuctionNozzleLifeMax,
              trigger: "blur",
            },
          ],
        },
        powerConsumption: {
          min: [
            {
              required: true,
              validator: validatepowerConsumptionMin,
              trigger: "blur",
            },
          ],
          max: [
            {
              required: true,
              validator: validatepowerConsumptionMax,
              trigger: "blur",
            },
          ],
        },
      },
    };
  },
  mounted() {
    this.equipmentIp = this.$route.params.equipmentIp;
    this.fetchData();
  },
  methods: {
    fetchData() {
      reloadProductionConfig({ equipmentIp: this.equipmentIp }).then(
        (response) => {
          var json = JSON.parse(response.data);
          console.log(json);
          this.setForm(json);
        }
      );
    },
    onSubmit() {
      console.log("submit!");
      this.$refs["dataForm"].validate((valid) => {
        if (valid) {
          var obj = this.setObj();
          UpdateOrCreate(obj).then((res) => {
            console.log(res);
            this.$notify({
              title: "Success",
              message: "修改成功",
              type: "success",
              duration: 2000,
            });
          });
        }
      });
    },
    setObj() {
      var obj = {
        ipAddr: this.equipmentIp,
        suctionCupGasMin: this.form.suctionCupGas.min,
        suctionCupGasMax: this.form.suctionCupGas.max,
        cylinderGasMin: this.form.cylinderGas.min,
        cylinderGasMax: this.form.cylinderGas.max,
        suctionNozzleLifeMin: this.form.suctionNozzleLife.min,
        suctionNozzleLifeMax: this.form.suctionNozzleLife.max,
        powerConsumptionMin: this.form.powerConsumption.min,
        powerConsumptionMax: this.form.powerConsumption.max,
      };
      return obj;
    },
    setForm(obj) {
      this.equipmentIp = obj.ipAddr;
      this.form.suctionCupGas.min = obj.suctionCupGasMin;
      this.form.suctionCupGas.max = obj.suctionCupGasMax;
      this.form.cylinderGas.min = obj.cylinderGasMin;
      this.form.cylinderGas.max = obj.cylinderGasMax;
      this.form.suctionNozzleLife.min = obj.suctionNozzleLifeMin;
      this.form.suctionNozzleLife.max = obj.suctionNozzleLifeMax;
      this.form.powerConsumption.min = obj.powerConsumptionMin;
      this.form.powerConsumption.max = obj.powerConsumptionMax;
    },
    goBack() {
      this.$router.push({
        name: "Dashboard",
        params: { equipmentIp: this.equipmentIp },
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
