const COMMANDS = {
    LOAD: 'LOAD',
    LOAD_COMPLETE: 'LOAD_COMPLETE',
};

const preloadImageArray = (arr) => {
    const promiseArr = [];

    arr.forEach((imgUrl) => {
        promiseArr.push(new Promise((resolve) => {

            const request = new XMLHttpRequest();
            request.responseType = 'blob';
            request.onload = () => {
                resolve({
                    path: imgUrl,
                    status: 'ok',
                });
            };
            request.onerror = () => {
                resolve({
                    path: imgUrl,
                    status: 'error',
                });
            };
            request.open('GET', imgUrl, true);
            request.send();
        }));
    });
    return Promise.all(promiseArr);
};


this.addEventListener('message', (e) => {
    const { data } = e;
    switch (data.cmd) {
        case COMMANDS.LOAD:
            preloadImageArray(data.imageUrls).then(() => {
                this.postMessage({ cmd: COMMANDS.LOAD_COMPLETE });
            });
            break;
        default:
    }
});
