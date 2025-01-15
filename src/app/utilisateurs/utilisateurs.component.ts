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
  editMode: { [ key : string]: boolean} = {}
  filteredUser: any[] = []; // Liste filtrée pour l'affichage
  searchQuery: string = ''; // Requête de recherche

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
  },

});
} 

 /**
   * Filtre les clients selon la requête de recherche.
   */
 filterUser(): void {
  const query = this.searchQuery.toLowerCase();
  this.filteredUser = this.user.filter((utilisateur) =>
    utilisateur.username.toLowerCase().includes(query)
  );
}

// Méthode pour activer et desactiver le mode édition pour un utilisateur (3)
  enableEdit(userId: string): void {
    this.editMode[userId] = true;
  }

  disableEdit(userId: string): void {
    this.editMode[userId] = false;
  }

  // Méthode pour enregistrer les modifications (3)
saveChanges(userId: string, updatedUser: any): void {
  this.httpUser.modifUser(userId, updatedUser).subscribe({
    next: (response) => {
      console.log('Utilisateur mis à jour avec succès', response);

      // Mettre à jour la liste locale avec les nouvelles données (3)
      const userIndex = this.user.findIndex((user) => user.id === userId);
      if (userIndex !== -1) {
        this.user[userIndex] = { ...this.user[userIndex], ...updatedUser };
      }
      this.disableEdit(userId);
    },
    error: (err) => {
      console.error('Erreur lors de la mise à jour de l\'utilisateur', err);
      this.errorMessage = 'Erreur lors de la mise à jour : ' + err.message;
    }
  });
}
}
