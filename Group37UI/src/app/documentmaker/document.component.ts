import { Component } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-my-component',
  templateUrl: './document.html',
  styleUrls: ['./document.css']
})
export class DocumentGenerator {

  result: string="s";  // Changed type to string

  constructor() { }

  sendInformationToBackend(value: string) {
    console.log(value)
    axios.get('http://localhost:8080/ai/generateDocument', {
      params: {
        information: value
      }
    }).then(response => {
      this.result = JSON.stringify(response.data, null, 2);  // Beautify JSON
    }).catch(error => {
      console.error('Error occurred:', error);
    });
  }

}
