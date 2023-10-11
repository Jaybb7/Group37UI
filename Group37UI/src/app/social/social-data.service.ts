import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of,catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocialDataService {
  private backendApiUrl = 'https://your-backend-api-url'; // Replace with your backend API URL

  constructor(private http: HttpClient) { }

  // Fetch user profile from the backend or use dummy data
  getUserProfile(): Observable<any> {
    return this.http.get<any>(`${this.backendApiUrl}/user-profile`).pipe(
      catchError(() => {
        // If the API request fails, provide dummy data
        return of({ name: 'John Doe', bio: 'This is a sample bio', friends: ['Friend 1', 'Friend 2'] });
      })
    );
  }

  // Fetch posts from the backend or use dummy data
  getPosts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.backendApiUrl}/posts`).pipe(
      catchError(() => {
        // If the API request fails, provide dummy data
        return of([
          {
            authorName: 'John Doe',
            authorImage: 'profile-image-url',
            content: 'This is a sample post content...',
          },
          // Add more dummy posts here
        ]);
      })
    );
  }
}
