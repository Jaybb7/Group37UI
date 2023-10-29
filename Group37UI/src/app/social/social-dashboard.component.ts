import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { SocialDataService } from './social-data.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DUMMY_IMAGE } from 'src/environment';

@Component({
  selector: 'app-social-dashboard',
  templateUrl: './social-dashboard.component.html',
  styleUrls: ['./social-dashboard.component.css'],
})
export class SocialDashboardComponent implements OnInit {
  userProfile: any;
  posts: any[] = [];
  friendsList: string[] = [];
  newPostForm!: FormGroup;
  isModalVisible = false;
  modalMessage = '';

  constructor(
    private socialDataService: SocialDataService,
    private formBuilder: FormBuilder 
  ) {
    
  }

  showModal(message: string) {
    this.modalMessage = message;
    this.isModalVisible = true;
  }

  closeModal() {
    this.isModalVisible = false;
  }

  ngOnInit(): void {
    axios
      .get('/api/user/profile')
      .then((response) => {
        try {
          this.userProfile = response.data;
        } catch (e) {
          console.warn('Unexpected response structure:', response.data);
          this.userProfile = {
            userName: 'John Doe',
            bio: 'Hello, I am John!',
            profileImageUrl: DUMMY_IMAGE,
          };
        }
      })
      .catch((error) => {
        console.error('Error fetching user profile:', error);
        this.userProfile = {
          userName: 'John Doe',
          bio: 'Hello, I am John!',
          profileImageUrl: DUMMY_IMAGE,
        };
      });

    axios
      .get('http://localhost:8080/post/getAllPost')
      .then((response) => {
        try {
          this.posts = response.data;
        } catch (e) {
          console.warn('Unexpected response structure:', response.data);
          this.posts = [
            {
              authorName: 'Author 1',
              authorImageUrl: 'dummy-author-image-url',
              content: 'Sample post content 1',
            },
            {
              authorName: 'Author 2',
              authorImageUrl: 'dummy-author-image-url',
              content: 'Sample post content 2',
            },
          ];
        }
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
        this.posts = [
          {
            authorName: 'Author 1',
            authorImageUrl: 'dummy-author-image-url',
            content: 'Sample post content 1',
          },
          {
            authorName: 'Author 2',
            authorImageUrl: 'dummy-author-image-url',
            content: 'Sample post content 2',
          },
        ];
      });

    axios
      .get('/api/friends')
      .then((response) => {
        try {
          this.friendsList = response.data;
        } catch (e) {
          console.warn('Unexpected response structure:', response.data);
          this.friendsList = ['Friend 1', 'Friend 2', 'Friend 3'];
        }
      })
      .catch((error) => {
        console.error('Error fetching friends list:', error);
        this.friendsList = ['Friend 1', 'Friend 2', 'Friend 3'];
      });
      this.newPostForm = this.formBuilder.group({
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

  createPost() {
    const formData = this.newPostForm.value;
    console.log("iam here")
   console.log(formData)
    axios
      .post('http://localhost:8080/post/setPost', formData)
      .then((response) => {
        console.log('Post created:', response.data);
        this.newPostForm.reset();

        

        this.showModal('Post created successfully.');
      })
      .catch((error) => {
        console.error('Error creating post:', error);
        this.showModal('Error creating post. Please try again.');
      });
  }
}
