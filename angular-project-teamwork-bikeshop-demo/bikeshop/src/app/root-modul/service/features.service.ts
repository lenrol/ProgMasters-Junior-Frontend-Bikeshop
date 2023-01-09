import { Injectable } from '@angular/core';
import { FeaturesModel } from 'src/app/shared-modul/model/features.model';

@Injectable({
  providedIn: 'root'
})
export class FeaturesService {

  feutures: Array<FeaturesModel> = [
    {
      numberField: "365",
      titleField: "bicycles",
      img: "/assets/icons/bicycle-svgrepo-com.svg"
    },
    {
      numberField: "38",
      titleField: "brands",
      img: "/assets/icons/star-svgrepo-com.svg"
    },
    {
      numberField: "999",
      titleField: "customers",
      img: "/assets/icons/people-svgrepo-com.svg"
    },
    {
      numberField: "9:00 - 17:00",
      titleField: "opening hours",
      img: "/assets/icons/clock-svgrepo-com.svg"
    },


  ];

  constructor() { }
}
