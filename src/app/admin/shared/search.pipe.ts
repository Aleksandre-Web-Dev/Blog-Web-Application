import { Pipe, PipeTransform } from '@angular/core';
import { Post } from '../../shared/interfaces';
@Pipe({
  name: 'SearchPosts',
})
export class SearchPipe implements PipeTransform {
  transform(posts: Post[], value = ''): Post[] {
    if (!value.trim()) {
      return posts;
    }

    return posts.filter((posts) => {
      return posts.title.toLowerCase().includes(value.toLowerCase());
    });
  }
}
