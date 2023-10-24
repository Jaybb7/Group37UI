import { Component, OnInit } from '@angular/core';
import axios from 'axios'; // Import Axios

@Component({
  selector: 'app-personal-info',
  templateUrl: './settings-personal-bio.html',
  styleUrls: ['./settings-personal-bio.css']
})
export class PersonalInfoComponent implements OnInit {
  personalData: any; // Variable to store personal data

  constructor() {}

  ngOnInit(): void {
    // Call a function to fetch data from the backend
    this.fetchPersonalData();
  }

  fetchPersonalData() {
    // Replace 'your-backend-api-url' with the actual backend API URL
    axios.get('your-backend-api-url')
      .then((response) => {
        this.personalData = response.data;
      })
      .catch((error) => {
        // Handle the scenario when the function can't access the backend
        console.error('Error fetching data:', error);

        // For demonstration purposes, you can provide dummy data here
        this.personalData = {
          email: 'dummy@example.com',
          number: '1234567890',
          location: 'Dummy Location',
          occupation: 'Dummy Occupation',
          age: 30,
          fullName: 'John Doe'
        };
      });
  }
}
