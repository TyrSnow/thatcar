// components/password/password.js
function generateRandomNumList() {
  return ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].sort(cube => (Math.random() - 0.5)).concat('X');
}
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      observer(newVal, oldVal) {
        this.setData({
          password: ['', '', '', '', '', ''],
          cur: -1,
          nums: generateRandomNumList(),
        });
      },
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    password: ['', '', '', '', '', ''],
    cur: -1,
    nums: [],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleKeyDown(e) {
      let { cur, password } = this.data;
      let { key } = e.currentTarget.dataset;
      if (key === 'X') {
        if (cur >= 0) {
          password[cur] = '';
          cur = cur - 1;
        }
      } else {
        if (cur === 5) {
          return;
        }
        cur += 1;
        password[cur] = key;
      }
      this.setData({
        cur,
        password,
      });
      if (cur === 5) {
        // 密码输入完毕
        this.triggerEvent('change', {
          value: password.join(''),
        });
      }
    },
    handleCancel(e) {
      this.triggerEvent('cancel', {});
    }
  }
});
