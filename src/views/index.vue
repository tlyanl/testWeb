<template>
  <div>
    <el-tabs v-model="activeTab">
      <el-tab-pane label="首页" name="1">
        什么都没有
        <el-button @click="onClick">跳转</el-button>
        <el-button @click="handleBtn">打开弹窗</el-button>
      </el-tab-pane>
      <el-tab-pane label="abort" name="2">
        <imgs />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup name="Index">
import imgs from "./imgs";
import { renderDialog } from "@/dialog";
import myForm from "@/components/myForm/index.vue";
const router = useRouter();
const activeTab = ref("1");
const onClick = () => {
  // 跳转
  router.push({ path: "/myForm" });
};
const loading = ref(false);
const handleBtn = () => {
  initializeForm();
  // 打开弹窗
  renderDialog(
    myForm,
    {
      formConfig: myFormData.formConfig,
      initialData: myFormData.formData,
      laoding: loading.value,
      colSpan: 3,
      testjj: testjj.value,
      onSubmit: (e) => {
        loading.value = true;
        setTimeout(() => {
        loading.value = false;
        }, 1000);
      },
    },
    {
      title: "动态表单",
      width: "80%",
      top: "10%",
    }
  );
};
const myFormData = reactive({
  formConfig: [], //项
  formData: {}, //值
});
const testjj = ref('55555555')
setTimeout(()=>{
  testjj.value = '给对方'
},3000)
const initializeForm = () => {
  (myFormData.formConfig = [
    {
      label: "名字",
      prop: "name",
      type: "input",
      required: true,
      attrs: { placeholder: "请输入名字", suffixIcon: "Search" },
      events: { change: (val) => console.log(val) },
      slots: [{ name: "prepend", slot: h("div", {}, "这是插槽") }],
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
      rules: [{ required: true, message: "日期不能为空", trigger: "change" }],
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
          expandTrigger: "hover",
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
                  },
                ],
              },
            ],
          },
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
  ]),
    (myFormData.formData = {
      name: "hhh",
      select: "2",
      datatime: "2021-01-01",
      cascader: "fankui1",
      // checkbox:["1","2"],
      // radio: "1",
    });
};
</script>
<style lang="scss" scoped>
.box-img {
  width: 50%;
  display: flex;
  flex: 1;
  .item-img {
    // width: 30%;
    margin-left: 10px;
    boerder-radius: 10px;
  }
}
</style>
