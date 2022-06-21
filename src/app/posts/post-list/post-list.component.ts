import { Component, Injectable, Input, OnInit,OnDestroy  } from "@angular/core";
import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})

export class PostListComponent implements OnInit,OnDestroy  {
  // posts=[
  //   {title:'First Post', content:'we have here first post'},
  //   {title:'Second Post', content:'we have here second post'},
  //   {title:'Third Post', content:'we have here third post'},
  //   {title:'Fourth Post', content:'we have here fourth post'},
  // ]

  //we can create a property to connect it with the item in constructor;
  //postService:PostsService;



  // @Input() posts: Post[] = [];
  // after we created the post service we dont need a @Input and @output
  posts: Post[] = [];
  private postsSub: Subscription;

  allPosts:Post[]=[];

  constructor(public postsService: PostsService) {
    //  and here call the this.postService=postService;
    // but public will do the same function
    // but this will not make angular be aware of the service file because it will not scan all the file so we use one of two ways:
    // 1- injectable in service.ts or add the service import in the proiders array in app.module.ts
  }

  // to call then the post service we use ngOnInit to call getPost method in services
  // 1- we add import onInit , 2- we add implements onInit in the export class, 3- we call getPost in onInit method

  // we will have 2 func that will be called in the observable,
  // 1- excuted when event is emited
  //2- when error is emitted
  //3- when the observable completed
  x:number=1;
  ngOnInit(): void {
     this.postsService.getPosts();
    //     this.postsService.getPostUpdatedListener()
    //       .subscribe((posts:Post[])=>{
    //         // this is updated whenever new value is added
    // this.posts=posts;
    //       });

    //since this subscribtion doesnt fail when the component fail to down, we have to save it in variable when up
    // so we want to assure that when this comp is not a part of the dom, the subscription that are living inside it will not be apart of the dom
    // so we will store that property in a new subsciption up and import it

    this.postsSub = this.postsService.getPostUpdatedListener()
      .subscribe((posts: Post[]) => {
        // this is updated whenever new value is added
        this.posts = posts;
      });

  }

  // this will remove the subscription when the comp is removed from the dom
  ngOnDestroy(){
    this.postsSub.unsubscribe()
  }

}
