const debounce = (fn: (value: any) => void, time: number) => {
    let timeout: number;

    return (value: any) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn(value), time);
    };
};

export default debounce;
