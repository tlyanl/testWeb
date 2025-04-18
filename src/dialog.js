import { h, createApp } from "vue";
import { ElDialog } from "element-plus";
import { loadPlugins } from "@/loadPlugins";
export function renderDialog(component, props, dialogProps) {
  // const open = ref(true);
  const instance = ref(null);
  console.log(instance);
  const dialog = () =>
    h(
      ElDialog,
      {
        modelValue: true,
        ...dialogProps,
        onClose: () => {
          unmount();
        },
      },
      {
        default: () => h(component, {...props,ref:instance }),
      }
    );
  // 挂载到body
  const app = createApp(dialog);
  loadPlugins(app)
  const div = document.createElement("div");
  document.body.appendChild(div);
  app.mount(div);
  const unmount = () => {
    setTimeout(() => {
      // open.value = false;
      app.unmount();
      document.body.removeChild(div);
    }, 500);
  };

  return { unmount };
}
