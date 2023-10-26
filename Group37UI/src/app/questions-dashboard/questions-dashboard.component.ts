import { Component, OnInit } from '@angular/core';
import axios from 'axios'; 
import { ActivatedRoute } from '@angular/router'; // Import ActivatedRoute

@Component({
  selector: 'app-questions-dashboard',
  templateUrl: './questions-dashboard.component.html',
  styleUrls: ['./questions-dashboard.component.css']
})
export class QuestionsDashboardComponent implements OnInit {
  questions: string[] = [];
  profileScore: number | null = null;
  userAnswers: { [key: string]: string } = {};
  currentPurpose: string = "null";
  constructor(private route: ActivatedRoute) { } // Inject ActivatedRoute
  testAnswer1: string ="null";
  testAnswer2: string ="null";
  testAnswer3: string ="null";
  userId: string = "null";
  ngOnInit() {
    // Fetch purpose from the query parameters and then call fetchQuestions
    this.route.queryParams.subscribe(params => {
      this.currentPurpose = params['purpose'];
      this.userId = params['userId'];
      this.fetchQuestions();
    });
  }

  fetchQuestions() {
    const openaiEndpoint = `http://localhost:8080/ai/generateQuestions?purpose=${this.currentPurpose}`;

    axios.get(openaiEndpoint)
      .then((response) => {
        const data = response.data;

        if (data.questions && data.questions.length > 0) {
          this.questions = data.questions;
        } else {
          this.provideDummyQuestions();
        }
      })
      .catch((error) => {
        console.error('Error fetching questions:', error);
        this.provideDummyQuestions();
      });
  }

  provideDummyQuestions() {
    this.questions = [
      'What is your favorite book?',
      'What is your dream vacation destination?',
      'Describe your ideal partner.'
    ];
  }

  calculateProfileScore() {
    // Calculate profile score (dummy score for demonstration purposes)
    this.profileScore = 75;
  }

  getProfileScore() {
    // Replace 'your_openai_api_endpoint' with the actual API endpoint for sending user answers
    const openaiEndpoint = `http://localhost:8080/gcp/askGCP?purpose=${this.currentPurpose}&answer1=${this.testAnswer1}&answer2=${this.testAnswer2}&answer3=${this.testAnswer3}&userId=${this.userId}`;

    axios.post(openaiEndpoint)
      .then((response) => {
        this.profileScore = response.data.score;
      })
      .catch((error) => {
        console.error('Error fetching profile score:', error);
        this.calculateProfileScore();
      });
  }
}
