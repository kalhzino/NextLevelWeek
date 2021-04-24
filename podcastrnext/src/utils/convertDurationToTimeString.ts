export function convertDurationToTimeString(duration: number): string {
    const hour = Math.floor(duration / (60 * 60));
    const minutes = Math.floor((duration % 3600)/60);
    const seconds = duration % 60;
    
    const finalResult = [hour, minutes, seconds]
        .map(unit => String(unit).padStart(2, '0'))
        .join(':')
    return finalResult;
}