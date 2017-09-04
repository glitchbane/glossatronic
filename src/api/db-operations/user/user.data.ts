
import * as db from '../../db-operations/';
import { Request, Response} from 'express';

let params: string[] = [];
let query: string = '';
let expectSingleRowResult: boolean = false;
let userIdPredicate = ' where user_id = $1';

export function GetUser(request: Request, response: Response): any {
if (!request.params.id) {
    LoginUser(request, response);
} else {

        params = [request.params.id];
        query = db.userViewSelectQuery.concat(userIdPredicate);
        expectSingleRowResult = true;

        db.processParameterizedRequest(query, params, response, expectSingleRowResult);
    }
}


export function LoginUser(request: Request, response: Response): any {

    params = [request.query['email']];
    query = db.userViewSelectQuery.concat(' where user_email = $1');
    expectSingleRowResult = true;

    db.processParameterizedRequest(query, params, response, expectSingleRowResult);

}

export function GetAllUsers(request: Request, response: Response) {
    if (request.query['email']) {
        return LoginUser(request, response);
    }
    params = [];
    query = db.userViewSelectQuery;
    expectSingleRowResult = false;

    db.processParameterizedRequest(query, params, response, expectSingleRowResult);
}

export function CreateUser(request:Request , response: Response) {
    params = [request.body.userName, request.body.userEmail];
    query = userInsertQuery;
    expectSingleRowResult = true;

    db.processParameterizedRequest(query, params, response, expectSingleRowResult);
}

const USER_TABLE = 'app_user';


const userInsertQuery = `insert into ${USER_TABLE} (first_name, email) values ($1, $2) returning user_id`;
const userUpdateQuery = `update ${USER_TABLE} set email = $1 where user_id = $2`;
const userDeleteQuery = `delete from ${USER_TABLE} where user_id = $1`;
