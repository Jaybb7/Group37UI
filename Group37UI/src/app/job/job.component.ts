import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-job-dashboard',
  templateUrl: './job.html',
  styleUrls: ['./job.css'],
})
export class JobDashboardComponent implements OnInit {
  userProfile: any;
  jobPosts: any[] = [];
  connections: string[] = [];
  newJobPostForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.newJobPostForm = this.formBuilder.group({
      newJobPostContent: [''],
    });
  }

  ngOnInit(): void {
    // Fetch user profile from the backend using Axios
    axios
      .get('/api/user/profile')
      .then((response) => {
        this.userProfile = response.data;
      })
      .catch((error) => {
        console.error('Error fetching user profile:', error);
        // Handle error - Display dummy data for demo purposes
        this.userProfile = {
          userName: 'John Doe',
          jobTitle: 'Software Engineer',
          profileImageUrl: 'dummy-profile-image-url',
        };
      });

    // Fetch job posts from the backend using Axios
    axios
      .get('/api/job-posts')
      .then((response) => {
        this.jobPosts = response.data;
      })
      .catch((error) => {
        console.error('Error fetching job posts:', error);
        // Handle error - Display dummy data for demo purposes
        this.jobPosts = [
          {
            jobTitle: 'Software Developer',
            companyName: 'ABC Tech',
            jobDescription: 'Job description for software developer position.',
          },
          {
            jobTitle: 'Data Analyst',
            companyName: 'XYZ Corp',
            jobDescription: 'Job description for data analyst position.',
          },
        ];
      });

    // Fetch connections or network from the backend using Axios
    axios
      .get('/api/connections')
      .then((response) => {
        this.connections = response.data;
      })
      .catch((error) => {
        console.error('Error fetching connections:', error);
        // Handle error - Display dummy data for demo purposes
        this.connections = ['Connection 1', 'Connection 2', 'Connection 3'];
      });
  }

  // Function to create a new job post
  createJobPost() {
    const newJobPostContent = this.newJobPostForm.value.newJobPostContent;

    if (!newJobPostContent) {
      return;
    }

    // Send a POST request to your backend to create the job post
    axios
      .post('/api/job-posts', { jobDescription: newJobPostContent })
      .then((response) => {
        console.log('Job post created:', response.data);

        // Clear the form control after creating the post
        this.newJobPostForm.patchValue({
          newJobPostContent: '',
        });

        // Fetch job posts again to update the list with the newly created job post
        axios
          .get('/api/job-posts')
          .then((response) => {
            this.jobPosts = response.data;
          })
          .catch((error) => {
            console.error('Error fetching job posts:', error);
          });
      })
      .catch((error) => {
        console.error('Error creating job post:', error);
      });
  }
}
