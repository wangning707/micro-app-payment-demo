import fse from 'fs-extra';
import { PortScanner } from '../libs/port-scanner';
import payConf from '../pay.json';
import { execSync } from 'child_process';
import os from 'os';

const getIpv4Address = () => {
    const interfaces = os.networkInterfaces();
    return Object.values(interfaces)
        .map(iface => iface.filter(net => net.family === 'IPv4' && net.address !== '127.0.0.1'))
        .flat();
};
const [network = { address: '127.0.0.1' }] = getIpv4Address();

const portScanner = new PortScanner();

portScanner.findAPortNotInUse([8000, 9999]).then(port => {
    const targetJsonStr = JSON.stringify({ ...payConf, port, domain: network.address });

    fse.writeFileSync(`${__dirname}/../pay.json`, targetJsonStr);
    fse.writeFileSync(`${__dirname}/../../../payConf.js`, `module.exports = ${targetJsonStr}`);
    execSync(`node ${__dirname}/../src`);
});
