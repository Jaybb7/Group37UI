import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { DUMMY_IMAGE } from 'src/environment';

@Component({
  selector: 'app-matrimonial',
  templateUrl: './matrimonial-dashboard.component.html',
  styleUrls: ['./matrimonial.css']
})
export class MatrimonialComponent implements OnInit {
  matrimonialProfile: any = {}; 
  similarProfiles: any[] = []; 

  constructor() { }

  ngOnInit() {
    this.loadMatrimonialProfile();
    this.loadSimilarProfiles();
  }

  loadMatrimonialProfile() {
   
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
    
    axios.get('YOUR_API_BASE_URL/similar-profiles')
      .then((response) => {
        this.similarProfiles = response.data;
      })
      .catch((error) => {
        console.error('Error fetching similar profiles:', error);
      });
  }

  sendMessage() {
   
  }
}
