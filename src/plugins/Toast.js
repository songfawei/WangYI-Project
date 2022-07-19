import Toast from '@/components/Toast.vue'

export default {
  install (Vue) {
    const ToastConstructor = Vue.extend(Toast)
    const t = new ToastConstructor()
    t.$mount(document.createElement('div'))
    document.body.appendChild(t.$el)
    Vue.prototype.$showToast = ({
      msg,
      btnShow,
      callback
    }) => {
      t.msg = msg
      t.show = true
      t.btnShow = btnShow
      t.callback = callback
    }
    Vue.prototype.$hideToast = () => {
      t.show = false
    }
  }
}
