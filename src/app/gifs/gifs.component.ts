import { Component, OnInit } from '@angular/core';
import { GifsService } from './gifs.service';

@Component({
  selector: 'app-gifs',
  templateUrl: './gifs.component.html',
  styleUrls: ['./gifs.component.scss']
})
export class GifsComponent implements OnInit {
  constructor(private gifsService: GifsService) { }

  gifs: Object[] = [];
  gifs1: Object[] = [];
  gifs2: Object[] = [];
  gifs3: Object[] = [];
  offset: number = 0;

  ngOnInit() {
    this.getGifs();
  }

  onLoadMore() {
    this.getGifs();
  }

  getGifs() {
    this.gifsService.getGifs('trending', this.offset).subscribe(response => {
      let gifs1 = response.splice(0, 8);
      let gifs2 = response.splice(8, 8);
      let gifs3 = response;

      this.gifs1 = [...this.gifs1, ...gifs1];
      this.gifs2 = [...this.gifs2, ...gifs2];
      this.gifs3 = [...this.gifs3, ...gifs3];

      this.gifs = [...this.gifs1, ...this.gifs2, ...this.gifs3];
      this.offset += 24;
    });
  }
}
