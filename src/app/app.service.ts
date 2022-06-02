
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  tempTweets: Array<any> = [];
  tweets: Array<any> = [];
  searchParams: string = "";
  loading: boolean = false;
  isError = false;
  isData = false;
  params: string = "";
  errorMessage = '';

  constructor(private http: HttpClient) { }

  submit(){
    this.tweets = [];
    this.loading = true;
    this.params=this.searchParams;
    return this.http.get<any>("https://localhost:3000/api/tweet/search/"+ this.searchParams).subscribe(
      result => {
        this.tempTweets = result.data;
      }, errorMessage => {
        this.isError = true; 
        this.errorMessage = errorMessage.message;
      } 
    ).add(() => {
      this.tempTweets.forEach(tweet => {
        this.http.get<any>("https://localhost:3000/api/tweet/" + tweet.id).subscribe(
          result => {
            this.isData = true;
            this.tweets.push(result);
            console.log(result);
          }
          
        )
      });
      this.loading = false;
    });
  }
}
