<template>
  <div @click="fixDetail()">
    <div align="left" class="textchildlarge" style="margin: 5px; width:100%;">
      {{fix.description}}
    </div>
    <div style="width:100%;">
      <div style="width: 50%; float: left;" class="divparentsmall">
        <img src="../assets/icon_type.png" class="imgiconsmall" />
        <p align="left" class="textchildsmall">{{fix.type}}</p>
      </div>
      <div style="width: 25%; float: left" class="divparentsmall">
        <img src="../assets/icon_charger.png" class="imgiconsmall" />
        <div align="left" class="textchildsmall">{{fix.submitter}}</div>
      </div>
      <div style="width:25%; float: right" class="col-xs-3 divparentsmall">
        <img src="../assets/icon_time.png" class="imgiconsmall" />
        <div class="textchildsmall">{{fix.maintenanceDate}}</div>
      </div>
    </div>
  </div>
</template>

<style media="screen">
.divparentlarge {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 20px;
}

.imgiconlarge {
  height: 20px;
  width: 20px;
  margin-right: 10px;
}

.textchildlarge {
  margin: 0;
  width: 100%;
  font-size: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
  -webkit-text-overflow: ellipsis;
  -moz-text-overflow: ellipsis;
  white-space: nowrap;
}

.divparentsmall {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 10px;
}

.imgiconsmall {
  height: 10px;
  width: 10px;
  margin-right: 5px;
}

.textchildsmall {
  margin: 0;
  width: 100%;
  font-size: 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
  -webkit-text-overflow: ellipsis;
  -moz-text-overflow: ellipsis;
  white-space: nowrap;
}

a{
  text-decoration: none;
}
.router-link-active{
  text-decoration: none;
}
</style>

<script>
export default {
  name: 'fix-item',
  props: ['fix'],
  create(){

  },
  data(){
    return{

    }
  },
  computed:{

  },
  watch: {

  },
  methods: {
    fixDetail(){
      this.$store.commit("CURRENT_FIX", this.fix);

      this.$router.push({
        name: 'TaskFixDetail',
        params: {id: this.fix.feedbackRecordId, fixId: this.fix.id}
      });
    }
  },
  components: {}
}
</script>
