import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RespuestaTopHeadlines } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';

const apikey = environment.apikey;
const apiUrl = environment.apiUrl;
const headers = new HttpHeaders({
  'X-Api-key': apikey
});
@Injectable({
  providedIn: 'root'
})



export class NoticiasService {

  constructor(private http: HttpClient) { }

  private ejecutarQuery<T>( query: string) {
    query = apiUrl + query;
    console.log(query);
    return this.http.get( query, { headers } );
  }

  getTopHeadlines() {
   return  this.ejecutarQuery<RespuestaTopHeadlines>(`/top-headlines?country=us`);
  // return this.http.get<RespuestaTopHeadlines>(`https://newsapi.org/v2/top-headlines?country=us&apiKey=dfacd68fc1c84a738454cbec4db99d96`);
  }

  getTopHeadlinesCategoria(categoria: string) {
    return this.ejecutarQuery<RespuestaTopHeadlines>(`/top-headlines?country=us&category=${categoria}`);
   // return this.http.get(`https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=dfacd68fc1c84a738454cbec4db99d96`);
  }
}
