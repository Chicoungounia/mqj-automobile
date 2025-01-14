import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpCommandesService {

constructor(private httpCommandes: HttpClient) { }



login(body:any) {
  return this.httpCommandes.post<any>("http://localhost:3000/api/auth/login", body)
}

getCommandes(){
  const token = localStorage.getItem("token")
  console.log(token)

  if(!token){
    throw new Error ('No authentification token found');
  }

  const headers = { Authorization : token}
  return this.httpCommandes.get<any>("http://localhost:3000/api/orders", {headers})
}


}
