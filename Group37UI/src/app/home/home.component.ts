import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/Auth/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserService } from '../services/User/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  purposeForm!:FormGroup;

  constructor(public userService:UserService, public router:Router, public formBuilder:FormBuilder){

  }

  ngOnInit(): void {
    this.purposeForm = this.formBuilder.group({
    purpose :['', Validators.required]
  });
  }

  onSubmit(){
    const selectedPurpose=this.userService.checkUserPurposeOfVisit(this.purposeForm.get('purpose')!.value);
    console.log(selectedPurpose)
    this.router.navigate(['/questions'], { queryParams: { purpose: selectedPurpose } });
  }

}
