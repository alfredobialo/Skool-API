import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

/*category :  business entertainment health science sports technology */

@Injectable()
export class NewsOrgApi
{
  API_KEY =  "0e0ed34728ef400791fd852845b2b00a";
  BASE_URL = "https://newsapi.org/v2/";
  TOP_HEADLINES_END_POINT  = `${this.BASE_URL}top-headlines?apikey=${this.API_KEY}`;
   constructor(private http : HttpClient){}


}
