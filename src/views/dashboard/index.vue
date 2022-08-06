<template>
  <div class="page flex-col">
    <div class="section_1 flex-col">
      <div class="box_1 flex-col">
        <div class="group_1 flex-row">
          <span class="text_1">2022-8-7</span>
          <span class="text_2">10:28:46</span>
          <span class="text_3">AIOT五号机</span>
          <img
            class="label_1"
            referrerpolicy="no-referrer"
            src="@/assets/dashboard/img/psb4hbo5wsqnn3x3leqcyhb7tvxrc3cji67440422f2-a997-4ef0-95d5-4c21bbd5c76e.png"
          />
        </div>
        <div class="section_20 flex-col">
          <div class="box_2 flex-row">
            <img
              class="label_2"
              referrerpolicy="no-referrer"
              src="@/assets/dashboard/img/ps1jtw64bujzwsoy23f6bgwpxaufyb80g5466861d-9912-4a66-b272-291e99ed4ddb.png"
            />
            <span class="text_4">保养时间&nbsp;&nbsp;2022-8-30</span>
            <span class="text_5">正常</span>
            <img
              class="label_3"
              referrerpolicy="no-referrer"
              src="@/assets/dashboard/img/psb9rvgdk18lb2eyidnvsjs667q0ylfmitr1385fdf8-964b-4f69-865f-f314cc946285.png"
            />
          </div>
          <div class="box_3 flex-row">
            <div class="box_4 flex-col"></div>
            <div class="box_5 flex-col">
              <div class="group_3 flex-col"></div>
            </div>
          </div>
          <device-status />
          <data-analysis-alarm />
          <info-list />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import deviceStatus from "./components/deviceStatus.vue";
import dataAnalysisAlarm from "./components/dataAnalysisAlarm.vue";
import infoList from "./components/infoList.vue";

export default {
  components: { deviceStatus, dataAnalysisAlarm, infoList },
  data() {
    return {
      constants: {},
    };
  },
  methods: {},
};
</script>
<style scoped lang="css" src="@/assets/dashboard/index.css" />
