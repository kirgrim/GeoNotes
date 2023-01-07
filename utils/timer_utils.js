export const getTimestamp = (date=null) => {
    date = date || new Date();
    return Math.floor(date.getTime()/1000);
}

export const sleep = (time) => new Promise((resolve) => setTimeout(() => resolve(), time));
