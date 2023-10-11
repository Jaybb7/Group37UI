import { Injectable } from '@angular/core';
import { AuthService, User } from '../Auth/auth.service';
import axios from 'axios';
import { STORE_USER_IN_DATABSE } from 'src/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public authService:AuthService) { }

  checkUserPurposeOfVisit(purpose:string){
    this.persistUser(purpose);
  }

  persistUser(purpose:string){
    const requestData = {
      name: this.authService.userInfo.info.name as string,
      email: this.authService.userInfo.info.email as string,
      purpose:purpose
    };
    axios.get(STORE_USER_IN_DATABSE, {
      params: requestData,
    })
    .then((response) => {
      console.log("response",response);
    })
    .catch((error) => {
      console.log("error",error);
    });
  }

}
