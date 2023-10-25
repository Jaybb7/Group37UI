import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor() { }

  LogoutFlag:boolean = false;
  MatrimonialFlag:boolean = false;
  SocialFlag:boolean = false;
  ProfessionalFlag:boolean = false;
  ProfileFlag:boolean = false;
  MessageFlag:boolean = false;

}
