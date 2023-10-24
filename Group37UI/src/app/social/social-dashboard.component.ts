import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { SocialDataService } from './social-data.service';
import { FormBuilder, FormGroup } from '@angular/forms';
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
      newPostContent: [''], // Initialize the form control with an empty string
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
          profileImageUrl: 'dummy-profile-image-url',
        };
      });

    // Attempt to fetch posts from the backend using Axios
    axios
      .get('/api/posts')
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
  // Function to create a new post
  createPost() {
    const newPostContent = this.newPostForm.value.newPostContent; // Get the input value from the form

    if (!newPostContent) {
      // Do not create an empty post
      return;
    }

    // Send a POST request to your backend to create the post
    axios
      .post('/api/posts', { content: newPostContent })
      .then((response) => {
        // Handle successful post creation, if needed
        console.log('Post created:', response.data);

        // Clear the form control after creating the post
        this.newPostForm.patchValue({
          newPostContent: '',
        });

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

