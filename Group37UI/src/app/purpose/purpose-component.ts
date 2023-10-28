import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-purpose',
  templateUrl: './purpose.html',
  styleUrls: ['./purpose.css']
})
export class PurposeComponent {
  constructor(private router: Router) {}

  navigateToQuestions() {
    this.router.navigate(['/questions']);
  }
}
