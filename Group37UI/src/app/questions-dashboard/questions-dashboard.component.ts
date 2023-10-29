import { Component, OnInit } from '@angular/core';
import axios from 'axios'; 
import { ActivatedRoute } from '@angular/router'; 

@Component({
  selector: 'app-questions-dashboard',
  templateUrl: './questions-dashboard.component.html',
  styleUrls: ['./questions-dashboard.component.css']
})
export class QuestionsDashboardComponent implements OnInit {
  questions: string[] = [];
  profileScore: number | null = null;
  userAnswers: { [key: string]: string } = {};
  currentPurpose: string | null = null;
  constructor(private route: ActivatedRoute) { } 
  testAnswer1: string | null = null;
  testAnswer2: string | null = null;
  testAnswer3: string | null = null;
  userId: string | null = null;
  rawApiResponse: any = null;

  updateUserAnswer(question: string, answer: string) {
    this.userAnswers[question] = answer;
  }
  
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.currentPurpose = params['purpose'];
      this.userId = params['userId'];
      this.fetchQuestions();
    });
  }

  fetchQuestions() {
    if (this.currentPurpose) {
      const openaiEndpoint = `http://localhost:8080/api/user-score/generate-questions/${this.userId}`;

      axios.post(openaiEndpoint)
        .then((response) => {
          const data = response.data;

          if (data && data.length > 0) {
            this.questions = data;
          } else {
            this.provideDummyQuestions();
          }
        })
        .catch((error) => {
          console.error('Error fetching questions:', error);
          this.provideDummyQuestions();
        });
    }
  }

  provideDummyQuestions() {
    this.questions = [
      'What is your favorite book?',
      'What is your dream vacation destination?',
      'Describe your ideal partner.'
    ];
  }

  calculateProfileScore() {
    
    this.profileScore = 75;
  }

  getProfileScore() {
 
    const answersArray = Object.keys(this.userAnswers).map((question) => {
      return encodeURIComponent(this.userAnswers[question]);
    });
  
 
    while (answersArray.length < 3) {
      answersArray.push('');
    }
  
    // Construct the URL with answers
    const openaiEndpoint = `http://localhost:8080/gcp/askGCP?purpose=${this.currentPurpose}&answer1=${answersArray[0]}&answer2=${answersArray[1]}&answer3=${answersArray[2]}&userId=${this.userId}`;
  
    axios.post(openaiEndpoint)
      .then((response) => {
        this.rawApiResponse = response.data;
        // this.profileScore = response.data.score;
      })
      .catch((error) => {
        console.error('Error fetching profile score:', error);
        // this.calculateProfileScore();
      });
  }
  
  
}
