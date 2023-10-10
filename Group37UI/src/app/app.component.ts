import { Component } from '@angular/core';
import { AuthService, User } from './services/Auth/auth.service';
import { UserService } from './services/User/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Group37UI';

  constructor(public readonly authService:AuthService, public userService:UserService){
  }

}
