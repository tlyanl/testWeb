<template>
  <el-form :model="formData" ref="formRef" label-width="80px" :rules="formRules">
    <el-row v-if="validFormConfig.length">
      <el-col :span="colSpanNum" v-for="(item, index) in validFormConfig" :key="index">
        <el-form-item
          :label="item.label"
          :prop="item.prop"
          :required="item.required"
        >
          <!-- 动态组件渲染 -->
          <component
            v-if="ComponentsType[item.type] === 'el-cascader'"
            :is="ComponentsType[item.type] || 'el-input'"
            v-model="formData[item.prop]"
            style="width:100%;"
            v-on="item.events || {}"
            v-bind="item.attrs || {}"
          >
            <!-- 动态传递插槽 -->
            <template v-for="slot in item.slots" #[slot.name]>
              <component :is="slot.slot" />
            </template>
          </component>

          <component
            v-else-if="ComponentsType[item.type] === 'el-radio'"
            is="el-radio-group"
            v-model="formData[item.prop]"
            v-on="item.events || {}"
            v-bind="item.attrs || {}"
          >
              <el-radio
                v-for="(option, optIndex) in item.attrs.options"
                :key="optIndex"
                :label="option.label"
                :value="option.value"
              ></el-radio>
          </component>
          <component
            v-else-if="ComponentsType[item.type] === 'el-checkbox'"
            is="el-checkbox-group"
            v-model="formData[item.prop]"
            v-on="item.events || {}"
            v-bind="item.attrs || {}"
          >
              <el-checkbox
                v-for="(option, optIndex) in item.attrs.options"
                :key="optIndex"
                :label="option.label"
                :value="option.value"
              ></el-checkbox>
          </component>
          <component
            v-else
            :is="ComponentsType[item.type] || 'el-input'"
            v-model="formData[item.prop]"
            style="width:100%;"
            v-on="item.events || {}"
            v-bind="item.attrs || {}"
            >
            <!-- 下拉选项渲染 -->
            <template v-if="ComponentsType[item.type] === 'el-select'">
              <el-option
                v-for="(option, optIndex) in item.attrs.options"
                :key="optIndex"
                :label="option.label"
                :value="option.value"
              ></el-option>
            </template>
            <!-- 动态传递插槽 -->
            <template v-for="slot in item.slots" #[slot.name]>
              <component :is="slot.slot" />
            </template>
          </component>
        </el-form-item>
      </el-col>
        <!-- 如果当前项是最后一个，且不是 4 的倍数，添加操作按钮 -->
        <template v-if="validFormConfig.length % colSpan !== 0">
          <el-col :span="(validFormConfig.length % colSpan) * colSpanNum" style="display: flex; justify-content: flex-end">
            <el-form-item>
              <el-button type="primary" @click="submitForm">提交</el-button>
              <el-button @click="resetForm">重置</el-button>
            </el-form-item>
          </el-col>
        </template>
    </el-row>

     <!-- 如果表单项数量是 4 的倍数，操作按钮独占一行 -->
     <el-row v-if="validFormConfig.length % colSpan === 0">
      <el-col :span="24" style="display: flex; justify-content: flex-end">
        <el-form-item >
          <el-button type="primary" :loading="loading" @click="submitForm">提交</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
  <div>
    {{testjj}}
  </div>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
const ComponentsType = {
  input: "el-input",
  select: "el-select",
  date: "el-date-picker",
  cascader: "el-cascader",
  radio: "el-radio",
  checkbox: "el-checkbox",
  switch: "el-switch",
  // slider:'el-slider',
  time: "el-time-picker",
  color: "el-color-picker",
  // rate:'el-rate',
  upload: "el-upload",
  transfer: "el-transfer",
  tree: "el-tree",
  
};

// Props 定义与校验
const props = defineProps({
  formConfig: {
    type: Array,
    default: () => [],
  },
  initialData: {
    type: Object,
    default: () => {},
  },
  loading:{
    type: Boolean,
    default: false
  },
  colSpan:{
    type: Number,
    default: 3
  },
  testjj: {
    type: String,
    default: ''
  }
});
console.log(props.loading,'5555');
setTimeout(() => {
  console.log(props.loading,'5222555');
}, 5000);
const formRef = ref(null);
const num = ref(8)
const colSpanNum = computed(()=>{
  let num = parseInt(24/props.colSpan)
  props.colSpan
  return num
})
// 校验 formConfig 是否有效
const validFormConfig = computed(() => {
  return props.formConfig.filter((item) => item && item.prop && item.label);
});

// 初始化 formData
const formData = ref({ ...props.initialData });
// 生成 formRules 并检查重复 prop
const formRules = computed(() => {
  const rulesMap = {};
  const seenProps = new Set();
  for (const item of props.formConfig) {
    if (item.rules && item.prop) {
      if (seenProps.has(item.prop)) {
        console.warn(
          `Duplicate prop detected: ${item.prop}. Rules may be overwritten.`
        );
      }
      rulesMap[item.prop] = item.rules;
      seenProps.add(item.prop);
    }
  }
  return rulesMap;
});


const submitForm = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      emit('submit', formData);
    } else {
      console.log('表单验证失败');
    }
  });
};

// 重置表单
const resetForm = () => {
  formRef.value.resetFields();
  console.log('表单已重置');
};

// 定义事件
const emit = defineEmits(['submit']);
</script>
