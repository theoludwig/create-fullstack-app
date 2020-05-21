const { ncp } = require("ncp");

function copyDirPromise(source, destination) {
    return new Promise((next) => {
        ncp(source, destination, (error) => {
            if (error) return next(error);
            next();
        });
    });
}

module.exports = copyDirPromise;