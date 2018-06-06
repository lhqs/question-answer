<template>
    <div class="logtop">
      <h3 class = "logTitle">用户操作日志</h3>
      <div class="export-title">
        <div class="export-subtitle">
          <span class="export-tips">请选择起始时间后导出</span>
          <el-date-picker v-model="startTime" type="datetime" placeholder="选择起始日期时间"></el-date-picker> ~
          <el-date-picker v-model="endTime" type="datetime" placeholder="选择终止日期时间"></el-date-picker>
          <!--<el-date-picker
            v-model="value5"
            type="datetimerange"
            :picker-options="pickerOptions2"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right">
          </el-date-picker>-->
          <span class="export-btn1"><el-button type="info" @click="ExportExcel">导出至Excel</el-button></span>
          <span class="export-btn2"><el-button type="info" @click="ExportCsv">导出至Csv</el-button></span>
        </div>
      </div>

      <div class="logtable">
        <el-table
          :data="logContent"
          border
          stripe
          style="width: 100%">
          <el-table-column
            type="index"
            align="center"
            :index="indexMethod">
          </el-table-column>
          <el-table-column
            prop="username"
            label="用户名"
            align="center"
            width="90">
          </el-table-column>
          <el-table-column
            prop="ip"
            label="IP"
            sortable
            align="center"
            width="160">
          </el-table-column>
          <el-table-column
            prop="ipAddr"
            label="IP地址"
            sortable
            align="center"
            width="160">
          </el-table-column>
          <el-table-column
            prop="clickPage"
            label="点击页面"
            sortable
            align="center"
            width="160">
          </el-table-column>
          <el-table-column
            prop="operateContent"
            align="center"
            label="查询内容">
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="操作时间"
            sortable
            align="center"
            :formatter="formatTime" >
          </el-table-column>
          <el-table-column
            prop="origin"
            align="center"
            label="操作设备">
          </el-table-column>
          <el-table-column label="操作" align="center" width="80">
            <template slot-scope="scope">
              <!--<el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>-->
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
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
  import { getLog, deleteLogById, downloadUrl, getLoglistTime /*, exportExcelForLog*/ } from '../../api/log'
  import { exportLogByTime, exportCsvLogByTimeCsv } from '../../api/api'
  import utils from '../../utils/utils'
  // import { getAddrByIp } from '../../api/otherApi'
  export default {
    name: 'logger',
    data() {
      return {
        logContent: [],
        currentPage: 1,
        total: 10,
        pageNum: 1,
        pageSize: 10,
        startTime: '',
        endTime: ''
      }
    },
    methods: {
      indexMethod(index) {
        return index + 1
      },
      handleSizeChange(val) {
        this.pageSize = val
        this.getLogList()
      },
      handleEdit(index, row) {
        console.log(index, row)
      },
      handleDelete(index, row) {
        this.$confirm('此操作将删除该条记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          deleteLogById(row.logId).then(res => {
            this.getLogList()
          }).catch(err => {
            console.log('delete_log err:' + err)
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除操作'
          })
        })
      },
      handleCurrentChange(val) {
        this.pageNum = val
        this.getLogList()
      },
      formatTime: function(row, column) {
        return utils.formatDate.format(new Date(row.createTime), 'yyyy-MM-dd hh:mm')
      },
      /* formatIpAddr: function(row) { 这里存在不断请求的问题
        const param = { ip: row.ip }
        getAddrByIp(param).then(res => {
          const data = res.data.data
          this.ipAddress = res.country + '-' + res.city + '-' + res.region + '-' + res.isp
        }).catch(err => {
        })
        return this.ipAddress
      },*/
      getLogList() {
        console.log(this.startTime, this.endTime)
        if (this.startTime === null || this.endTime === null || this.startTime === '' || this.endTime === '') {
          console.log('1')
          getLog(this.pageNum, this.pageSize).then(res => {
            this.logContent = res.data.list
            this.total = res.data.total
          }).catch(err => {
            console.log('errLog:' + err)
          })
        } else {
          console.log(2)
          getLoglistTime(this.pageNum, this.pageSize, utils.formatDate.format(this.startTime, 'yyyy-MM-dd hh:mm:ss'), utils.formatDate.format(this.endTime, 'yyyy-MM-dd hh:mm:ss')).then(res => {
            this.logContent = res.data.list
            this.total = res.data.total
          }).catch(err => {
            console.log('errLog:' + err)
          })
        }
      },
      ExportExcel() {
        if (this.startTime === '' || this.endTime === '' || this.startTime === null || this.endTime === null) {
          this.$notify({
            title: '警告',
            message: '请选择导出时间范围',
            type: 'warning'
          })
        } else {
          const params = {
            startTime: utils.formatDate.format(this.startTime, 'yyyy-MM-dd hh:mm:ss'),
            endTime: utils.formatDate.format(this.endTime, 'yyyy-MM-dd hh:mm:ss')
          }
          exportLogByTime(params).then(res => {
            if (res.headers && (res.headers['content-type'] === 'application/vnd.ms-excel')) {
              downloadUrl(res.request.responseURL)
              return
            }
          }).catch(err => {
            console.log('export-excel err ---> ' + err)
          })
        }
      },
      ExportCsv() {
        console.log('csv')
        if (this.startTime === '' || this.endTime === '' || this.startTime === null || this.endTime === null) {
          this.$notify({
            title: '警告',
            message: '请选择导出时间范围',
            type: 'warning'
          })
        } else {
          const params = {
            startTime: utils.formatDate.format(this.startTime, 'yyyy-MM-dd hh:mm:ss'),
            endTime: utils.formatDate.format(this.endTime, 'yyyy-MM-dd hh:mm:ss')
          }
          exportCsvLogByTimeCsv(params).then(res => {
            if (res.headers) {
              downloadUrl(res.request.responseURL)
              return
            }
          }).catch(err => {
            console.log('export-csv err ---> ' + err)
          })
        }
      }
    },
    created() {
      this.getLogList()
    },
    watch: {
      startTime: function() {
        this.getLogList()
      },
      endTime: function() {
        this.getLogList()
      }
    }
  }
</script>

<style scoped>
  /*.logtop {
    margin: 10px;
  }*/
  .logTitle {
    text-align: center;
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .logtable {
    width: 90%;
    margin: auto;
  }
  .blockpage {
    margin-top: 15px;
    float: right;
  }
  .export-title {
    margin: 10px auto 10px auto;
    text-align: center;
    width: 90%;
    height: 60px;
    background: #dfdfdf;
  }
  .export-subtitle{
    line-height: 56px;
  }
  .export-btn1{
    margin-left: 50px;
  }
  .export-btn2{
    margin-left: 20px;
  }
  .export-tips {
    margin-right: 20px;
  }
</style>
