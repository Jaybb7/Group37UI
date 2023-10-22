import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class AvatarGenerationService {
  private backendApiUrl = 'http://localhost:8080';

  
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
}
