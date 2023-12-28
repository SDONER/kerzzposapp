import { Component, OnInit } from '@angular/core';
import { ResponseModel } from '../model/responseModel';
import { ApiService } from '../service/api.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

 
  constructor(private restService:ApiService, ) {}

  restaurant:ResponseModel[] = [];

  limit = this.restService.limit;
  skip = this.restService.skip;
  

   ngOnInit(): void {
     this.getRestaurant();
   }

   async getRestaurant(event?:any) {
    try {
      const response = (await this.restService.getRestaurants(this.limit,this.skip)).subscribe({
        next:(data: any) => {
          const newData = data.response;
          this.restaurant = [...this.restaurant, ...newData];
          

          if (event) {
            event.target.complete();
          }
        }
      });
      
    } catch (error) {
      console.error('Error while fetching restaurants:', error);
    }
  }


  loadData(event: any) {
    this.getRestaurant(event);
  }


   
}
