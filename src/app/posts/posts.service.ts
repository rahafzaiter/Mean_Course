import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { HttpClient } from '@angular/common/http'
import { Subject } from 'rxjs';

// or add the postService in the providor in app.module.ts
@Injectable({ providedIn: 'root' })
export class PostsService {
  private posts: Post[] = [];
  private postUpdated = new Subject<Post[]>();

  private postUpdatedX = new Subject<Post[]>();

  constructor(private http: HttpClient) { }


  getPosts() {
    // but the copy will not work since we fetch the copy before we edit them
    // return [...this.posts];
    //but its not a good practice to return the post list itself  so we have to use rxjs
    // rxjs is an observable that helps us pass data around
    // so we have to call a subject from rxjs

    this.http.get<{ message: string, posts: Post[] }>('http://localhost:3000/api/posts').subscribe((postData) => {
      this.posts = postData.posts;
      this.postUpdated.next([...this.posts])

    });
  }

  //since posts is private so we cant get it directly, we can call it using an observable
  getPostUpdatedListener() {
    return this.postUpdated.asObservable();
  }

  addPost(title: string, content: string) {
    const post: Post = { id: null, title: title, content: content };


    this.http.post<{ message: string }>('http://localhost:3000/api/posts', post).subscribe((responseData) => {
      console.log(responseData.message);
      this.posts.push(post);

      // to solve the problem of copied list that is not updated, we will emit the list after a new post added using rxjs
      this.postUpdated.next([...this.posts]);
    });

  }
}
