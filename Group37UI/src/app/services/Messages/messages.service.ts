import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import axios from 'axios';
import { Observable } from 'rxjs/internal/Observable';
import { GET_MESSAGE_API, SEND_MESSAGE_API } from 'src/environment';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class MessagesService implements OnInit{

  messages: Message[] = [];

  getMessage() {
    this.messages = [];
    this.getMessageCall().subscribe({
      next: (response) => {
        console.log(response);
        this.messages = response.data;
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
      },
    });
  }

  getMessageCall(): Observable<ApiResponse> {
    const params = new HttpParams().set(
      "username",
      localStorage.getItem("USERNAME")!
    );
    return this.http.get<ApiResponse>(GET_MESSAGE_API, {
      params
    });
  }

  async sendMessage(payload: any) {
    const loadingAlert =  Swal.fire({
      title: 'Checking Sentiments...',
      html: 'Please wait',
      didOpen: () => {
        Swal.showLoading();
      }
    });
    await axios
      .post(SEND_MESSAGE_API, payload)
      .then((response) => {
        Swal.fire("",response.data.data, "success");
      })
      .catch((error) => {
        Swal.fire("",error.response.data.message, "error");
      });
  }

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    
  }

}

export interface Message {
  message: string;
  user: string;
  timeStamp: string;
}

export interface ApiResponse {
  data: any;
}
