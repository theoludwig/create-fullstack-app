import { ncp } from "ncp";

function copyDirPromise(source: string, destination: string) {
    return new Promise((next) => {
        ncp(source, destination, (error) => {
            if (error) return next(error);
            next();
        });
    });
}

export default copyDirPromise;