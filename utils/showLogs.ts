export type logType = 'info' | 'warn' | 'error';

export const showLogs = (type: logType = 'warn', msg: string, obj?: any) => {
    const message = `[${new Date().toISOString()}] [${type.toUpperCase()}] ${msg} ${obj ? JSON.stringify(obj) : ''}`;

    switch (type) {
        case 'info':
            if (process.env.NEXT_PUBLIC_SHOW_LOGS === 'INFO')
                console.log(`%c${message}`, 'color: #1CF60E;');
            break;
        case 'warn':
            console.log(`%c${message}`, 'color: #FFF033; ');
            break;
        case 'error':
            console.log(`%c${message}`, 'color: #F60E0E; font-weight: bold;');
            break;
        default:
            break;
    }
}