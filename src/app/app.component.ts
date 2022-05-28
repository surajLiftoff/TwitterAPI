import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
// import { FormGroup, FormArray, FormControlName } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('f') form: NgForm;
  tempTweets: Array<any> = [];
  tweets: Array<any> = [];
  searchParams: string = "";
  loading: boolean = false;
  isError = false;
  isData = false;
  params: string = "";
  errorMessage = '';

  constructor(private http : HttpClient) {

  }

  ngOnInit() { }

  onSubmit() {
    this.tweets = [];
    this.loading = true;
    this.params=this.searchParams;
    this.http.get<any>("http://localhost:3000/api/tweet/search/"+ this.searchParams).subscribe(
      result => {
        this.tempTweets = result.data;
      }, errorMessage => {
        this.isError = true; 
        this.errorMessage = errorMessage.message;
      } 
    ).add(() => {
      this.tempTweets.forEach(tweet => {
        this.http.get<any>("http://localhost:3000/api/tweet/" + tweet.id).subscribe(
          result => {
            this.isData = true;
            this.tweets.push(result);
            console.log(result);
          }
          
        )
      });
      this.loading = false;
    });
    this.form.reset();
  }

  transform(value: any) {
    if (value?.length > 18) {
        return value.substr(0, 18) + ' ...';
    } else {
        return value;
    }   
}
}
