import { Component, OnInit } from '@angular/core';
import { AvatarGenerationService } from './avatar-generation.service';
import { HttpClient } from '@angular/common/http';
import axios from 'axios';


@Component({
  selector: 'app-avatar-dashboard',
  templateUrl: './avatar-creation.component.html',
})
export class AvatarGenerationServiceComponent implements OnInit {
  userProfile: any;

  apiResponse: any;

  constructor(private avatarService: AvatarGenerationService ) { }

  ngOnInit(): void {
    // Attempt to fetch user profile from the backend
    this.avatarService.getUserProfile().subscribe((profile) => {
      this.userProfile = profile;
    });
    this.apiResponse = '';
  }

  onUploadButtonClick() {
    const fileInput = document.getElementById('profile-picture-upload') as HTMLInputElement;

    if (fileInput.files && fileInput.files.length > 0) {
      const selectedFile = fileInput.files[0];
      const reader = new FileReader();

      reader.onload = (event) => {
        if (event.target == null) {
          return;
        }
        var base64Image = event.target.result as string;
        base64Image = base64Image.split(',')[1];

        // Make an HTTP GET request to the REST API
        axios.post('http://localhost:8080/avatar/generate', base64Image, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
            .then(response => {
              const res = response.data.replace(/\\/g, "");
                console.log('Avatar generated. Image URL:', res);
                this.apiResponse = res;
            })
            .catch(error => {
                console.error('Failed to generate avatar:', error);
            });
       
      };

      reader.readAsDataURL(selectedFile);
    }

  }
}
