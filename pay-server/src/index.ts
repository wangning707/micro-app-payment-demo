import express from 'express';
import bodyParser from 'body-parser';
import { createOrder, getOrderStatus } from './pay';
import payConf from '../pay.json';

const port = payConf.port;

const app = express();

app.use(bodyParser.json({ type: 'application/json' }));
// 将 HTML 请求体做为字符串处理
app.use(bodyParser.text({ type: 'text/html' }));

app.use('/create-order', (req, resp) => {
    const body = req.body;
    const { order } = body;
    createOrder(order).then(resp.send.bind(resp)).catch(resp.send.bind(resp));
});

app.use('/get-order-status', (req, resp) => {
    const body = req.body;
    const { order } = body;
    getOrderStatus(order).then(resp.send.bind(resp)).catch(resp.send.bind(resp));
});

app.listen(port, () => {
    console.log(`listening port: ${port} ----`);
});
