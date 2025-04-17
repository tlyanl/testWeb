<!--
 * @Author: tany tany@etsen.com.cn
 * @Date: 2025-04-15 17:22:31
 * @LastEditors: tany tany@etsen.com.cn
 * @LastEditTime: 2025-04-16 10:24:46
 * @FilePath: \RuoYi-Vue3\src\components\myForm\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<
<template>
    <el-form :model="formData" label-width="80px" :rules="formRules">
      <el-row>
        <el-col :span="6"  v-for="(item, index) in formConfig">
          <el-form-item
            :label="item.label"
            :prop="item.prop"
            :key="item.prop"
            :required="item.required"
          >
            <component
              :is="item.type || 'el-input'"
              v-model="formData[item.prop]"
              v-bind="item.attrs || {}"
              v-on="item.events || {}"
            >
              <template v-if="item.type === 'el-select'">
                <el-option
                  v-for="(option, index) in item.options"
                  :key="index"
                  :label="option.label"
                  :value="option.value"
                ></el-option>
              </template>
               <!-- 动态传递插槽 -->
               <!-- <template v-for="slot in item.slots" #[slot.name]>
                <component :is="slotContent" />
              </template> -->
              <template #prepend>
                Http://
              </template>
            </component>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
</template>

<script setup>
import { ref } from "vue";
const props = defineProps({
  formConfig: {
    type: Array,
    default: () => {},
  },
  initialData: {
    type: Object,
    default: () => {},
  },
});
const formData = ref({ ...props.initialData });
const formRules = reactive(
  props.formConfig.reduce((acc, cur) => {
    if(cur.rules) {
      acc[cur.prop] = cur.rules;
    }
    return acc;
},{})
);

</script>
