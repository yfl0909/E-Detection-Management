
<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i> 识别记录
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="container">
      预警提示（疫情流动期间可开启）：
      <el-switch
        @click="changeAlarmStatus"
        v-model="alarmStatus"
        active-color="#13ce66"
        inactive-color="#ff4949"
      ></el-switch>
    </div>
    <div class="container" v-if="alarmStatus">
      <div class="handle-box">
        <el-button icon="el-icon-delete" class="handle-del mr10" @click="delAllSelection">批量删除</el-button>
        <el-select v-model="query.address" placeholder="地址" class="handle-select mr10">
          <el-option key="1" label="广东省" value="广东省"></el-option>
          <el-option key="2" label="湖南省" value="湖南省"></el-option>
        </el-select>
        <el-input v-model="query.name" placeholder="用户名" class="handle-input mr10"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
      </div>
      <el-table
        :data="tableData"
        border
        class="table"
        ref="multipleTable"
        header-cell-class-name="table-header"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>
        <el-table-column width="160" prop="name" label="体温异常人员姓名"></el-table-column>
        <el-table-column label="当前体温" align="center">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.temp < '37.3'?'success':(scope.row.temp >= '37.3'?'danger':'')"
            >{{scope.row.temp}}˚C</el-tag>
          </template>
        </el-table-column>
        <el-table-column width="280" label="预警提示">体温异常，尽快联系相关人员进行处理</el-table-column>
        <el-table-column prop="address" label="人员所在地"></el-table-column>
        <el-table-column prop="identifyTime" label="识别时间"></el-table-column>
        <el-table-column label="识别人像(查看大图)" align="center">
          <template slot-scope="scope">
            <el-image
              class="table-td-thumb"
              :src="scope.row.thumb"
              :preview-src-list="[scope.row.thumb]"
            ></el-image>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              icon="el-icon-edit"
              @click="handleEdit(scope.$index, scope.row)"
            >去处理</el-button>
            <el-button
              type="text"
              icon="el-icon-delete"
              class="red"
              @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          background
          layout="total, prev, pager, next"
          :current-page="query.pageIndex"
          :page-size="query.pageSize"
          :total="pageTotal"
          @current-change="handlePageChange"
        ></el-pagination>
      </div>
    </div>

    <!-- 编辑弹出框 -->
    <el-dialog title="任务处理" :visible.sync="editVisible" width="50%">
      <div class="plugins-tips">
        <el-row>
          <el-col :span="12">当前地址为：{{ form.address }}</el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
              选择要委派的人员：
              <el-dropdown @command="setPerson" trigger="click">
                <span class="el-dropdown-link">
                  {{ person }}
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="张三">张三</el-dropdown-item>
                  <el-dropdown-item command="李四">李四</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </el-col>
        </el-row>
      </div>

      <quill-editor ref="myTextEditor" v-model="content" :options="editorOption"></quill-editor>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button class="editor-btn" type="primary" @click="submit">提交</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { fetchData } from "../api/get-identify-record";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";
export default {
  name: "basetable",
  data() {
    return {
      query: {
        address: "",
        name: "",
        pageIndex: 1,
        pageSize: 10
      },
      tableData: [],
      multipleSelection: [],
      delList: [],
      editVisible: false,
      pageTotal: 0,
      form: {},
      idx: -1,
      id: -1,
      alarmStatus: true,
      content: "",
      editorOption: {
        placeholder: "在此输入任务内容"
      },
      person: "张三"
    };
  },
  created() {
    this.getData();
  },
  components: {
    quillEditor
  },
  methods: {
    setPerson(command) {
      this.person = command;
    },
    onEditorChange({ editor, html, text }) {
      this.content = html;
    },
    submit() {
      this.content = "";
      this.$message.success("提交成功！");
    },
    // 获取 easy-mock 的模拟数据
    getData() {
      fetchData(this.query).then(res => {
        console.log(res);
        this.tableData = res.list.filter(item => {
          return item.temp >= 37.3;
        });
        this.pageTotal = res.pageTotal || 50;
      });
    },
    // 触发搜索按钮
    handleSearch() {
      this.$set(this.query, "pageIndex", 1);
      this.getData();
    },
    // 删除操作
    handleDelete(index, row) {
      // 二次确认删除
      this.$confirm("确定要删除吗？", "提示", {
        type: "warning"
      })
        .then(() => {
          this.$message.success("删除成功");
          this.tableData.splice(index, 1);
        })
        .catch(() => {});
    },
    // 多选操作
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    delAllSelection() {
      const length = this.multipleSelection.length;
      let str = "";
      this.delList = this.delList.concat(this.multipleSelection);
      for (let i = 0; i < length; i++) {
        str += this.multipleSelection[i].name + " ";
      }
      this.$message.error(`删除了${str}`);
      this.multipleSelection = [];
    },
    // 编辑操作
    handleEdit(index, row) {
      this.idx = index;
      this.form = row;
      this.editVisible = true;
    },
    // 保存编辑
    saveEdit() {
      this.editVisible = false;
      this.$message.success(`修改第 ${this.idx + 1} 行成功`);
      this.$set(this.tableData, this.idx, this.form);
    },
    // 分页导航
    handlePageChange(val) {
      this.$set(this.query, "pageIndex", val);
      this.getData();
    },
    changeAlarmStatus() {
      this.alarmStatus = !this.alarmStatus;
    }
  }
};
</script>

<style scoped>
.editor-btn {
  margin-top: 20px;
}
.handle-box {
  margin-bottom: 20px;
}

.handle-select {
  width: 120px;
}

.handle-input {
  width: 300px;
  display: inline-block;
}
.table {
  width: 100%;
  font-size: 14px;
}
.red {
  color: #ff0000;
}
.mr10 {
  margin-right: 10px;
}
.table-td-thumb {
  display: block;
  margin: auto;
  width: 40px;
  height: 40px;
}
</style>
