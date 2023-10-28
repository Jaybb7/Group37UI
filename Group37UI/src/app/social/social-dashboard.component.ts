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
  newPostForm: FormGroup;
  constructor(
    private socialDataService: SocialDataService,
    private formBuilder: FormBuilder // Inject FormBuilder
  ) {
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


  ngOnInit(): void {
    // Attempt to fetch user profile from the backend using Axios
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
          bio: 'Hello, I am John!',
          profileImageUrl: DUMMY_IMAGE,
        };
      });

    // Attempt to fetch posts from the backend using Axios
    axios
      .get('http://localhost:4200/post/getPost')
      .then((response) => {
        this.posts = response.data;
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
        // Handle error - Display dummy data for demo purposes
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

    // Attempt to fetch friends list from the backend using Axios
    axios
      .get('/api/friends')
      .then((response) => {
        this.friendsList = response.data;
      })
      .catch((error) => {
        console.error('Error fetching friends list:', error);
        // Handle error - Display dummy data for demo purposes
        this.friendsList = ['Friend 1', 'Friend 2', 'Friend 3'];
      });
  }
  createPost() {
    const formData = this.newPostForm.value;

    axios
      .post('http://localhost:4200/post/setPost', formData)
      .then((response) => {
        console.log('Post created:', response.data);
        this.newPostForm.reset();

        // Fetch posts again to update the list with the newly created post
        this.socialDataService.getPosts().subscribe((posts) => {
          this.posts = posts;
        });
      })
      .catch((error) => {
        console.error('Error creating post:', error);
      });
  }
}