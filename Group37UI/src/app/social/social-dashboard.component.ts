import { Component, OnInit } from '@angular/core';
import { SocialDataService } from './social-data.service';

@Component({
  selector: 'app-social-dashboard',
  templateUrl: './social-dashboard.component.html',
  styleUrls: ['./social-dashboard.component.css']
})
export class SocialDashboardComponent implements OnInit {
  userProfile: any;
  posts: any[] = [];

  constructor(private socialDataService: SocialDataService) { }

  ngOnInit(): void {
    // Attempt to fetch user profile from the backend
    this.socialDataService.getUserProfile().subscribe((profile) => {
      this.userProfile = profile;
    });

    // Attempt to fetch posts from the backend
    this.socialDataService.getPosts().subscribe((posts) => {
      this.posts = posts;
    });
  }
}
