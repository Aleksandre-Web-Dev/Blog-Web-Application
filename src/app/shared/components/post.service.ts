import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Post } from '../interfaces';
import { environment } from 'src/environments/environment.dev';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}
  baseUrl = environment.baseUrl;

  createPost(post: Post): Observable<Post> {
    return this.http.post<Post>(
      `${this.baseUrl}${environment.apiPaths.post.create}`,
      post
    );
  }

  getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(
      `${this.baseUrl}${environment.apiPaths.post.getAll}`
    );
  }

  getById(id: string): Observable<Post> {
    return this.http
      .get<Post>(`${this.baseUrl}${environment.apiPaths.post.getById}/${id}`)
      .pipe(
        map((post: Post) => {
          return post;
        })
      );
  }

  deletePost(id: string): Observable<void> {
    return this.http.delete<void>(
      `${this.baseUrl}${environment.apiPaths.post.delete}/${id}`
    );
  }

  updatePost(post: any): Observable<Post> {
    return this.http.patch<Post>(
      `${this.baseUrl}${environment.apiPaths.post.update}`,
      post
    );
  }
}
