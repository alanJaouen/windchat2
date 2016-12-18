import {Component, OnInit} from '@angular/core';
import { Router} from "@angular/router";


declare const FB:any;

@Component({
    selector: 'facebook-login',
    template: ` <div>
                    <button class="btn btn-lg btn-social btn-facebook" style="font-size: 1.5em;" (click)="onFacebookLoginClick()">
                        <i class="fa fa-facebook fa-fw"></i>Sign in with Facebook
                    </button>
                </div>` 
})

export class FBComponent implements OnInit {

    constructor() {
        FB.init({
            appId      : '347077622340424',
            cookie     : false,  // enable cookies to allow the server to access
                                // the session
            xfbml      : true,  // parse social plugins on this page
            version    : 'v2.5' // use graph api version 2.5
        });
    }

    onFacebookLoginClick() {
        FB.login();
    }

    statusChangeCallback(resp) {
        if (resp.status === 'connected') {
            // connect here with your server for facebook login by passing access token given by facebook
            console.log(resp);
            console.log('Welcome!  Fetching your information.... ');
            FB.api('/me', function(response) {
                console.log(response);
            console.log('Successful login for: ' + response.name);
            document.getElementById('status').innerHTML =
                'Thanks for logging in, ' + response.name + '!';
            });
       }else if (resp.status === 'not_authorized') {
            alert("Connection refused by Facebook");
        }else {
            alert("Unknow error append");            
        }
    };
    ngOnInit() {
        FB.getLoginStatus(response => {
            this.statusChangeCallback(response);
        });
    }
}