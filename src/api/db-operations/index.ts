import * as pg from 'pg';

const config = {
    host: 'devglossatronic.cdbce3pkmmcm.us-east-2.rds.amazonaws.com',
    user: 'gtAdmin',
    database: 'glossatronic',
    password: 'polyglottery',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 30000,
};

export const pool = new pg.Pool(config);

export function processRequest(query, response, expectSingle) {
        pool.connect()
        .then(client => {
            client.query(query, null)
                .then ( queryResult => {
                    sendSuccessResult(client, queryResult, response, expectSingle);
                })
                .catch ( error => {
                    sendErrorResult(client, error, response);
                })
        })
}
export function processParameterizedRequest(query, params, response, expectSingle) {
        pool.connect()
        .then(client => {
            client.query(query, params)
                .then ( queryResult => {
                    sendSuccessResult(client, queryResult, response, expectSingle);
                })
                .catch ( error => {
                    sendErrorResult(client, error, response);
                })
        })
}

export function getRequestResult(query, params, response, callback): any {

    pool.connect()
    .then(client => {
        client.query(query, params)
            .then (queryResult => {
                console.log(queryResult);
                console.log(queryResult.rows[0].user_id)
                // client.release();
                callback(queryResult.rows);
            })
            .catch ( error => {
                sendErrorResult(client, error, response);
                })

    })
}

export function sendPreparedResult(preparedResult, response): any {
    
    response.status(200)
        .send({
            message: 'Success',
            status: response.status,
            result: preparedResult
        });
}

export function sendSuccessResult (client, result, response, expectSingle) {

    let returnValue = (expectSingle) ? result.rows[0] : result.rows;

    client.release();

    response.status(200)
        .send({
            message: 'Success',
            status: response.status,
            result: returnValue
        });
}

export function sendErrorResult (client, errorResult, response) {

    client.release()

    response.status(500)
        .send({
            message: 'Failure',
            status: response.status,
            error: errorResult.message
        })
}

export const USER_VIEW = 'app_user';

export const userViewSelectQuery = `select * from ${USER_VIEW}`;
