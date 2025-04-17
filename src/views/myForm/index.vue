<!--
 * @Author: tany tany@etsen.com.cn
 * @Date: 2025-04-15 17:25:02
 * @LastEditors: tany tany@etsen.com.cn
 * @LastEditTime: 2025-04-16 17:08:13
 * @FilePath: \RuoYi-Vue3\src\views\myForm\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->

<template>
  <div>
    <myForm
      :form-config="myFormData.formConfig"
      :initialData="myFormData.formData"
      :colSpan="3"
      v-if="myFormData.formConfig.length"
      @submit="submitForm"
    />

     <!-- 5 等分示例 -->
  <el-row class="custom-grid">
    <el-col :span="5" v-for="n in 8" :key="n" class="col-item">
      <div :class="`grid-content-${n}`">第 {{ n }} 列</div>
    </el-col>
  </el-row>


    <!-- row等分 -->
    <el-row type="flex" class="flex-grid">
    <el-col 
      v-for="n in 7" 
      :key="n"
      style="flex: 1; margin: 0 5px">
      <div :class="`grid-content-${n}`">第 {{ n }} 列</div>
    </el-col>
  </el-row>
  </div>
</template>

<script setup name="myForm">
import myForm from "@/components/myForm/index.vue";
const myFormData = reactive({
  formConfig: [], //项
  formData: {}, //值
});

const initializeForm = () => {
  myFormData.formConfig =  [
    {
      label: "名字",
      prop: "name",
      type: "input",
      required: true,
      attrs: { placeholder: "请输入名字",suffixIcon:"Search"},
      events: { change: (val) => console.log(val) },
      slots:[{ name: "prepend", slot: h('div',{},'这是插槽') }],
      rules: [
        { required: true, message: "用户名不能为空", trigger: "blur" },
        {
          min: 3,
          max: 10,  
          message: "用户名长度在 3 到 10 个字符",
          trigger: "blur",
        },
      ],
    },
    {
      label: "日期",
      prop: "datatime",
      type: "date",
      required: true,
      rules: [
        { required: true, message: "日期不能为空", trigger: "change" },
      ],
      attrs: {
        type: "date",
        placeholder: "请选择日期",
        valueFormat: "YYYY-MM-DD",
      },
      events: { change: (val) => console.log(val) },
    },
    {
      label: "选项",
      prop: "select",
      type: "select",
      events: { change: (val) => console.log(val) },
      attrs: {
        placeholder: "请选择",
        options: [
        { label: "选项1", value: "1" },
        { label: "选项2", value: "2" },
        { label: "选项3", value: "3" },
      ],
      },
    },
    
    {
      label: "级联组件",
      prop: "cascader",
      type: "cascader",
      required: true,
      rules: [{ required: true, message: "请选择级联", trigger: "change" }],
      attrs: {
        placeholder: "请选择级联",
        props: {
          expandTrigger: 'hover',
          },
          options: [
          {
            value: "zhinan",
            label: "指南",
            children: [
              {
                value: "shejiyuanze",
                label: "设计原则",
                children: [
                  {
                    value: "yizhi",
                    label: "一致",
                  },
                  {
                    value: "fankui1",
                    label: "一致2",
                  }
                ]
              }
            ]
          }
        ],
        },
      events: { change: (val) => console.log(val) },
    },
    {
      label: "单选框",
      prop: "radio",
      type: "radio",
      required: true,
      rules: [{ required: true, message: "请选择单选框", trigger: "change" }],
      events: { change: (val) => console.log(val) },
      attrs: {
        options: [
        { label: "选项1", value: "1" },
        { label: "选项2", value: "2" },
        { label: "选项3", value: "3" },
      ],
      },
    },
    {
      label: "多选框",
      prop: "checkbox",
      type: "checkbox",
      events: { change: (val) => console.log(val) },
      attrs: {
        options: [
        { label: "选项1", value: "1" },
        { label: "选项2", value: "2" },
        { label: "选项3", value: "3" },
      ],
      },
    },
  ],
  myFormData.formData = {
    name: "hhh",
    select: "2",
    datatime: "2021-01-01",
    cascader:'fankui1',
    // checkbox:["1","2"],
    // radio: "1",
}
};
const submitForm = (e) => {
  console.log(e,'5555');
};
// 组件加载时初始化
onMounted(() => {
  initializeForm();
});
</script>
<style lang="scss" scoped>
.custom-grid {
  margin-left: 0 !important;
  margin-right: 0 !important;
}

/* 5 等分 */
:deep(.el-col-5){
  width: 20%; /* 100% / 5 */
  float: left;
  padding: 0 5px; /* 替代 gutter */
}

/* 7 等分 */
:deep(.el-col-7){
  width: calc(100% / 7);
}

/* 9 等分 */
:deep(.el-col-9) {
  width: calc(100% / 9);
}

.grid-content {
  background: #f5f7fa;
  padding: 20px;
  border-radius: 4px;
}



.flex-grid {
  /* 清除默认 gutter */
  margin-left: -5px !important;
  margin-right: -5px !important;
}
.grid-content-7{
  background-color: #dd54aa;
}
.grid-content-6{
  background-color: red;
}
.grid-content-1{
  background-color: #f5d456;
}
.grid-content-2{
  background-color: #f85ad6;
}
.grid-content-3{
  background-color: red;
}
.grid-content-4{
  background-color: #ddd;
}
.grid-content-5{
  background-color: #409EFF;
}
</style>
