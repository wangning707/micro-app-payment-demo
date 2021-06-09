const payConf = require('./payConf')
App({
  getConf() {
    return payConf
  },
  getDomain() {
    return `http://${payConf.domain}:${payConf.port}`
  },
  post(path, data, query) {

    return new Promise((resolve, reject) => {
      tt.request({
        method: 'POST',
        url: `${this.getDomain()}${path}`, // 目标服务器url
        data,
        success: (res) => {
          resolve(res);
        },
        fail: (res) => {
          reject(res)
        }
      });
    })
  },
  onLaunch: function () {
    console.log('当前服务地址::', this.getDomain())
  }
})