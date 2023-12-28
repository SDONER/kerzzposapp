import { HttpBackend, HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../model/responseModel';
import { LocationService } from './location.service';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient:HttpClient, private locationService:LocationService) { }

  baseUrl = 'https://smarty.kerzz.com:4004/api/mock/getFeed';
  apiKey = 'bW9jay04ODc3NTU2NjExMjEyNGZmZmZmZmJ2';

  skip = 5;
  limit = 5;

  getHeaders(){
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'apiKey' : this.apiKey,
    });
  }

  async getRestaurants(skip: number, limit: number):Promise<Observable<ResponseModel>>{

    const latitudeInfo =  await this.locationService.getLatitude();
    const latitude = (await latitudeInfo)?.latitude;
    const longitudeInfo = await this.locationService.getLongitude();
    const longitude = (await longitudeInfo)?.longitude;

    const body = {
      skip: this.skip,
      limit: this.limit,
      latitude: latitude,
      longitude: longitude
    }

    console.log('body',body);
    console.log(latitudeInfo);
    console.log(longitudeInfo);

    return  this.httpClient.post<ResponseModel>(this.baseUrl , body, {headers: this.getHeaders()});
  }
}
   