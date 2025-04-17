<!--
 * @Author: tany tany@etsen.com.cn
 * @Date: 2025-03-28 09:50:28
 * @LastEditors: tany tany@etsen.com.cn
 * @LastEditTime: 2025-04-15 17:28:25
 * @FilePath: \RuoYi-Vue3\src\views\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <el-tabs v-model="activeTab">
      <el-tab-pane label="首页" name="1">
      什么都没有
      <el-button @click="onClick">跳转</el-button>
      </el-tab-pane>
      <el-tab-pane label="abort" name="2">
        <imgs/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup name="Index">
import imgs from './imgs'
  const router = useRouter()
  const activeTab = ref('1')
  const onClick = () => {
    // 跳转
    router.push({ path: '/myForm' })
  }
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

