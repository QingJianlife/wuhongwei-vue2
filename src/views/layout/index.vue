<template>
    <div>
        <div class="calendar">
        <div class="arrow">
            <i class="el-icon-arrow-left" @click="arrow('left')"></i>
            <i class="el-icon-arrow-right" @click="arrow('right')"></i>
        </div>
        <el-calendar v-model="value" :range="dateRange"></el-calendar>
        </div>
        <div class="date">
        <div class="arrow0">
            <i class="el-icon-arrow-left" @click="weekPre"></i>
            <i class="el-icon-arrow-right" @click="weekNext"></i>
        </div>
        <!-- 年份 月份 -->
        <div class="month">
            <p>{{ currentYear }}年{{ currentMonth }}月</p>
        </div>
          <!-- 星期 -->
          <ul class="weekdays">
            <li>一</li>
            <li>二</li>
            <li>三</li>
            <li>四</li>
            <li>五</li>
            <li>六</li>
            <li>日</li>
          </ul>
          <!-- 日期 -->
          <ul class="days">
            <li @click="pick(day)" v-for="(day, index) in days" :key="index">
              <!--本月-->
              <span v-if="day.getMonth()+1 != currentMonth" class="other-month">{{ day.getDate() }}</span>
              <span v-else>
              <!--今天-->
                  <span v-if="day.getFullYear() == new Date().getFullYear() && day.getMonth() == new Date().getMonth() && day.getDate() == new Date().getDate()" class="active">{{ day.getDate() }}</span>
                  <span v-else>{{ day.getDate() }}</span>
              </span>
            </li>
          </ul>
        </div>
        <el-button style="margin-top: 50px;" @click="gothree">three.js</el-button>
    </div>
  </template>
