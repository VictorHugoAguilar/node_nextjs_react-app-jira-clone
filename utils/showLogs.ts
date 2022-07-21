export type logType = 'info' | 'warn' | 'error' | 'debug' | 'log';

export const showLogs = (type: logType = 'info', msg: string, obj?: any) => {
    if (process.env.NEXT_PUBLIC_SHOW_LOGS) {

        const message = `[${new Date().toISOString()}] [${type.toUpperCase()}] ${msg} ${obj ? JSON.stringify(obj) : ''}`;

        switch (type) {
            case 'info':
                console.log(`%c${message}`, 'color: #1CF60E; font-weight: bold;');
                break;
            case 'warn':
                console.log(`%c${message}`, 'color: #FFF033; font-weight: bold;');
                break;
            case 'error':
                console.log(`%c${message}`, 'color: #F60E0E; font-weight: bold;');
                break;
            case 'log':
                console.log(`%c${message}`, 'color: #00bcd4; font-weight: bold;');
                break;
            case 'debug':
                console.log(`%c${message}`, 'color: #F6E40E; font-weight: bold;');
                break;
            default:
                console.log(`%c${message}`, 'color: #F60E74; font-weight: bold;');
                break;
        }
    }
}