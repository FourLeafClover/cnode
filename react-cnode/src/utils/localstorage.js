let getItem = (key) => {
    var data = window.localStorage.getItem(key);
    if (data) {
        var dataObj = JSON.parse(data);
        if (dataObj.type === "string") {
            return dataObj.data;
        } else if (dataObj.type === "number") {
            return Number(dataObj.data);
        } else if (dataObj.type === "object") {
            return JSON.parse(dataObj.data);
        } else {
            return null;
        }
    } else {
        return null;
    }
}

let setItem = (key, value) => {
    let data = {
        type: "",
        data: null
    }
    if (typeof (key) === "string") {
        data.type = 'string';
        data.data = value;
    } else if (typeof (key) === "number") {
        data.type = 'number';
        data.data = value;
    } else if (typeof (key) === "object") {
        data.type = 'object';
        data.data = JSON.stringify(value);
    } else {
        console.error('暂时只支持string,number,object对象');
    }
    window.localStorage.setItem(key, JSON.stringify(data));
}

let clearItem = (key) => {
    window.localStorage.setItem(key, "");
}

export default {
    getItem: getItem,
    setItem: setItem,
    clearItem: clearItem
}