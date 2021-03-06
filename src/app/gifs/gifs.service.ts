import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";

@Injectable({ providedIn: 'root' })
export class GifsService {
  constructor(private http: HttpClient) { }

  baseUrl: string = "https://api.giphy.com/v1/";
  apiKey: string = "?api_key=qa1T0vszg1yiWakAJFj98YbZt20VG1Yv";


  getGifs(method: string, offset: number = 0, limit = 24) {
    return this.http.get<any>(`${this.baseUrl}gifs/${method}${this.apiKey}&limit=${limit}&offset=${offset}&rating=g&lang=en`)
      .pipe(
        map(response => {
          return response.data || [];
        })
      );
  }
}