export const retryAsync = (times, asyncFn, ...args) => {
    if (arguments.length < 2) {
        return retryAsync.bind(null, times);
    }

    return new Promise((resolve, reject) => {
        let attempts = 0;

        const invokeFn = () =>
            asyncFn(...args)
                .then(r => resolve(r))
                .catch(err => {
                    if (++attempts > times) {
                        reject(err);
                    } else {
                        invokeFn();
                    }
                });

        invokeFn();
    });
};

export const retry = (times, fn, ...args) => {
    if (arguments.length < 2) {
        return retry.bind(null, times);
    }

    let attempts = 0;
    while (true) {
        try {
            return fn(...args);
        } catch (err) {
            if (++attempts > times) {
                throw err;
            }
        }
    }
};

export default retry;