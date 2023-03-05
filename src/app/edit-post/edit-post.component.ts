import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';
import { PostService } from '../shared/components/post.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss'],
})
export class EditPostComponent implements OnInit, OnDestroy {
  editForm!: FormGroup;
  updateSub: Subscription = new Subscription();
  postId: string = '';
  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap((params: Params) => {
          return this.postService.getById(params['id']);
        })
      )
      .subscribe((post: any) => {
        this.postId = post.id;
        this.editForm = new FormGroup({
          title: new FormControl(post.title, Validators.required),
          author: new FormControl(post.author, Validators.required),
          content: new FormControl(post.content, Validators.required),
        });
      });
  }
  ngOnDestroy(): void {
    this.updateSub.unsubscribe();
  }

  submit() {
    this.updateSub = this.postService
      .updatePost({
        title: this.editForm.controls['title'].value,
        author: this.editForm.controls['author'].value,
        content: this.editForm.controls['content'].value,
        id: this.postId,
      })
      .subscribe((x) => {
        this.router.navigate(['/admin','dashboard'])
        console.log(x);
      });
  }
}
