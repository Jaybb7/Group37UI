import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile.html',
  styleUrls: ['./profile.css']
})
export class ProfilePageComponent implements OnInit {
  userId!: number;
  apiResponse: any;
  constructor(private route: ActivatedRoute) {} 
    businessMatchesData: any = [
        {
          name: "John Doe",
          age: 30,
          occupation: "Engineer",
          
        },
        
      ];
    
      datingMatchesData: any = [
        {
          name: "Jane Smith",
          age: 25,
          occupation: "Designer",
          
        },
      
      ];
    
      socialMatchesData: any = [
        {
          name: "Alex Johnson",
          age: 28,
          occupation: "Social Media Manager",
         
        },
        
      ];
    
      potentialMatchesData: any = [
        {
          name: "Sarah Brown",
          age: 26,
          occupation: "Marketing Specialist",
         
        },
       
      ];
    
      exploreGroupsData: any = [
        {
          groupName: "Tech Enthusiasts",
          interest: "Technology",
          
        },
       
      ];
    
      companiesData: any = [
        {
          companyName: "ABC Corp",
          location: "New York",
          industry: "Technology",
          
        },
       
      ];
    
      jobFeedData: any = [
        {
          jobTitle: "Software Engineer",
          company: "XYZ Tech",
          location: "San Francisco",
         
        },
       
      ];
    
      chatData: any = [
        {
          name: "Alice Johnson",
          age: 29,
          occupation: "Marketing Manager",
          recentMessage: "Hi there!",
         
        },
       
      ];
    
      userProfileData: any = {
        fullName: "Your Name",
        age: 30,
        occupation: "Your Occupation",
       
      };
    
     

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const userIdParam = params.get('userId');
      if (userIdParam) {
        this.userId = +userIdParam; 
        
        
        this.fetchUserProfile();
        
      } else {
        console.error('UserId not provided in the route.');
      }
    });
    this.fetchBusinessMatches();
    this.fetchDatingMatches();
    this.fetchSocialMatches();
    this.fetchPotentialMatches();
    this.fetchExploreGroups();
    this.fetchCompanies();
    this.fetchJobFeed();
    this.fetchChat();
    this.fetchUserProfile();
  }

  fetchBusinessMatches() {
    axios.get('/api/business-matches')
      .then((response) => {
        this.businessMatchesData = response.data;
      })
      .catch((error) => {
        console.error('Failed to fetch business matches:', error);
        
        this.businessMatchesData = this.businessMatchesData; 
      });
  }

  fetchDatingMatches() {
    axios.get('/api/dating-matches')
      .then((response) => {
        this.datingMatchesData = response.data;
      })
      .catch((error) => {
        console.error('Failed to fetch dating matches:', error);
        this.datingMatchesData = this.datingMatchesData; 
      });
  }

  fetchSocialMatches() {
    axios.get('/api/social-matches')
      .then((response) => {
        this.socialMatchesData = response.data;
      })
      .catch((error) => {
        console.error('Failed to fetch social matches:', error);
        this.socialMatchesData = this.socialMatchesData; 
      });
  }

  fetchPotentialMatches() {
    axios.get('/api/potential-matches')
      .then((response) => {
        this.potentialMatchesData = response.data;
      })
      .catch((error) => {
        console.error('Failed to fetch potential matches:', error);
        this.potentialMatchesData = this.potentialMatchesData;
      });
  }

  fetchExploreGroups() {
    axios.get('/api/explore-groups')
      .then((response) => {
        this.exploreGroupsData = response.data;
      })
      .catch((error) => {
        console.error('Failed to fetch explore groups:', error);
        this.exploreGroupsData = this.exploreGroupsData; 
      });
  }

  fetchCompanies() {
    axios.get('/api/companies')
      .then((response) => {
        this.companiesData = response.data;
      })
      .catch((error) => {
        console.error('Failed to fetch companies:', error);
        this.companiesData = this.companiesData;
      });
  }

  fetchJobFeed() {
    axios.get('/api/job-feed')
      .then((response) => {
        this.jobFeedData = response.data;
      })
      .catch((error) => {
        console.error('Failed to fetch job feed:', error);
        this.jobFeedData = this.jobFeedData; 
      });
  }

  fetchChat() {
    axios.get('/api/chat')
      .then((response) => {
        this.chatData = response.data;
      })
      .catch((error) => {
        console.error('Failed to fetch chat data:', error);
        this.chatData = this.chatData; 
      });
  }

 
 

uploadProfilePhoto(event: any) {
    this.uploadPhoto(event, `/userprofile/uploadProfilePhoto/${this.userId}`);
}

uploadStatusPhoto(event: any) {
    this.uploadPhoto(event, `/userprofile/uploadStatusPhoto/${this.userId}`);
}

private uploadPhoto(event: any, url: string) {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);

    axios.post(url, formData)
      .then(response => {
        console.log('Photo uploaded successfully');
      })
      .catch(error => {
        console.error('Failed to upload photo:', error);
      });
}

fetchUserProfile() { 
    axios.get(`/userprofile/${this.userId}`)
      .then((response) => {
        this.userProfileData = response.data.data;
      })
      .catch((error) => {
        console.error('Failed to fetch user profile:', error);
        this.userProfileData = this.userProfileData; 
      });
}
generateAvatar(event: any) {
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