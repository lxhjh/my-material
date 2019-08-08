import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  posts$: Observable<any>;

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.posts$ = this.httpClient.get<any[]>('https://jsonplaceholder.typicode.com/posts').pipe(map(posts => {
      return posts.slice(0, 6);
    }));
  }

}
