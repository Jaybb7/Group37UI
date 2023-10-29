import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DUMMY_IMAGE } from 'src/environment';


@Component({
  selector: 'app-job-dashboard',
  templateUrl: './job.html',
  styleUrls: ['./job.css'],
})
export class JobDashboardComponent implements OnInit {
  userProfile: any;
  jobPosts: PostModel[] = [];
  connections: string[] = [];
  newJobPostForm: FormGroup;
  isModalVisible = false;
  modalMessage = '';

  showModal(message: string) {
    this.modalMessage = message;
    this.isModalVisible = true;
  }

  closeModal() {
    this.isModalVisible = false;
  }

  constructor(private formBuilder: FormBuilder) {
    this.newJobPostForm = this.formBuilder.group({
      postTitle: [''],
      postBenefits: [''],
      postSalary: [''],
      desc: [''],
      requirements: [''],
      postLocation: [''],
      postPointOfContact: [''],
      userId: ['']
    });
  }

  ngOnInit(): void {
    this.fetchUserProfile();
    this.fetchJobPosts();
    this.fetchConnections();
  }

  fetchUserProfile() {
    axios.get('/api/user/profile')
      .then((response) => {
        this.userProfile = response.data;
      })
      .catch((error) => {
        console.error('Error fetching user profile:', error);
        this.userProfile = {
          userName: 'John Doe',
          jobTitle: 'Software Engineer',
          profileImageUrl: DUMMY_IMAGE,
        };
      });
  }

  fetchJobPosts() {
    axios.get('http://localhost:8080/post/getPost')
      .then((response) => {
        this.jobPosts = response.data.data;
      })
      .catch((error) => {
        console.error('Error fetching job posts:', error);
        this.jobPosts = [];
      });
  }

  fetchConnections() {
    axios.get('/api/connections')
      .then((response) => {
        this.connections = response.data;
      })
      .catch((error) => {
        console.error('Error fetching connections:', error);
        this.connections = ['Connection 1', 'Connection 2', 'Connection 3'];
      });
  }

  createJobPost() {
    axios.post('http://localhost:8080/post/setPost', this.newJobPostForm.value)
      .then((response) => {
        console.log('Job post created:', response.data);
        this.newJobPostForm.reset();
        this.fetchJobPosts();

       
        this.showModal('Post created successfully.');
      })
      .catch((error) => {
        console.error('Error creating job post:', error);

        
        this.showModal('Error creating post. Please try again.');
      });
  }
}

interface PostModel {
  postTitle: string;
  postBenefits: string;
  postSalary: string;
  desc: string;
  requirements: string;
  postLocation: string;
  postPointOfContact: string;
  userId: string;
}
