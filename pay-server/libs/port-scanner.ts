import net from 'net';

export class PortScanner {
    host = '127.0.0.1';

    constructor(host: string = '127.0.0.1') {
        if (typeof host !== 'string') {
            throw new Error('param host can only be a string');
        }
    }

    scan(port: number): Promise<{ status: string }> {
        const scanRes = { status: null };
        return new Promise(resolve => {
            if (typeof port !== 'number') {
                throw new Error('PortScanner error: param port must be a number');
            }
            if (port < 1 || port > 65535) {
                throw new Error('PortScanner error: port must be in range [1-65535]');
            }
            const socket = new net.Socket();
            const timeout = 200;

            socket.on('connect', () => {
                scanRes.status = 'connect';
                socket.destroy();
            });
            socket.on('timeout', () => {
                scanRes.status = 'timeout';
                socket.destroy();
            });
            socket.on('error', () => {
                scanRes.status = 'error';
                socket.destroy();
            });
            socket.on('close', () => {
                resolve(scanRes);
            });

            socket.setTimeout(timeout);
            socket.connect(port, this.host);
        });
    }

    async findAPortNotInUse(range: [number, number]) {
        const [from, to] = range;
        let currentPort = from;
        while (currentPort <= to) {
            const portStatus = await this.scan(currentPort);
            if (portStatus.status !== 'connect') {
                return currentPort;
            }
            currentPort++;
        }
        return null;
    }
}
