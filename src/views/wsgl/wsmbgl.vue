<template>
  <div class="wslb">
    <el-card class="box-card">
      <div v-for="item in wslb" :key="item.wsname" :value="item.wsid" :wsbm="item.wsbm" class="text item">
       <span class="wsxq" @click="wsxq(item.wsid)">{{item.wsname}}</span>
      </div>
    </el-card>
  </div>
</template>
<script>
import "@/common/scss/public.scss";
import $ from "@/common/js/axios";
export default {
  name: '',
  data() {
    return { 
      wslb: []
    }
  },
  methods: {
    // 获取文书列表
    getList() {
      $.get('/wsgl/getWslb', {params: {wsid: this.$route.query.id}}).then(res => {
        if (res.returnData.executeResult == '1') {
          this.wslb = res.returnData.wslb;
        }
        this.wslb = res.returnData.wslb;
      })
    },
    //跳转文书详情页面
    wsxq(value) {
      $.get('/wsgl/wstxPd', {params: {wsid: value, lasqbid: this.$route.query.id}}).then(res => {
        this.$router.push({name: 'Wsxq', query: {wsid: value, id: this.$route.query.id}})
        if (res.returnData.sfkt == '1') {
          this.$router.push({name: 'Wsxq', query: {wsid: value, id: this.$route.query.id}})
        } else {
          this.$alert(res.returnData.msg, {
            center: true,
            confirmButtonText: "确定"
          }).then(() => {
            this.$router.push({name: 'Ajblgc', query: {lasqbid: this.$route.query.id}})
          });
        }
      })
    }
  },
  created() {
    this.getList()
  }
};
</script>
<style scoped lang="scss">
.wslb {
  width: 100%;
  min-height: 500px;
  .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }

  .box-card {
    width: 100%;
  }
  .wsxq {
    cursor: pointer;
  }
}
</style>