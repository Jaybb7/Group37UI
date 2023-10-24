import { Component, OnInit } from '@angular/core';
import axios from 'axios'; // Import Axios

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile.html',
  styleUrls: ['./profile.css']
})
export class ProfilePageComponent implements OnInit {
    businessMatchesData: any = [
        {
          name: "John Doe",
          age: 30,
          occupation: "Engineer",
          // Add other properties as needed
        },
        // Add more business matches data objects as needed
      ];
    
      datingMatchesData: any = [
        {
          name: "Jane Smith",
          age: 25,
          occupation: "Designer",
          // Add other properties as needed
        },
        // Add more dating matches data objects as needed
      ];
    
      socialMatchesData: any = [
        {
          name: "Alex Johnson",
          age: 28,
          occupation: "Social Media Manager",
          // Add other properties as needed
        },
        // Add more social matches data objects as needed
      ];
    
      potentialMatchesData: any = [
        {
          name: "Sarah Brown",
          age: 26,
          occupation: "Marketing Specialist",
          // Add other properties as needed
        },
        // Add more potential matches data objects as needed
      ];
    
      exploreGroupsData: any = [
        {
          groupName: "Tech Enthusiasts",
          interest: "Technology",
          // Add other properties as needed
        },
        // Add more explore groups data objects as needed
      ];
    
      companiesData: any = [
        {
          companyName: "ABC Corp",
          location: "New York",
          industry: "Technology",
          // Add other properties as needed
        },
        // Add more companies data objects as needed
      ];
    
      jobFeedData: any = [
        {
          jobTitle: "Software Engineer",
          company: "XYZ Tech",
          location: "San Francisco",
          // Add other properties as needed
        },
        // can Add more job feed data objects as needed
      ];
    
      chatData: any = [
        {
          name: "Alice Johnson",
          age: 29,
          occupation: "Marketing Manager",
          recentMessage: "Hi there!",
          // can Add other properties as needed
        },
        // can Add more chat data objects as needed
      ];
    
      userProfileData: any = {
        fullName: "Your Name",
        age: 30,
        occupation: "Your Occupation",
        // can Add other properties as needed
      };
    
     

  ngOnInit() {
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
        // Use hardcoded data as a fallback
        this.businessMatchesData = this.businessMatchesData; // Replace with hardcoded data
      });
  }

  fetchDatingMatches() {
    axios.get('/api/dating-matches')
      .then((response) => {
        this.datingMatchesData = response.data;
      })
      .catch((error) => {
        console.error('Failed to fetch dating matches:', error);
        this.datingMatchesData = this.datingMatchesData; // Replace with hardcoded data
      });
  }

  fetchSocialMatches() {
    axios.get('/api/social-matches')
      .then((response) => {
        this.socialMatchesData = response.data;
      })
      .catch((error) => {
        console.error('Failed to fetch social matches:', error);
        this.socialMatchesData = this.socialMatchesData; // Replace with hardcoded data
      });
  }

  fetchPotentialMatches() {
    axios.get('/api/potential-matches')
      .then((response) => {
        this.potentialMatchesData = response.data;
      })
      .catch((error) => {
        console.error('Failed to fetch potential matches:', error);
        this.potentialMatchesData = this.potentialMatchesData; // Replace with hardcoded data
      });
  }

  fetchExploreGroups() {
    axios.get('/api/explore-groups')
      .then((response) => {
        this.exploreGroupsData = response.data;
      })
      .catch((error) => {
        console.error('Failed to fetch explore groups:', error);
        this.exploreGroupsData = this.exploreGroupsData; // Replace with hardcoded data
      });
  }

  fetchCompanies() {
    axios.get('/api/companies')
      .then((response) => {
        this.companiesData = response.data;
      })
      .catch((error) => {
        console.error('Failed to fetch companies:', error);
        this.companiesData = this.companiesData; // Replace with hardcoded data
      });
  }

  fetchJobFeed() {
    axios.get('/api/job-feed')
      .then((response) => {
        this.jobFeedData = response.data;
      })
      .catch((error) => {
        console.error('Failed to fetch job feed:', error);
        this.jobFeedData = this.jobFeedData; // Replace with hardcoded data
      });
  }

  fetchChat() {
    axios.get('/api/chat')
      .then((response) => {
        this.chatData = response.data;
      })
      .catch((error) => {
        console.error('Failed to fetch chat data:', error);
        this.chatData = this.chatData; // Replace with hardcoded data
      });
  }

  fetchUserProfile() {
    axios.get('/api/user-profile')
      .then((response) => {
        this.userProfileData = response.data;
      })
      .catch((error) => {
        console.error('Failed to fetch user profile:', error);
        this.userProfileData = this.userProfileData;
      });
  }
}