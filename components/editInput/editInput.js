// components/editInput/editInput.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    value: {
      type: String,
      observer(newVal, oldVal) {
        this.setData({
          text: newVal,
          dirty: false,
        });
      }
    },
    type: String,
    placeholder: String,
    icon: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    text: '',
    dirty: false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleTypeIn(e) {
      const { value } = e.detail;
      this.setData({
        text: value,
        dirty: value !== this.data.value,
      });
    },
    applyChange() {
      this.triggerEvent('change', {
        value: this.data.text,
      });
    },
    handleReset() {
      this.setData({
        text: this.data.value,
        dirty: false,
      });
    },
  },

  ready() {
    this.setData({
      text: this.data.value,
    });
  }
})