<script>
export default {
    data() {
        return {
            // 上
            value: "",
            endDate: "",
            dateRange: [],
            dateNum: 0,
            // 下
            currentYear: "",   // 年份
            currentMonth: "",  // 月份
            currentDay: "",    // 日期
            currentWeek: "",    // 星期
            days: [],
        };
    },
    created(){
        this.dateList(this.dateNum);
        console.log(this.dateRange);
        // 下面的日历
        this.initData();
    },
    methods: {
        getMonday(date) {
            var day = date.getDay();
            var deltaDay;
            if (day == 0) {
                deltaDay = 6;
            } else {
                deltaDay = day - 1;
            }
            var monday = new Date(date.getTime() - deltaDay * 24 * 60 * 60 * 1000);
            monday.setHours(0);
            monday.setMinutes(0);
            monday.setSeconds(0);
            return monday; //返回选定时间的周一的0时0分0秒
        },
        getDateNew(time) {
            console.log(time);
            let times = new Date(time);
            let year = times.getFullYear();
            let month = times.getMonth() + 1 < 10 ? "0" + (times.getMonth() * 1 + 1) : times.getMonth() * 1 + 1;
            let day = times.getDate() < 10 ? "0" + times.getDate() * 1 : times.getDate() * 1;
            return year + "-" + month + "-" + day;
        },
        dateList(delta) {
            //将时间对象转换为时间戳并加几天后转换为时间对象
            var DateNews = this.getMonday(
                new Date((new Date().getTime() / 1000 + 86400 * 7 * delta) * 1000)
            );
            let startDate = this.getDateNew(DateNews, delta);
            this.endDate = this.getDateNew(
                new Date((DateNews.getTime() / 1000 + 6 * 86400) * 1000)
            );
            this.dateRange = [startDate, this.endDate];
        },
        arrow(arrow) {
            if (arrow == "left") {
                this.dateNum--;
                this.dateList(this.dateNum);
            } else if (arrow == "right") {
                this.dateNum++;
                this.dateList(this.dateNum);
            }
        },
        formatDate (year, month, day) {
            const y = year
            let m = month
            if (m < 10) m = `0${m}`
            let d = day
            if (d < 10) d = `0${d}`
            return `${y}-${m}-${d}`
        },
        initData (cur) {
            let date = ''
            if (cur) {
                date = new Date(cur)
            } else {
                date = new Date()
            }
            this.currentDay = date.getDate()          // 今日日期 几号
            this.currentYear = date.getFullYear()       // 当前年份
            this.currentMonth = date.getMonth() + 1    // 当前月份
            this.currentWeek = date.getDay() // 1...6,0   // 星期几
            if (this.currentWeek === 0) {
                this.currentWeek = 7
            }
            const str = this.formatDate(this.currentYear, this.currentMonth, this.currentDay) // 今日日期 年-月-日
            this.days.length = 0
            // 今天是周日，放在第一行第7个位置，前面6个 这里默认显示一周，如果需要显示一个月，则第二个循环为 i<= 35- this.currentWeek
            /* eslint-disabled */
            for (let i = this.currentWeek - 1; i >= 0; i -= 1) {
                const d = new Date(str)
                d.setDate(d.getDate() - i)
                // console.log(y:" + d.getDate())
                this.days.push(d)
            }
            for (let i = 1; i <= 7 - this.currentWeek; i += 1) {
                const d = new Date(str)
                d.setDate(d.getDate() + i)
                this.days.push(d)
            }
        },
           //  上个星期
        weekPre () {
            const d = this.days[0]    // 如果当期日期是7号或者小于7号
            d.setDate(d.getDate() - 7)
            this.initData(d)
        },
        weekNext () {
            const d = this.days[6]    // 如果当期日期是7号或者小于7号
            d.setDate(d.getDate() + 7)
            this.initData(d)
        },
        pickPre (year, month) {
            console.log(222);
            const d = new Date(this.formatDate(year, month, 1))
            d.setDate(0)
            this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1))
        },
        pickNext (year, month) {
            const d = new Date(this.formatDate(year, month, 1))
            d.setDate(35)
            this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1))
        },
        // 当前选择日期
        pick (date) {
            alert(this.formatDate(date.getFullYear(), date.getMonth() + 1, date.getDate()))
        },
        gothree() {
            this.$router.push('/threejs')
        }
    }
  };
  </script>
  <style>
  #app {
          width: 40%;
          margin: auto;
      }
      ul {
          padding: 0;
      }
      li {
          list-style-type: none;
      }
      /* 上面的日历 */
      .calendar {
          position: relative;
          width: 100%;
          background: #fff;
          margin-top: 20px;
          margin-left: 20px;
      }
  .el-calendar__header {
          display: block;
      }
      .el-calendar-table .el-calendar-day {
          height: auto;
          text-align: center;
      }
      .el-calendar-table td.is-selected {
          background-color: #24b18d;
          color: #fff;
      }
  .el-calendar-table .el-calendar-day:hover {
          background-color: #24b18d;
          color: #fff;
      }
      .el-calendar-table {
          border-bottom: 1px solid #e4e4e4;
          padding-bottom: 15px;
      }
      .el-calendar-table .next {
          color: rgb(143, 143, 143);
      }
      .el-calendar__title,.el-calendar__button-group {
          text-align: center;
      }
        .arrow {
          width: 100%;
          max-height: 46px;
          position: absolute;
          top: 15px;
          text-align: center;
      }
      .arrow i {
          font-size: 20px;
          cursor: pointer;
      }
       .arrow i:nth-child(1) {
          margin-right: 10%;
          text-align: left;
      }
      .arrow i:nth-child(2) {
          margin-left: 10%;
          text-align: right;
      }
      .date {
          position: relative;
          margin-top: 20px;
          padding: 10px 20px;
          background-color: #D3D3D3;
      }
      .arrow0 {
          width: 100%;
          max-height: 46px;
          position: absolute;
          top: 27px;
          left: 0px;
          text-align: center;
      }
      .arrow0 i {
          font-size: 20px;
          cursor: pointer;
      }
  .arrow0 i:nth-child(1) {
          margin-right: 10%;
          text-align: left;
      }
      .arrow0 i:nth-child(2) {
          margin-left: 10%;
          text-align: right;
      }
      .month {
          text-align: center;
      }  
      .weekdays {
          display: flex;
      } 
      .weekdays li {
          flex: 1;
          text-align: center;
      } 
      .days {
          display: flex;
      } 
      .days li {
          flex: 1;
          text-align: center;
          cursor: pointer;
      } 
      .days li span {
          display: inline-block;
          width: 22px;
          height: 22px;
      }
      .days li span:hover {
          color: #fff;
          background-color: #409EFF;
          border-radius: 50%;
      }
  .active {
          display: inline-block;
          color: #fff;
          border-radius: 50%;
          background-color: #fa6854!important;
      } 
      .other-month {
          color: #e4393c;
      }
  </style>