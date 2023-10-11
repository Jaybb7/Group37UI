import { Injectable } from "@angular/core";
import { AuthConfig, OAuthService } from "angular-oauth2-oidc";

const oAuthConfig:AuthConfig={
  issuer:'https://accounts.google.com',
  strictDiscoveryDocumentValidation:false,
  redirectUri: window.location.origin,
  clientId:'664760953066-u4vee7n6kt6ieqrhdegq8tqb3ur96n2j.apps.googleusercontent.com',
  scope:'openid profile email'
}

@Injectable({
  providedIn: "root",
})
export class AuthService {

  userInfo!: User;

  constructor(public readonly oAuthService:OAuthService) {
    oAuthService.configure(oAuthConfig);
    oAuthService.logoutUrl = 'https://www.google.com/accounts/Logout';
    oAuthService.loadDiscoveryDocument().then(()=>{
      oAuthService.tryLoginImplicitFlow().then(()=>{
        if(!oAuthService.hasValidAccessToken()){
          oAuthService.initLoginFlow();
          oAuthService.loadUserProfile().then((userProfile)=>{
            this.userInfo = userProfile as User;
          })
        }else{
          oAuthService.loadUserProfile().then((userProfile)=>{
            this.userInfo = userProfile as User;
          })
        }
      })
    })
  }

  isLoggedIn():boolean{
    return this.oAuthService.hasValidAccessToken();
  }

  signOut(){
    this.oAuthService.logOut();
  }

}

export interface User {
  info: {
    at_hash: string;
    aud: string;
    azp: string;
    email: string;
    email_verified: boolean;
    exp: number;
    family_name: string;
    given_name: string;
    iat: number;
    iss: string;
    jti: string;
    locale: string;
    name: string;
    nbf: number;
    nonce: string;
    picture: string;
    sub: string;
  };
}


