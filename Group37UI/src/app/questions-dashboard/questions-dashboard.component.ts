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
  userAnswers: { [key: string]: string } = {};

  fetchQuestions() {
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
      })
      .catch((error) => {
        // If the API call fails, provide dummy questions
        console.error('Error fetching questions:', error);
        this.questions = [
          'What is your favorite book?',
          'What is your dream vacation destination?',
          'Describe your ideal partner.',
          'What are your hobbies and interests?',
          'Share a memorable life experience.'
        ];
      });
  }

  calculateProfileScore() {
    // Calculate profile score (dummy score for demonstration purposes)
    this.profileScore = 75;
  }
  userAnswersComplete: boolean = false;


  getProfileScore() {
    // Replace 'your_openai_api_endpoint' with the actual API endpoint for sending user answers
    const openaiEndpoint = 'your_openai_api_endpoint';

    // Replace this with code to send user answers to the API
    axios.post(openaiEndpoint, { answers: this.userAnswers })
      .then((response) => {
        // If successful, set the profile score from the API response
        this.profileScore = response.data.score;
      })
      .catch((error) => {
        // If the API call fails, call the calculateProfileScore function with a dummy score
        console.error('Error fetching profile score:', error);
        this.calculateProfileScore();
      });
  }
}
