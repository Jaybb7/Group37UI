import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { DUMMY_IMAGE } from 'src/environment';

@Component({
  selector: 'app-matrimonial',
  templateUrl: './matrimonial-dashboard.component.html',
  styleUrls: ['./matrimonial.css']
})
export class MatrimonialComponent implements OnInit {
  matrimonialProfile: any = {}; // Initialize with an empty profile
  similarProfiles: any[] = []; // Initialize with an empty array

  constructor() { }

  ngOnInit() {
    this.loadMatrimonialProfile();
    this.loadSimilarProfiles();
  }

  loadMatrimonialProfile() {
    // Fetch the matrimonial profile from the API (replace '1' with the actual profile ID)
    axios.get('YOUR_API_BASE_URL/matrimonial/1')
      .then((response) => {
        this.matrimonialProfile = response.data;
      })
      .catch((error) => {
        //dummy data
        this.matrimonialProfile = 
        {age : 25, 
          name : 'John Doe', 
          bio : 'This is a sample bio', 
          profileImageUrl : DUMMY_IMAGE,
          friends : ['Friend 1', 'Friend 2'],  }
      });
  }

  loadSimilarProfiles() {
    // Fetch similar profiles from the API (you can specify criteria)
    axios.get('YOUR_API_BASE_URL/similar-profiles')
      .then((response) => {
        this.similarProfiles = response.data;
      })
      .catch((error) => {
        console.error('Error fetching similar profiles:', error);
      });
  }

  sendMessage() {
    // Implement sending messages to matrimonial profiles
    // You can use the matrimonialProfile data for sending messages
  }
}
