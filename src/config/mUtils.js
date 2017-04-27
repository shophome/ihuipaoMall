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

/**
 * 获取cookie值
 */
export const getCookie = name => {
    var arr,reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    let cookie = document.cookie;
    // let cookie = 'ihuipao_auth=127a8GuuVhMF%2FeVI%2BV1NfdAyWUsYt7D9DfS8aX9cixUYNA9fLppsU2Pn; Hm_lvt_d639e31d3fd7a558c47f51e1604d31fe=1492232831,1492566274,1492651474,1492738509; Hm_lpvt_d639e31d3fd7a558c47f51e1604d31fe=1492745300; PHPSESSID=vmu19r8peb09oevp2utrtlb0h4; user_id=204714; is_distribut=1; uname=%25E8%2593%259D%25E8%2589%25B2frank; is_mobile=1';
    if(arr = cookie.match(reg)) {
        return unescape(arr[2]); 
    } else {
        return null; 
    }
}