import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from 'src/app/shared/components/post.service';
import { Post } from '../../shared/interfaces';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
})
export class CreatePostComponent implements OnInit {
  constructor(private post: PostService, private route: Router) {}
  postForm!: FormGroup;
  tagsArray: Array<string> = [];

  ngOnInit(): void {
    this.postForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      author: new FormControl(null, Validators.required),
      content: new FormControl(null, Validators.required),
      tags: new FormControl(null),
    });
  }

  addTag() {
    const tag = this.postForm.controls['tags'].value;
    if (tag.trim()) {
      this.tagsArray.push(tag);
      this.postForm.controls['tags'].reset();
    } else {
      return;
    }
  }

  removeTag(tag: string) {
    const tagIndex = this.tagsArray.indexOf(tag);
    this.tagsArray.splice(tagIndex, 1);
  }

  submit() {
    if (this.postForm.invalid) {
      return;
    }
    const currentDate = formatDate(new Date(), 'YYYY-MM-dd', 'en');
    const post: Post = {
      title: this.postForm.controls['title'].value,
      author: this.postForm.controls['author'].value,
      content: this.postForm.controls['content'].value,
      creation_date: currentDate,
      tags: this.tagsArray,
    };

    this.post.createPost(post).subscribe((x) => {
      this.route.navigate(['/admin', 'dashboard']);
    });
  }
}
