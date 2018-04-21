import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { ClientConfiguration } from '../../../config.client';

type News = Array<{
  title: string,
  content: string,
  imagePath: string
}>;


@Component({
  selector: 'app-newslist',
  templateUrl: './newslist.component.html',
})
export class NewslistComponent implements OnInit, OnDestroy {

  public news: News = [];
  private subscription: Subscription;
  private configuration: ClientConfiguration = new ClientConfiguration();

  constructor(public http: HttpClient) { }

  ngOnInit() {
    this.subscription = this.http.get<News>(`${this.configuration.BaseUrl}/api/news`).subscribe(news => {
      this.news = news;
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
