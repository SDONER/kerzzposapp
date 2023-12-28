import { Injectable } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor() { }

  getCurrentLocation = async () => {
    const coordinates = Geolocation.getCurrentPosition();
    const letitude = (await coordinates).coords.latitude;
    const longitude =  (await coordinates).coords.latitude;
    console.log('Current loc:' , coordinates );

    return coordinates; 

   }

   getLatitude = async () => {
    try{
      const coordinates = await Geolocation.getCurrentPosition();
      const {latitude} = coordinates.coords;
      
      //console.log('latitude', latitude);

      return {latitude };

    }catch (error){
      throw new Error('coordinates could not be obtained');
    }
  }  

   getLongitude = async () => {
    try{
      const coordinates = await Geolocation.getCurrentPosition();
      const {longitude} = coordinates.coords;

      //console.log('longitude', longitude);

      return {longitude };

    }catch (error){
      throw new Error('coordinates could not be obtained');
    }
  }   

}