const app = getApp()

const createOrderParams = {
  out_order_no: `${Date.now()}`,
  total_amount: 1,
  subject: '小程序测试预下单',
  body: '测试',
  valid_time: 60 * 60 * 48,
};

Page({
  data: {
    orderInfo: {
      order_id: "",
      order_token: ""
    }
  },
  createOrder() {
    const _this = this;
    createOrderParams.out_order_no = `${Date.now()}`
    app.post('/create-order', {
      order: createOrderParams
    }).then(res => {
      const {
        data
      } = res;
      console.log('创建订单成功::', data)
      tt.showModal({
        title: '创建订单成功', // 内容
        content: '请到控制台查看具体返回',
      });
      this.setData({
        orderInfo: data.data
      })
    })
  },
  getOrderStatus() {
    app.post('/get-order-status', {
      order: {
        out_order_no: createOrderParams.out_order_no
      }
    }).then(res => {
      const {
        data
      } = res;
      tt.showModal({
        title: '查询订单成功', // 内容
        content: '请到控制台查看具体返回',
      });
      console.log('查询订单成功::', data)
    })
  },
  pay() {
    const _this = this;
    console.log('orderInfo', this.data.orderInfo);
    tt.pay({
      orderInfo: _this.data.orderInfo,
      service: 5,
      _debug: true,
      success(res) {
        console.log('收到成功回调啦', res);
        if (res.code === 0) {
          console.log('支付成功啦～～')
        }
      },
      fail(res) {
        console.log('支付失败了', res)
      }
    })
  },
  onLoad: function () {},
})