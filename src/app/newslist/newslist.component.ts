import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { ClientConfiguration } from '../../../config.client';
import { TransferState, makeStateKey } from '@angular/platform-browser';

type News = Array<{
    title: string,
    content: string,
    imagePath: string
}>;

const NEWS_KEY = makeStateKey('NEWS');

@Component({
    selector: 'app-newslist',
    templateUrl: './newslist.component.html',
})
export class NewslistComponent implements OnInit, OnDestroy {

    public news: News = [];
    private subscription: Subscription;
    private configuration: ClientConfiguration = new ClientConfiguration();

    constructor(public http: HttpClient,
                public transferState: TransferState) { }

    ngOnInit() {
        if(this.transferState.hasKey(NEWS_KEY)) {
            this.news = this.transferState.get<News>(NEWS_KEY, null);
        } else {
            this.subscription = this.http.get<News>(`${this.configuration.BaseUrl}/api/news`).subscribe(news => {
                this.transferState.set<News>(NEWS_KEY, news);
                this.news = news;
            })
        }
    }

    ngOnDestroy() {
        if(this.subscription)
            this.subscription.unsubscribe();
    }
}
