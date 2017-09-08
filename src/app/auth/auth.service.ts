
import {Injectable} from "@angular/core";
import Auth0Lock from 'auth0-lock';

import {Router} from "@angular/router";
import {gtConfig} from "./auth.config";
import {userInfo} from "os";


import {Store} from "@ngrx/store";
import {State} from '../store/reducer.index';
import {LoginUserAction} from '../store/user/user.actions';
import {tokenNotExpired} from 'angular2-jwt';



@Injectable()
export class AuthService {

    lock = new Auth0Lock(
        gtConfig.clientID,
        gtConfig.domain,
        {
            allowedConnections: ['Username-Password-Authentication'],
            avatar: null,
            theme: {
                primaryColor: "#126AD1",
                foregroundColor: "#000000",
                logo: "https://materialthoughts.files.wordpress.com/2017/09/glossatronic-logo.png"
            },
            languageDictionary: {
                title: "Glossatronic"
            },
            auth: {
                responseType     : 'token',
                requires_username: true,
                usernameStyle    : 'username',
                redirect:       false
            }
        },
    );


    constructor(private router: Router, private store: Store<State>) {


        this.lock.on('authenticated', (authResult) => {
            localStorage.setItem("token", authResult.idToken);

            this.lock.getUserInfo(authResult.accessToken, (error, profile) => {
                const email = profile["email"];
                localStorage.setItem("profile", JSON.stringify(profile));
                localStorage.setItem("loginEmail", JSON.stringify(profile["email"]));
                this.loadUserData();
            });

        })
    }


    public loadUserData() {
        const email: string = JSON.parse(localStorage.getItem("loginEmail"));

        this.store.dispatch(new LoginUserAction(email));
        this.router.navigate(['glossary']);
    }

    public getUserInfo() {
        return userInfo;
    }

    public login() {
        if (this.isAuthenticated()) {
            this.loadUserData();
        } else {
            this.lock.show();
        }

    }

    public logout() {
       localStorage.removeItem('token');
       localStorage.removeItem('loginEmail');
       localStorage.removeItem('profile');
       this.router.navigate(['login']);
    }

    public isAuthenticated() {
        return tokenNotExpired();
    }
}

