import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpUtilisateursService {

   constructor(private httpUtilisateurs: HttpClient) { }
      login(body: any) {  
        return this.httpUtilisateurs.post<any>('http://localhost:3000/api/auth/login', body);
      }
  
      getUser() {
        const token = localStorage.getItem('token');
        console.log(token)
        if(!token) {
          throw new Error('No autorization token found');
        }
  
        const headers = {Authorization : token};
        return this.httpUtilisateurs.get<any>('http://localhost:3000/api/users',{headers})
  
      }
}
