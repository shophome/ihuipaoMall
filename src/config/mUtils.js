/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
    if (!name) return;
    if (typeof content !== 'string') {
        content = JSON.stringify(content);
    }
    window.localStorage.setItem(name, content);
}

/**
 * 获取localStorage
 */
export const getStore = name => {
    if (!name) return;
    return window.localStorage.getItem(name);
}

/**
 * 删除localStorage
 */
export const removeStore = name => {
    if (!name) return;
    window.localStorage.removeItem(name);
}

/**
 * 拷贝对象
 */

export const Clone = myObj => { 

    if(typeof(myObj) != 'object') {
        return myObj; 
    }
    if(myObj == null) {
        return myObj;
    }
    var myNewObj = new Object(); 
    for(var i in myObj) {
        myNewObj[i] = Clone(myObj[i]); 
    }
    return myNewObj; 
}