import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpClientsService {

  constructor(private httpClients: HttpClient) { }
  
  
  
  login(body:any) {
    return this.httpClients.post<any>("http://localhost:3000/api/auth/login", body)
  }
  
  getClients(){
    const token = localStorage.getItem("token")
    console.log(token)
  
    if(!token){
      throw new Error ('No authentification token found');
    }
  
    const headers = { Authorization : token}
    return this.httpClients.get<any>("http://localhost:3000/api/customers", {headers})
  }
  
  
  }

