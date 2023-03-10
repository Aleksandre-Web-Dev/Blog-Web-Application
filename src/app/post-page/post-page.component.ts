import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { PostService } from '../shared/components/post.service';
import { Post } from '../shared/interfaces';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss'],
})
export class PostPageComponent implements OnInit {
  post$!: Observable<Post>;
  tagsArray: Array<string> = [];
  constructor(
    private postsService: PostService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.post$ = this.route.params.pipe(
      switchMap((params: Params) => {
        return this.postsService.getById(params['id']);
      })
    );

    this.post$.subscribe((post: Post) => {
      this.tagsArray = (post.tags as any).split(',');
      console.log(this.tagsArray);
    });
  }
}
