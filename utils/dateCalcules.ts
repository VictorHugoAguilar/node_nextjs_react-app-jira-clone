export const calculateElapsedTime = (fromDate: number) => {
    const now = new Date().getTime();
    const diff = now - fromDate;

    const seconds = Math.floor(diff / (1000));
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
        return `${days} días`;
    }

    if (hours > 0) {
        return `${hours} horas`;
    }

    if (minutes > 0) {
        return `${minutes} minutos`;
    }

    if (seconds > 0) {
        return `${seconds} segundos`;
    }

    return `${diff} milisegundos`;
}