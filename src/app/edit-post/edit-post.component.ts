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
  postId!: string;
  tagsArray!: Array<string>;
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
        this.tagsArray = post.tags.split(',');
        this.editForm = new FormGroup({
          title: new FormControl(post.title, Validators.required),
          author: new FormControl(post.author, Validators.required),
          content: new FormControl(post.content, Validators.required),
          tags: new FormControl(null),
        });
      });
  }
  ngOnDestroy(): void {
    this.updateSub.unsubscribe();
  }

  addTag() {
    const tag = this.editForm.controls['tags'].value;
    if (tag.trim()) {
      this.tagsArray.push(tag);
      this.editForm.controls['tags'].reset();
    } else {
      return;
    }
  }

  removeTag(tag: string) {
    const tagIndex = this.tagsArray.indexOf(tag);
    this.tagsArray.splice(tagIndex, 1);
  }

  submit() {
    this.updateSub = this.postService
      .updatePost({
        title: this.editForm.controls['title'].value,
        author: this.editForm.controls['author'].value,
        content: this.editForm.controls['content'].value,
        id: this.postId,
        tag: this.tagsArray.toString(),
      })
      .subscribe((x) => {
        this.router.navigate(['/admin', 'dashboard']);
        console.log(x);
      });
  }
}
