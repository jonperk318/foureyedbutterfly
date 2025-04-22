export const execute = async (db, q, params = []) => {
    if (params && params.length > 0) {
        return new Promise((resolve, reject) => {
            db.run(q, params, (err) => {
                if (err) reject(err);
                resolve();
            });
        });
    };
    return new Promise((resolve, reject) => {
        db.exec(q, (err) => {
            if (err) reject(err);
            resolve();
        });
    });

};
