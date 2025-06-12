const debounce = (func , timer) => {
    let timeoutId;
    return function(...args){
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(this , args)
        } , timer)
    }
}

export default debounce;