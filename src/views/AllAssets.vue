<template>
    <div>
        <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="id" width="180" />
      <el-table-column prop="assetsName" label="名称" width="180" />
      <el-table-column prop="assetsDesc" label="描述" width="380" />
      <el-table-column prop="assetsUsage" label="用途" width="380" />
    </el-table>
    </div>
    
  </template>
  
  <script>
  import axios from 'axios'
  export default {
  name: 'AllAssets',
  mounted() {
    this.getAllAssets()
  },
  data()  {
   return {
    tableData: []
   } 
  },
  methods: {
    getAllAssets() {
      const that = this;
      axios.get('/api/assets')
          .then(response => {
            // 成功获取响应，处理json数据
            console.log(response.data);
            // 可以更新某个data属性，以在界面上显示信息
            that.tableData = response.data;
          })
          .catch(error => {
            alert(error)
            console.error("请求错误:", error);
          })
    }
  }
  }
  </script>
  