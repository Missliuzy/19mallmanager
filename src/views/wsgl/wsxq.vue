<template>
  <div>
    <!-- <form name="form_sj" msgtype="1" validate="blur">
      <div v-html="mobans" class="moban"></div>
    </form> -->
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <div v-html="mobans" class="moban"></div>
    </el-form>
    <!-- <Inputs :moban="moban"></Inputs> -->
    <div class="btn">
      <el-row type="flex" justify="center" align="middle">
        <el-button type="primary" size="medium" @click="save()" v-show="sfshow">保存</el-button>
      </el-row>
    </div>
  </div>
</template>
<script>
import $ from "@/common/js/axios";
import Vue from 'vue';
// import { getdmb } from "@/common/js/common";
import {validate} from "@/common/js/validator"
// import { validator } from '@/common/js/valid';
import jq from 'jquery'
Vue.component('input', {
  template: `<input type="text" value="111">`
})
export default {
  name: '',
  data() {
    return {
      mobans: '',
      sjx: [],
      arr: [],
      element: '',
      form: {},
      rules: {},
      sel_dmb: [],
      oldname: '',
      options: [],
      selects: '',
      sfshow: true
    }
  },
  methods: {
    updateCity(data){//触发子组件城市选择-选择城市的事件   
      this.toCity = data.cityname;//改变了父组件的值  
      // console.log('toCity:'+this.toCity)     
      },
    getWenshu () {
      var that = this;
      $.get('/wsgl/getWsmb',{
        params: {
          wsid: this.$route.query.wsid
        }
      }).then(res => {
        if (res.returnData.executeResult == '1') {
          that.sjx = res.returnData.sjx;
          that.mobans = res.returnData.mb.nr;
          jq(that.sjx).each(function() {
            let name = jq(this)[0].sjxm;
            let tvalue = '';
            let jyrules = "[{validator: validator('" + jq(this)[0].jygz + "')}]";
            Vue.set(that.form, name, tvalue);
            Vue.set(that.rules, name, jyrules);
          });
          if (this.$route.query.wslx == '1') {
            this.sfshow = false
          }
        }
        // console.log(document.querySelector('input'));
      })
    },
    save() {
      if (!validate('form_sj')) {return false;}
      this.putData();
      setTimeout(() => {
        this.dialogInfo = false;
      }, 5);
    },
    putData() {
      this.arr = [];
      for(let i = 0; i < jq(this.element).find('input').length; i++) {
        this.arr.push(jq(this.element).find('input').eq(i).val());
      }
      $.post('/wsgl/insertWs', 
         {
          wsid: this.$route.query.wsid,
          lasqbid: this.$route.query.id,
          sjx: this.arr
        }
      ).then(res => {
        this.getWenshu ();
      })
    },
  },
  updated() {
    var _this = this;
    function getAll_dmb(dmb,ref) {
      return new Promise(resolve => {
        var selects = '';
        var options = '';
        if (_this.oldname == dmb) {return false}
        $.get('/dmbgl/dmblbCx',{ params: {
            table_name: dmb}
          }).then(res => {
          var dmblb = res.returnData.dmblb;
          if (_this.options == dmblb) {return false}
          for (let i =0; i < dmblb.length; i++) {
            options += '<option value=' + dmblb[i].dmid +'>'+ dmblb[i].dmmc +'</option>'
          }
          selects = "<select ref=" + ref + ">" + options +"</select>";
          _this.selects = selects;
        });
      })
    }
    async function f1(dmb,ref) {
      // console.log(JSON.stringify(_this.options));
      // console.log(_this.options);
      // console.log(await getAll_dmb(dmb, ref));
      var sss = getAll_dmb(dmb, ref);
      // console.log(sss)
      return await getAll_dmb(dmb, ref);
    }
    var ele = this.$el;
    this.element = jq(ele)[0];
    var inputContent = '';
    var ws = jq(this.element).find('ws');
    for (let i = 0; i < ws.length; i++) {
      for (let j =0; j < this.sjx.length; j++) {
        if (this.sjx[i].sjlx == '01') {
          let ref = this.sjx[i].sjxm;
          inputContent = "<input type='text' ref=" + ref + " valiflag=" + this.sjx[i].jygz +">"
        } else if (this.sjx[i].sjlx == '02') {
          let ref = this.sjx[i].sjxm;
          inputContent = "<input type='textarea' ref=" + ref + " valiflag=" + this.sjx[i].jygz +">"
        } else if (this.sjx[i].sjlx == '03') {
          let ref = this.sjx[i].sjxm;
          inputContent = "<input type='checkbox' ref=" + ref + ">"
        } else if (this.sjx[i].sjlx == '04') {
          let ref = this.sjx[i].sjxm;
          if (this.sjx[i].dmb != this.oldname) {
            inputContent = f1(this.sjx[i].dmb,ref);
            // console.log(f1(this.sjx[i].dmb,ref));
          this.oldname = this.sjx[i].dmb;
          }
        }
      }
      ws.eq(i).parent().append(inputContent);
      ws.eq(i).remove();
    }
  },
  beforeMount() {
    this.getWenshu ();
  },
};
</script>
<style scoped>
.btn {
  padding-bottom: 30px;
}
.moban >>>input {
  line-height: 30px;
  border: 1px solid rgb(169, 169, 169);
  border-radius: 3px;
}
.moban >>> select {
  width: 200px;
  height: 30px;
  line-height: 30px;
  border-radius: 3px;
}
</style>