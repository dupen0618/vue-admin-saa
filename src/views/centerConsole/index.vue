<template>
  <div class="home">
    <el-container>
      <el-drawer title="我是标题" :visible.sync="drawer" :with-header="false">
        <span>
          <el-form ref="form" label-width="80px">
            <div>
              <el-input></el-input>
              <el-input></el-input>
              <el-input></el-input>
              <el-input></el-input>
              <el-input></el-input>
              <el-input></el-input>
              <el-input></el-input>
              <el-input></el-input>
            </div>
            <div class="yincang2">
              <el-input></el-input>
              <el-input></el-input>
              <el-input></el-input>
              <el-input></el-input>
            </div>
          </el-form>
        </span>
      </el-drawer>

      <el-header>
        <el-menu
          class="el-menu-demo"
          mode="horizontal"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <!-- 搜索表单 -->
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-button
              class="zouce"
              @click="drawer = true"
              type="primary"
              style="margin-left: 16px"
            >
              <i class="el-icon-back"></i>
            </el-button>

            <el-form-item>
              <el-input v-model="formInline.names"></el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="equipmentdata">查询</el-button>
            </el-form-item>
          </el-form>

          <el-tabs class="wsxs">
            <el-tab-pane label="A区">
              <div class="dahezi">
                <el-row class="beiai">
                  <!-- <div class="he-item1" v-for="items in items">
                    <div class="he-item1-1">Box投板机</div>
                    <div class="he-item1-2" :data="items">
                      <el-table-column class="he-item-2-1" prop="date">制程 {{ items.process }}</el-table-column>
                      <el-table-column class="he-item-2-1" prop="date">綠體 {{ items.line }}</el-table-column>
                      <el-table-column class="he-item-2-1" prop="date">状况 {{ items.station }}</el-table-column>
                    </div>
                  </div>   -->
                  <el-col :span="2" v-for="items in items" :offset="1">
                    <el-card
                      class="box-card"
                      shadow="hover"
                      :body-style="{ padding: '0px' }"
                    >
                      <div slot="header" class="clearfix">
                        <span>Box投板机</span>
                        <!-- <el-button style="float: right; padding: 3px 0" type="text">看板</el-button> -->
                      </div>
                      <!-- <div v-for="o in 3" :key="o" class="text item">
                      {{'列表内容 ' + o }}
                    </div> -->
                      <div class="text item">制程： {{ items.process }}</div>
                      <div class="text item">綠體： {{ items.line }}</div>
                      <div class="text item">状况： {{ items.station }}</div>
                    </el-card>
                  </el-col>
                </el-row>
              </div>
            </el-tab-pane>
            <el-tab-pane label="B区" name="second">
              <div class="dahezi">
                <el-row class="beiai">
                  <div class="he-item1">
                    <div class="he-item1-1">测试测试测试测试</div>
                    <div class="he-item1-2">
                      <div class="he-item-2-1">测试</div>
                      <div class="he-item-2-1">测试</div>
                      <div class="he-item-2-1">测试</div>
                    </div>
                  </div>
                </el-row>
              </div>
            </el-tab-pane>
            <el-tab-pane label="C区" name="third">
              <div class="dahezi">
                <el-row class="beiai">
                  <div class="he-item1">
                    <div class="he-item1-1">测试2测试2测试2</div>
                    <div class="he-item1-2">
                      <div class="he-item-2-1">测试2</div>
                      <div class="he-item-2-1">测试2</div>
                      <div class="he-item-2-1">测试2</div>
                    </div>
                  </div>
                </el-row>
              </div>
            </el-tab-pane>
            <el-tab-pane label="D区" name="fourth">
              <div class="dahezi">
                <el-row class="beiai">
                  <div class="he-item1">
                    <div class="he-item1-1">测试3测试3测试3</div>
                    <div class="he-item1-2">
                      <div class="he-item-2-1">测试3</div>
                      <div class="he-item-2-1">测试3</div>
                      <div class="he-item-2-1">测试3</div>
                    </div>
                  </div>
                </el-row>
              </div>
            </el-tab-pane>
          </el-tabs>

          <!-- <pagination v-show="total > 0" :total="total" :page.sync="listQuery.pageindex"
            :limit.sync="listQuery.pagesize" @pagination="equipmentdata" /> -->

          <el-pagination
            :page-sizes="[2, 4, 6, 8]"
            :page-size="listQuery.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            :page.sync="listQuery.pageindex"
            :limit.sync="listQuery.pagesize"
            @pagination="equipmentdata"
          >
          </el-pagination>
          <el-footer>
            <el-tag type="primary">机台总数</el-tag>
            <el-tag type="success">正常数量</el-tag>
            <el-tag type="danger">异常停机</el-tag>
            <el-tag type="primary">其他状态</el-tag>
            <el-tag type="info">停机时间</el-tag>
          </el-footer>
        </el-menu>
      </el-header>
    </el-container>
  </div>
