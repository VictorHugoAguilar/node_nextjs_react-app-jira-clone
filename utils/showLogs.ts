export type logType = 'info' | 'warn' | 'error';

export const showLogs = (type: logType = 'info', msg: string, obj?: any) => {
    const message = `[${new Date().toISOString()}] [${type.toUpperCase()}] ${msg} ${obj ? JSON.stringify(obj) : ''}`;

    switch (type) {
        case 'info':
            if (process.env.NEXT_PUBLIC_SHOW_LOGS === 'TRUE')
                console.log(`%c${message}`, 'color: #F6E40E; font-weight: bold;');
            break;
        case 'warn':
            if (process.env.NEXT_PUBLIC_SHOW_LOGS === 'TRUE')
                console.log(`%c${message}`, 'color: #FFF033; font-weight: bold;');
            break;
        case 'error':
            console.log(`%c${message}`, 'color: #F60E0E; font-weight: bold;');
            break;
        default:
            break;
    }
}