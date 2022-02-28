export const loadStore = (storeName:string) => {
    try {
        const serializedStore = localStorage.getItem(storeName);
        if (serializedStore === null) {
            return;
        }
        return JSON.parse(serializedStore);
    } catch (err) {
        console.log(err);
        return;
    }
}

export const saveStore = (storeName:string, data:any) => {
    try {
        const serializedStore = JSON.stringify(data);
        localStorage.setItem(storeName, serializedStore);
    } catch (err) {
        console.log(err);
    }
}

export const deleteStore = (storeName:string) => {
    try {
        localStorage.removeItem(storeName);
    } catch (err) {
        console.log(err);
    }
}