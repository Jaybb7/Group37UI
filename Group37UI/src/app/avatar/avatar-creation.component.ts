import { Component, OnInit } from '@angular/core';
import { AvatarGenerationService } from './avatar-generation.service';

@Component({
  selector: 'app-avatar-dashboard',
  templateUrl: './avatar-creation.component.html',
})
export class AvatarGenerationServiceComponent implements OnInit {
  userProfile: any;

  constructor(private avatarService: AvatarGenerationService ) { }

  ngOnInit(): void {
    // Attempt to fetch user profile from the backend
    this.avatarService.getUserProfile().subscribe((profile) => {
      this.userProfile = profile;
    });

  }
}
