import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor() { }

  LogoutFlag:boolean = false;
  DashboardFlag:boolean = false;
  ProfileFlag:boolean = false;

}
