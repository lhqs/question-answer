<template>
    <div class="logtop">
      <h3 class = "logTitle">用户操作日志</h3>

      <div class="logtable">
        <el-table
          :data="logContent"
          border
          stripe
          style="width: 100%">
          <el-table-column
            prop="ip"
            label="IP"
            sortable
            width="180">
          </el-table-column>
          <el-table-column
            prop="clickPage"
            label="点击页面"
            sortable
            width="160">
          </el-table-column>
          <el-table-column
            prop="operateContent"
            label="查询内容">
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="操作时间"
            :formatter="formatTime" >
          </el-table-column>
          <el-table-column
            prop="origin"
            label="操作设备">
          </el-table-column>
        </el-table>

        <div class="blockpage">
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[5, 10, 20, 30, 40, 50, 60, 70, 80,90,100]"
            :page-size="10"
            layout="total, sizes, prev, pager, next"
            :total=total>
          </el-pagination>
        </div>
      </div>

    </div>
</template>

<script>
  import { getLog } from '../../api/log'
  import utils from '../../utils/utils'

  export default {
    name: 'logger',
    data() {
      return {
        logContent: [],
        currentPage: 1,
        total: 10,
        pageNum: 1,
        pageSize: 10
      }
    },
    methods: {
      handleSizeChange(val) {
        this.pageSize = val
        this.getLogList()
      },
      handleCurrentChange(val) {
        this.pageNum = val
        this.getLogList()
      },
      formatTime: function(row, column) {
        return utils.formatDate.format(new Date(row.createTime), 'yyyy-MM-dd hh:mm')
      },
      getLogList() {
        getLog(this.pageNum, this.pageSize).then(res => {
          // console.log('reslog:' + res.data)
          this.logContent = res.data.list
          this.total = res.data.total
        }).catch(err => {
          console.log('errLog:' + err)
        })
      }
    },
    created() {
      this.getLogList()
    }
  }
</script>

<style scoped>
  .logtop {
    margin: 10px;
  }
  .logTitle {
    text-align: center;
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .logtable {
    width: 80%;
    margin: auto;
  }
  .blockpage {
    margin-top: 15px;
    float: right;
  }


</style>
