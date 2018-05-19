import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'news-list-component',
  template:`<div>
    News List from News.Org Api
    <br>
   <div class="margin-10"> <code class="bold">
      <a href="https://newsapi.org/v2/top-headlines?country=ng&category=technology&apiKey=getyours"
      target="_blank">
        News Update from around the world, 
      </a>
    </code></div>
  </div>`
})

export class NewsListComponent implements OnInit {
  constructor() {
  }
 // Apikey : 0e0ed34728ef400791fd852845b2b00a
  ngOnInit() {
  }
}
