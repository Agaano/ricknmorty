export default (search?: string): {[key: string]: string} => {
    if (!search) return {};
    const itemsArray = search.split("&");
    const obj:any = {};
    itemsArray.forEach((item) => {
        const [key, value] = item.split("=")
        obj[key] = value;
    })
    return obj;
}