import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PostService } from '../shared/components/post.service';
import { Post } from '../shared/interfaces';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  posts$: Observable<Post[]> = new Observable();
  searchText!: string;
  constructor(private postService: PostService) {}
  ngOnInit(): void {
    this.posts$ = this.postService.getAllPosts();
  }
}
