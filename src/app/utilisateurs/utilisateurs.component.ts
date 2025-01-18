import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { HttpUtilisateursService } from './http-utilisateurs.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-utilisateurs',
  imports: [FooterComponent, FormsModule, CommonModule,RouterModule],
  templateUrl: './utilisateurs.component.html',
  styleUrl: './utilisateurs.component.css'
})
export class UtilisateursComponent implements OnInit {

  user: any[] = [];
  errorMessage: string = ''
  error: string = ''
  editMode: { [ key : string]: boolean} = {}
  filteredUser: any[] = []; // Liste filtrée pour l'affichage
  searchQuery: string = ''; // Requête de recherche
  currentUserName: string = '';  // Ajout d'une variable pour stocker le nom de l'utilisateur connecté.
  

  constructor(private httpUser: HttpUtilisateursService, private router: Router) { }

  ngOnInit(): void {

          
          //  Récupération des clients après authentification
          this.httpUser.getUser().subscribe({
            next: (userData) => {
            this.user = userData;  // Stockage des données users de l'api
            this.filteredUser = [...this.user]; // Initialiser la liste filtrée avec tous les utilisateurs
            console.table(userData);  
            },
            
          

            error: (error: any) => {
            this.errorMessage = 'Erreur lors du chargement des données des utilisateurs: ' + error.message;
            }
          });
} 

//  /**
//    * Filtre les clients selon la requête de recherche. (4)
//    */
//  filterUser(): void {
//   const query = this.searchQuery.toLowerCase().trim();
//   this.filteredUser = this.user.filter((utilisateur) => 
//     utilisateur.username.toLowerCase().includes(query)
//   );
// }

// Méthode pour activer et desactiver le mode édition pour un utilisateur (3)
  enableEdit(userId: string): void {
    this.editMode[userId] = true;
  }

  disableEdit(userId: string): void {
    this.editMode[userId] = false;
  };



  deleteUser(userId: string): void {
    // Trouver l'utilisateur à supprimer
    const userToDelete = this.user.find((user) => user.id === userId);
  
    if (!userToDelete) {
      alert('Utilisateur introuvable.');
      return;
    }
  
    // Boîte de dialogue de confirmation
    const confirmDelete = window.confirm(`Êtes-vous sûr de vouloir supprimer l'utilisateur "${userToDelete.username}" ?`);
  
    if (confirmDelete) {
      this.httpUser.deleteUser(userId).subscribe({
        next: () => {
          // Supprimer l'utilisateur de la liste locale
          this.user = this.user.filter((user) => user.id !== userId);
  
          // Recalculer les IDs
          this.user = this.user.map((user, index) => ({
            ...user,
            id: index + 1, // Recalcule l'ID
          }));
  
          this.filteredUser = [...this.user]; // Mettre à jour la liste filtrée
  
          console.log(`Utilisateur "${userToDelete.username}" supprimé avec succès.`);
          alert(`L'utilisateur "${userToDelete.username}" a été supprimé avec succès.`);
        },
        error: (error: any) => {
          console.error('Erreur lors de la suppression de l\'utilisateur :', error);
          alert(`Erreur lors de la suppression de l'utilisateur : ${error.message}`);
        },
      });
    } else {
      console.log(`Suppression annulée pour l'utilisateur "${userToDelete.username}".`);
      alert(`La suppression de l'utilisateur "${userToDelete.username}" a été annulée.`);
    }
  }
  
 
  

  // Méthode pour enregistrer les modifications (3)
saveChanges(userId: string, updatedUser: any): void {
  this.httpUser.modifUser(userId, updatedUser).subscribe({
    next: (response) => {
      console.log(`Utilisateur ${response.username} a bien étémis à jour avec succès`, response);
      

      // Trouver l'utilisateur à partir de l'ID
      const userIndex = this.user.findIndex((user) => user.id === userId);
      if (userIndex !== -1) {
        // Mettre à jour la liste locale avec les nouvelles données (3)
        this.user[userIndex] = { ...this.user[userIndex], ...updatedUser };
           // Utiliser le `username` dans l'alerte
           const username = this.user[userIndex].username;
           alert(`L'utilisateur "${username}" a été mis à jour avec succès.`);
        
      }
      this.disableEdit(userId);
    },
    error: (error) => {
      console.error('Erreur lors de la mise à jour de l\'utilisateur', error);
      this.errorMessage = 'Erreur lors de la mise à jour : ' + error.message;
    }
  });
 
}
}
