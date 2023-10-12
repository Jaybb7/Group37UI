import { Component } from '@angular/core';
import axios from 'axios'; // Import Axios

@Component({
  selector: 'app-questions-dashboard',
  templateUrl: './questions-dashboard.component.html',
  styleUrls: ['./questions-dashboard.component.css']
})
export class QuestionsDashboardComponent {
  questions: string[] = [];
  profileScore: number | null = null;

  fetchQuestionsAndCalculateScore() {
    // Replace 'your_openai_api_endpoint' with the actual API endpoint
    const openaiEndpoint = 'your_openai_api_endpoint';

    axios.get(openaiEndpoint)
      .then((response) => {
        const data = response.data;

        if (data.questions && data.questions.length > 0) {
          this.questions = data.questions;
        } else {
          // If no questions received from API, provide dummy questions
          this.questions = [
            'What is your favorite book?',
            'What is your dream vacation destination?',
            'Describe your ideal partner.',
            'What are your hobbies and interests?',
            'Share a memorable life experience.'
          ];
        }

        // Calculate profile score 
        this.calculateProfileScore();
      })
      .catch((error) => {
        console.error('Error fetching questions:', error);
      });
  }

  calculateProfileScore() {
    
    this.profileScore = 75; 
  }
}
