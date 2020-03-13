<template>
  <div class="container">
    <div class="plugins-tips">
      <el-row>
        <el-col :span="12">
          <div class="grid-content bg-purple-light">
            选择被委派的人员：
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
      <el-button class="editor-btn" type="primary" @click="submit">点击进行任务指派</el-button>
    </span>

    <el-tabs>
      <el-tab-pane :label="`已发布的任务(${read.length})`">
          <el-table :data="read" style="width: 100%">
            <el-table-column label="任务内容">
              <template slot-scope="scope">
                <span class="message-title">{{scope.row.title}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="date" width="200" label="指派时间"></el-table-column>
            <el-table-column prop="name" width="150" label="姓名"></el-table-column>
            <el-table-column width="120" label="操作">
              <template slot-scope="scope">
                <el-button type="danger" @click="handleDel(scope.$index)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="handle-row">
            <el-button type="danger">删除全部</el-button>
          </div>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>

<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";
export default {
  name: "editor",
  data: function() {
    return {
      content: "",
      editorOption: {
        placeholder: "在此输入任务内容"
      },
      person: "张三",
      showHeader: false,
      read: [
        {
          name: "张三",
          date: "2020-03-10 20:00:00",
          title: "【任务指派】请于今日2点到5点，对福州市区内的设备进行检查和消毒"
        },
        {
          name: "张三",
          date: "2020-03-09 20:00:00",
          title: "【任务指派】请于今日2点到5点，对福州市区内的设备进行检查和消毒"
        },
        {
          name: "张三",
          date: "2020-03-08 21:00:00",
          title: "【任务指派】请于今日2点到5点，对福州市区内的设备进行检查和消毒"
        }
      ]
    };
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
      console.log(this.content);
      this.$message.success("任务已经成功下发给指定人员！");
    },
    handleDel(index) {
      const item = this.read.splice(index, 1);
      this.recycle = item.concat(this.recycle);
    }
  }
};
</script>
<style scoped>
.editor-btn {
  margin-top: 20px;
}
.message-title {
  cursor: pointer;
}
.handle-row {
  margin-top: 30px;
}
.el-tabs {
  margin-top: 30px;
}
</style>