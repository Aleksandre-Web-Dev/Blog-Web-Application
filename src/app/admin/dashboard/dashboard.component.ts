import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PostService } from 'src/app/shared/components/post.service';
import { Post } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  getPostsSubscription: Subscription = new Subscription();
  deletePostSubscription: Subscription = new Subscription();
  searchText: string = '';

  constructor(private post: PostService) {}

  ngOnInit(): void {
    this.post.getAllPosts().subscribe((posts) => {
      this.posts = posts;
    });
  }

  ngOnDestroy(): void {
    this.getPostsSubscription.unsubscribe();
    this.deletePostSubscription.unsubscribe();
  }

  delete(id: any) {
    this.post
      .deletePost(id)
      .subscribe(
        () => (this.posts = this.posts.filter((post) => post.id !== post.id))
      );
  }
}
