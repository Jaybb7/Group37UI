import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GET_OPENAICHAT_API } from 'src/environment';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AIServiceService {

  constructor(private http: HttpClient) { }

  askLLM(question:any) {
    const loadingAlert =  Swal.fire({
      title: 'Checking Sentiments...',
      html: 'Please wait',
      didOpen: () => {
        Swal.showLoading();
      }
    });
    this.askLLMCall(question).subscribe({
      next: (response) => {
        console.log(response);
        Swal.fire("",response.data.replace(/\\n\\n/g, ' '),"success")
      },
      error: (error) => {
        console.log(error);
        Swal.fire("",error.error.message,"error");
      },
      complete: () => {
      },
    });
  }

  askLLMCall(question:any): Observable<ApiResponse> {
    const params = new HttpParams().set(
      "question",
      question
    );
    return this.http.get<ApiResponse>(GET_OPENAICHAT_API, {
      params
    });
  }
}

export interface ApiResponse {
  data: any;
}
