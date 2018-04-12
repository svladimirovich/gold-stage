import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

type News = Array<{
  title: string,
  content: string,
  imagePath: string
}>;


@Component({
  selector: 'app-newslist',
  templateUrl: './newslist.component.html',
})
export class NewslistComponent implements OnInit {

  public news: News = [];

  constructor(public http: HttpClient) { }

  ngOnInit() {
    // TODO: need to set config variables here
    this.http.get<News>('http://localhost:4000/api/news').subscribe(news => {
      this.news = news;
    })
  }

}
