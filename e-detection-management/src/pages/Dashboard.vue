<template>
  <div style="margin-top: 40px">
    <el-row :gutter="20">
      <el-col :span="11" style="margin-left: 50px;">

        <el-row :gutter="20" >
          <el-card shadow="hover" class="mgb20" style="height:226px;">
            <div class="user-info">
              <img src="../assets/img/img.jpg" class="user-avator" alt />
              <div class="user-info-cont">
                <div class="user-info-name">{{name}}</div>
                <div>{{role}}</div>
              </div>
            </div>
            <div class="user-info-list">
                <div>
                    上次登录时间：
              <span>2020-03-10</span>
                </div>
                <div>
                    上次登录地点：
              <span>福州</span>
                </div>
            </div>
          </el-card>
        </el-row>

        <el-row>
          <el-col :span="24" style="margin-top: -28px;">
            <el-row :gutter="20" class="mgb20">
              <el-col :span="12">
                <el-card shadow="hover" :body-style="{padding: '0px'}">
                  <div class="grid-content grid-con-1">
                    <i class="el-icon-lx-people grid-con-icon"></i>
                    <div class="grid-cont-right">
                      <div class="grid-num">1234</div>
                      <div>检测用户数</div>
                    </div>
                  </div>
                </el-card>
              </el-col>
              <el-col :span="12">
                <el-card shadow="hover" :body-style="{padding: '0px'}">
                  <div class="grid-content grid-con-3">
                    <i class="el-icon-lx-goods grid-con-icon"></i>
                    <div class="grid-cont-right">
                      <div class="grid-num">50</div>
                      <div>设备安装数量</div>
                    </div>
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-col>

      <el-col :span="12">
        <el-card shadow="hover">
          <schart ref="line" class="schart" canvasId="line" :options="options2"></schart>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Schart from "vue-schart";
import bus from "../components/common/bus";
export default {
  name: "dashboard",
  data() {
    return {
      name: localStorage.getItem("ms_username"),
      todoList: [
        {
          title: "今天要修复100个bug",
          status: false
        },
        {
          title: "今天要修复100个bug",
          status: false
        },
        {
          title: "今天要写100行代码加几个bug吧",
          status: false
        },
        {
          title: "今天要修复100个bug",
          status: false
        },
        {
          title: "今天要修复100个bug",
          status: true
        },
        {
          title: "今天要写100行代码加几个bug吧",
          status: true
        }
      ],
      data: [
        {
          name: "2018/09/04",
          value: 1083
        },
        {
          name: "2018/09/05",
          value: 941
        },
        {
          name: "2018/09/06",
          value: 1139
        },
        {
          name: "2018/09/07",
          value: 816
        },
        {
          name: "2018/09/08",
          value: 327
        },
        {
          name: "2018/09/09",
          value: 228
        },
        {
          name: "2018/09/10",
          value: 1065
        }
      ],
      options2: {
        type: "line",
        title: {
          text: "最近几个月检测记录走势"
        },
        labels: ["11月", "12月", "1月", "2月", "3月"],
        datasets: [
          {
            label: "设备覆盖面积",
            data: [100, 130, 200, 240, 250]
          },
          {
            label: "每日检测人数",
            data: [164, 178, 150, 165, 160]
          },
          {
            label: "体温超标人数",
            data: [5, 10, 80, 40, 6]
          }
        ]
      }
    };
  },
  components: {
    Schart
  },
  computed: {
    role() {
      return this.name === "admin" ? "超级管理员" : "普通用户";
    }
  },
  methods: {
    changeDate() {
      const now = new Date().getTime();
      this.data.forEach((item, index) => {
        const date = new Date(now - (6 - index) * 86400000);
        item.name = `${date.getFullYear()}/${date.getMonth() +
          1}/${date.getDate()}`;
      });
    }
  }
};
</script>


<style scoped>
.el-row {
  margin-bottom: 20px;
}

.grid-content {
  display: flex;
  align-items: center;
  height: 100px;
}

.grid-cont-right {
  flex: 1;
  text-align: center;
  font-size: 14px;
  color: #999;
}

.grid-num {
  font-size: 30px;
  font-weight: bold;
}

.grid-con-icon {
  font-size: 50px;
  width: 100px;
  height: 100px;
  text-align: center;
  line-height: 100px;
  color: #fff;
}

.grid-con-1 .grid-con-icon {
  background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
  color: rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
  background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
  color: rgb(45, 140, 240);
}

.grid-con-3 .grid-con-icon {
  background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
  color: rgb(242, 94, 67);
}

.user-info {
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 2px solid #ccc;
  margin-bottom: 20px;
}

.user-avator {
  width: 120px;
  height: 120px;
  border-radius: 50%;
}

.user-info-cont {
  padding-left: 50px;
  flex: 1;
  font-size: 14px;
  color: #999;
}

.user-info-cont div:first-child {
  font-size: 30px;
  color: #222;
}

.user-info-list {
  font-size: 14px;
  color: #999;
  line-height: 25px;
  display: flex;
  justify-content: space-around;
}

.user-info-list span {
  margin-left: 20px;
}

.mgb20 {
  margin-bottom: 20px;
}

.todo-item {
  font-size: 14px;
}

.todo-item-del {
  text-decoration: line-through;
  color: #999;
}

.schart {
  width: 100%;
  height: 300px;
}
</style>
