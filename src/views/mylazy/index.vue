
<template>
  <div>
    <el-tabs v-model="activeTab">
      <el-tab-pane label="首页" name="1">
      <div style="margin-bottom: 1520px;padding: 10px;">
        <img src="@/assets/images/login-background.jpg" alt="">
      </div>
      <div>
        <img v-mylazy="realSrc"></img>
      </div>
      </el-tab-pane>

    </el-tabs>
  </div>
</template>

<script setup name="mylazy">``
  const getImageUrl = (url)=>{
    return new URL(url, import.meta.url).href
  }
  const activeTab = ref('1')
   const realSrc =  ref(getImageUrl('@/assets/images/zj-login-bg1.png'))
   setTimeout(() => {
    // realSrc.value =  getImageUrl('@/assets/images/zj-login-form-bg.png')
    realSrc.value =  new URL('@/assets/images/zj-login-form-bg.png', import.meta.url).href
    console.log('更换了');
   }, 5000);
</script>
<style lang="scss" scoped>
.box-img{
  width: 50%; 
  display: flex; 
  flex:1;
  .item-img{
    // width: 30%;
    margin-left: 10px;
    boerder-radius: 10px;
  }
}
</style>

