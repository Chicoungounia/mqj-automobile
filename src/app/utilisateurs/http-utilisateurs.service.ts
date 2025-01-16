import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HttpUtilisateursService {

  // Récupération des données users dans API httpClient
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

       // Méthode pour ajouter un client dans le forulaire-client
          addUser(utilisateur: any): Observable<any> {
            const token = localStorage.getItem('token')||'';
      
              const headers = { Authorization: token };
           
            return this.httpUtilisateurs.post<any>('http://localhost:3000/api/users', utilisateur, { headers });
          }
 
    // Méthode pour modifier un client directement dans son emplacement//
    modifUser(id: string, user: any): Observable<any> {
      const token = localStorage.getItem('token') || '';
    
      const headers = { Authorization: token };
    
      return this.httpUtilisateurs.put<any>(`http://localhost:3000/api/users/${id}`, user, { headers });
    }

    getUserById(id: string): Observable<any> {
      return this.httpUtilisateurs.get<any>(`http://localhost:3000/api/users/${id}`);
    }

    deleteUser(userId: string): Observable<any> {
      const token = localStorage.getItem('token') || '';
      const headers = { Authorization: token };
    
      return this.httpUtilisateurs.delete<any>(
        `http://localhost:3000/api/users/${userId}`, 
        { headers }
      );
    }
}
