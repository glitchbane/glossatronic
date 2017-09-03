// export class User {
//     constructor(public _id: string = null,
//                 public authId: string = null,
//                 public email: string,
//                 public created?: Date,
//                 public firstName?: string,
//                 public lastName?: string,
//                 public country?: string,
//                 public stateProvince?: string,
//                 public city?: string,
//                 public zipCode?: string,
//                 public ravelryName?: string,
// ) {}
// }


export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;

}

export interface UserData {
    user_id: number;
    first_name: string;
    last_name: string;
    email: string;
}