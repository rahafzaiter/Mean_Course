import { Component, EventEmitter, Output } from "@angular/core";
import { NgForm } from "@angular/forms";
import {Post} from '../post.model';
import {PostsService} from '../posts.service'

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})

export class PostCreateComponent {
  title: any = '';
  newPost = '';

  enteredTitle = '';
  enteredContent = '';
  newPost2 = '';
  //to help to listen to the event emitter from the outside(from the parent) use @Output

  //since postCreated will be also of type post so the generic type of emitter will be also post
  //so the data we emit will be of type post
  // @Output() postCreated = new EventEmitter<Post>();

    // after we created the post service we dont need a @Input and @output
    postCreated = new EventEmitter<Post>();

  constructor(public postsService: PostsService) {}
  // way 1
  // onAddPost(postInput:HTMLTextAreaElement) {
  //   //this.title='hello world'
  //   this.newPost=postInput.value;
  //   alert(this.title)
  // }

  // way 2
  // onAddPost2() {

  //   this.newPost2 = this.enteredContent;
  //   const post:Post = {
  //     title: this.enteredTitle,
  //     content: this.enteredContent };
  //   this.postCreated.emit(post);

  // }

  //way to bind using the form
  onAddPost2(form:NgForm) {
    // to prevent submitting with empty data if there is no form
    if(form.invalid){
      return;
    }

    // now not needed since we are calling add post method in services
    // this.newPost2 = this.enteredContent;
    // const post:Post = {
    //   title: form.value.title,
    //   content: form.value.content
    // };

    this.postsService.addPost(form.value.title,form.value.content)
    //this.postCreated.emit(post);
    form.resetForm();
  }
}