</template>

<script>
import { equipment } from "@/api/equipmentH";
import pagination from "@/components/Pagination";

export default {
  components: { pagination },
  data() {
    return {
      listQuery: {
        pageSize: 32,
        pageIndex: 1,
      },
      total: 0,
      formInline: {
        names: "",
      },
      items: [
        {
          process: this.process,
          line: this.line,
          station: this.station,
        },
      ],
      drawer: false,
    };
  },
  mounted() {
    this.equipmentdata();
  },
  methods: {
    equipmentdata() {
      this.items = [];
      var obj = {
        names: this.formInline.names,
        pageindex: this.listQuery.pageindex,
        pageSize: this.listQuery.pageSize,
      };
      equipment(obj).then((res) => {
        console.log(res.data);
        var list = JSON.parse(res.data).items;

        // this.items=this.formInline.name

        // list.items.forEach(element => {
        //   list.push({
        //     process: element.Process,
        //     line: element.Line,
        //     station: element.Station,
        //   });
        // });

        console.log(list);
        this.items = list;
      });
    },
  },
};
</script>

<style>
.text {
  font-size: 15px;
  text-align: center;
}

.item {
  padding: 0 0;
  margin: 0 0;
  height: 40px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}

.box-card {
  width: 200px;
}

.el-card__header {
  background-color: yellowgreen;
  padding: 0px;
}

.cscscs {
  background-color: aqua;
  float: left;
}

.chart {
  height: 100vh;
}

.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

.he-item1 {
  background-color: rgb(0, 0, 0);
  border: 1px solid rgb(199, 199, 199);
  width: 200px;
  height: 150px;
  float: left;
}

.he-item1-1 {
  background-color: rgb(199, 199, 199);
  border: 1px solid rgb(255, 255, 255);
  width: 200px;
  height: 40px;
}

.zouce {
  float: right;
}

.zouzou {
  float: inline-end;
}

.he-item1-2 {
  color: rgb(255, 255, 255);
}

.el-menu-demo {
  float: unset;
}

.he-item-2-1 {
  margin: 0;
  float: left;
  width: 150px;
  height: 30px;
}

.home {
  width: 1700px;
  height: 1000px;
}

/*.dadada {
  width: 1700px;
  height: 10000px;
}*/

.beiai {
  width: 1600px;
  height: 100px;
}

.wsxs {
  width: 1000px;
  height: 700px;
}

.el-tabs__nav-scroll {
  width: 1650px;
  text-align: center;
  float: left;
}

.el-tabs__nav-wrap is-top {
  text-align: center;
}

.yincang {
  background-color: aqua;
}

.yincang2 {
  border: 3px solid rgb(255, 255, 255);
}

.el-input__inner {
  background-color: rgb(132, 132, 132);
}

.el-drawer__body {
  background-color: aqua;
}

.el-tabs__item {
  color: rgb(255, 255, 255);
}

.el-tabs__content {
  height: 150px;
}

.el-tabs__content {
  width: 1700px;
  height: 600px;
}

.el-tabs__nav-wrap {
  width: 1600px;
}

.el-tabs__header {
  width: 1600px;
}
</style>
