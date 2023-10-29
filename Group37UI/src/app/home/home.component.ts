import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/Auth/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  purposeForm!: FormGroup;

  constructor(public authService: AuthService, public router: Router, public formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
    this.purposeForm = this.formBuilder.group({
      purpose: ['', Validators.required]
    });
  }

  onSubmit() {
    const selectedPurpose = this.purposeForm.get('purpose')!.value;

    // Get the userId from the AuthService
    const userId = this.authService.getUserId();

    // Check if userId is available before navigating
    if (userId) {
      this.router.navigate(['/questions'], {
        queryParams: {
          purpose: selectedPurpose,
          userId: userId
        }
      });
    } else {
      // Handle the case where userId is not available (user is not authenticated)
      // You can display an error message or take appropriate action here.
    }
  }
}
