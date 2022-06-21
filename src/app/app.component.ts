import { Component } from '@angular/core';
import {Post} from './posts/post.model'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mean-course_c';
  // so stored post is an array of Post
  storedPosts:Post[] = [];

  onPostAdded(post) {
    this.storedPosts.push(post);
  }
}
