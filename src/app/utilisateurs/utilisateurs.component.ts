import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { HttpUtilisateursService } from './http-utilisateurs.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-utilisateurs',
  imports: [FooterComponent, FormsModule, CommonModule,RouterModule],
  templateUrl: './utilisateurs.component.html',
  styleUrl: './utilisateurs.component.css'
})
export class UtilisateursComponent implements OnInit {

  user: any[] = [];
  errorMessage: string = ''

  constructor(private httpUser: HttpUtilisateursService) { }

  ngOnInit(): void {
    // Authentification avec les informations de l'utilisateur
    let authBody = {"username": "admin", "password": "pwd"}

    // Connexion et récupération du token
    this.httpUser.login(authBody).subscribe ({
      next: (value) => {
        console.log(value);
        localStorage.setItem('token', value.token);  // Sauvegarde du token
      
    //  Récupération des clients après authentification
    this.httpUser.getUser().subscribe({
      next: (userData) => {
      this.user = userData;  // Stockage des données users de l'api
      console.table(userData);  
      },

      error: (error) => {
      this.errorMessage = 'Erreur lors du chargement des données des utilisateurs: ' + error.message;
      }
   });
  },
      error: (error) => {
      this.errorMessage = 'Erreur de connexion: ' + error.message;
  }

  
  
});
}

}
