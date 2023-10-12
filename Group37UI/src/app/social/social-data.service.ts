import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class SocialDataService {
  private backendApiUrl = 'https://your-backend-api-url'; // Replace with your backend API URL

  constructor() {}

  // Fetch user profile from the backend or use dummy data
  getUserProfile(): Observable<any> {
    return new Observable<any>((observer:any) => {
      axios
        .get(`${this.backendApiUrl}/user-profile`)
        .then((response) => {
          observer.next(response.data);
        })
        .catch(() => {
          // If the API request fails, provide dummy data
          observer.next({ name: 'John Doe', bio: 'This is a sample bio', friends: ['Friend 1', 'Friend 2'] });
        });
    });
  }

  // Fetch posts from the backend or use dummy data
  getPosts(): Observable<any[]> {
    return new Observable<any[]>((observer:any) => {
      axios
        .get(`${this.backendApiUrl}/posts`)
        .then((response) => {
          observer.next(response.data);
        })
        .catch(() => {
          // If the API request fails, provide dummy data
          observer.next([
            {
              authorName: 'John Doe',
              authorImage: 'profile-image-url',
              content: 'This is a sample post content...',
            },
            {
              authorName: 'Jane Smith',
              authorImage: 'profile-image-url',
              content: 'Another dummy post...',
            },
            {
              authorName: 'Alice Johnson',
              authorImage: 'profile-image-url',
              content: 'Yet another post...',
            },
            {
              authorName: 'Bob Anderson',
              authorImage: 'profile-image-url',
              content: 'Sample post by Bob...',
            },
            {
              authorName: 'Eva Davis',
              authorImage: 'profile-image-url',
              content: 'A post from Eva...',
            },
            // Add more dummy posts here
          ]);
        });
    });
  }
}
