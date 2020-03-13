<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card shadow="hover">
            <img src="../assets/img/video1.jpg" style="width: 495px; height:300px;" />
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="hover">
            <img src="../assets/img/video1.jpg" style="width: 495px; height:300px;"/>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="hover">
            <img src="../assets/img/video1.jpg" style="width: 495px; height:300px;"/>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="6">
        <el-card shadow="hover" class="mgb20" style="height:252px;">
          <div class="user-info">
            <img src="../assets/img/video1.jpg" style="width: 220px; height:130px;" />
            <div class="user-info-cont">
              <div class="user-info-name">实况监控</div>
            </div>
          </div>
          <div class="user-info-list">
            当前时间：
            <span>2020-03-10 11:24:30</span>
          </div>
          <div class="user-info-list">
            当前地点：
            <span>广东省东莞市长安镇</span>
          </div>
        </el-card>
        <el-card shadow="hover" class="mgb20" style="height:252px;">
          <div class="user-info">
            <img src="../assets/img/video2.jpg" style="width: 220px; height:130px;" />
            <div class="user-info-cont">
              <div class="user-info-name">实况监控</div>
            </div>
          </div>
          <div class="user-info-list">
            当前时间：
            <span>2020-03-10 11:24:30</span>
          </div>
          <div class="user-info-list">
            当前地点：
            <span>广东省东莞市长安镇</span>
          </div>
        </el-card>
      </el-col>

      <el-col :span="18">
        <el-card shadow="hover" style="height:526px;">
          <div slot="header" class="clearfix">
            <span>监控列表</span>
            <el-button style="float: right; padding: 3px 0" type="text">添加</el-button>
          </div>
          <el-table :data="videoList" style="width:100%;">
            <el-table-column width="75px" prop="id" label="序号"></el-table-column>
            <el-table-column prop="equipID" label="设备编号"></el-table-column>
            <el-table-column prop="equipType" label="识别设备类型"></el-table-column>
            <el-table-column prop="identifyType" label="识别类型"></el-table-column>
            <el-table-column prop="time" label="安装时间"></el-table-column>
            <el-table-column prop="address" label="安装地址"></el-table-column>
            <el-table-column>
              <template slot-scope="scope">
                <div class="todo-item">{{scope.row.title}}</div>
              </template>
            </el-table-column>
            <el-table-column width="80">
              <template>
                <i class="el-icon-delete"></i>
              </template>
            </el-table-column>
          </el-table>
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
      videoList: [
        {
          id: "1",
          equipType: "立柱式",
          identifyType: "人脸识别",
          time: "2020-03-08 11:24:30",
          equipID: "EJC-102342",
          address: "广东省东莞市长安镇"
        },
        {
          id: "2",
          equipType: "立柱式",
          identifyType: "人脸识别",
          time: "2020-03-08 11:24:30",
          equipID: "EJC-102342",
          address: "广东省东莞市长安镇"
        },
        {
          id: "3",
          equipType: "立柱式",
          identifyType: "人脸识别",
          time: "2020-03-08 11:24:30",
          equipID: "EJC-102342",
          address: "广东省东莞市长安镇"
        },
        {
          id: "4",
          equipType: "立柱式",
          identifyType: "人脸识别",
          time: "2020-03-08 11:24:30",
          equipID: "EJC-102342",
          address: "广东省东莞市长安镇"
        },
        {
          id: "5",
          equipType: "立柱式",
          identifyType: "人脸识别",
          time: "2020-03-08 11:24:30",
          equipID: "EJC-102342",
          address: "广东省东莞市长安镇"
        },
        {
          id: "6",
          equipType: "立柱式",
          identifyType: "人脸识别",
          time: "2020-03-08 11:24:30",
          equipID: "EJC-102342",
          address: "广东省东莞市长安镇"
        }
      ]
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
}

.user-info-list span {
  margin-left: 70px;
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
