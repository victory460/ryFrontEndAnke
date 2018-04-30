<template lang="html">

  <div class="" style="background: #FFFFFF; width: 100px;">
    <div class="" style="width: 98%; position: relative; padding: 1%;">
      <div class="textchildlarge" style="width: 60%; float: left;text-align:left;"> {{record.productName}}</div>
      <div class="textchildlarge" style="width: 40%; float: left;text-align:right;">{{record.principal}}</div>
    </div>
    <div class="textchildsmall" style="width: 98%; padding: 0px 1%;">
        {{record.location}}
    </div>
    <div class="textchildsmall" style="width: 98%;  padding: 0px 1%;">
        {{record.date}}
    </div>
    <div class="textchildsmall" style="width:98%;  padding: 0px 1%;">
      {{record.description}}
    </div>
  </div>

</template>

<script>
export default {
  name: 'record-item',
  props: ['type', 'record'],
  created(){
    console.log(this.record);
    console.log(this.type);
  },
  data(){
    return {

    }
  },
  methods: {

  }
}
</script>

<style lang="css">
.textchildsmall {
  margin: 0;
  font-size: 12px;
  color: #4A4A4A;
  overflow: hidden;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
  -webkit-text-overflow: ellipsis;
  -moz-text-overflow: ellipsis;
  white-space: nowrap;
  text-align: left;
}


.textchildlarge {
  margin: 0;
  font-size: 15px;
  color: #4A4A4A;
  overflow: hidden;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
  -webkit-text-overflow: ellipsis;
  -moz-text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
