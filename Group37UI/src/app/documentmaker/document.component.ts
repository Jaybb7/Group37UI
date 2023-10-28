import { Component } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-my-component',
  templateUrl: './document.html',
  styleUrls: ['./document.css']
})
export class DocumentGenerator {

  result: any;

  constructor() { }

  sendInformationToBackend(value: string) {
    console.log(value)
    axios.get('http://localhost:4200/ai/generateDocument', {
      params: {
        information: value
      }
    }).then(response => {
      this.result = response.data.data;
    }).catch(error => {
      console.error('Error occurred:', error);
    });
  }

}
