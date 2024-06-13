export const getTime = (date: Date): string => {
    const minutes = (Date.now() - date.getTime())/60000;
    if (minutes < 1) {
        return 'a minute ago'
    }
    if (minutes < 60) {
        return `${minutes.toFixed()} min ago`
    }
    if (minutes < 1440) {
        return `${(minutes / 60).toFixed()} h ago`
    }
    if(minutes < 2880){
        return `yesterday`
    }
    return date.toLocaleDateString();
}