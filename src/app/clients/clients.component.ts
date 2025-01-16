// ---------------1 recuperation des data sur l'api---------------------

// import { Component, OnInit } from '@angular/core';
// import { FooterComponent } from '../footer/footer.component';
// import { HttpClientsService } from './http-clients.service';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-clients',
//   imports: [FooterComponent, CommonModule],
//   templateUrl: './clients.component.html',
//   styleUrl: './clients.component.css'
// })
// export class ClientsComponent implements OnInit {
  
//   clients: any[] = []; 
//   errorMessage: string = '';  // Pour afficher un message d'erreur si nécessaire
  
//   constructor(private produitsClients: HttpClientsService) { }

//   ngOnInit(): void {

//     let authBody = {"username": "admin", "password": "pwd"}

//     this.produitsClients.login(authBody).subscribe((value) => {
//       console.log(value);
//       localStorage.setItem('token', value.token);
    
//     this.produitsClients.getClients().subscribe(value => {
//         console.table(value); 
//       },
    
//     );
//   });
//   }
// }

// -----------------------------2 extrait les donnée a affichier dans le html-----------------


// import { Component, OnInit } from '@angular/core';
// import { FooterComponent } from '../footer/footer.component';
// import { HttpClientsService } from './http-clients.service';
// import { CommonModule } from '@angular/common';
// import { RouterModule } from '@angular/router';

// @Component({
//   selector: 'app-clients',
//   standalone: true,  // Si vous utilisez un composant autonome
//   imports: [FooterComponent, CommonModule, RouterModule],
//   templateUrl: './clients.component.html',
//   styleUrls: ['./clients.component.css']
// })
// export class ClientsComponent implements OnInit {

  
//   clients: any[] = [];  // Tableau pour stocker les clients
//   errorMessage: string = '';  // Pour afficher un message d'erreur si nécessaire
  
//   constructor(private produitsClients: HttpClientsService) { }

//   ngOnInit(): void {
//     // Authentification avec les informations de l'utilisateur
//     let authBody = { "username": "admin", "password": "pwd" };

//     // Connexion et récupération du token
//     this.produitsClients.login(authBody).subscribe({
//       next: (value) => {
//         console.log(value);
//         localStorage.setItem('token', value.token);  // Sauvegarde du token

//         // Récupération des clients après authentification
//         this.produitsClients.getClients().subscribe({
//           next: (clientsData) => {
//             this.clients = clientsData;  // Stockage des données des clients
//             console.table(clientsData);  
//           },
//           error: (error) => {
//             this.errorMessage = 'Erreur lors du chargement des données des clients: ' + error.message;
//           }
//         });
//       },
//       error: (error) => {
//         this.errorMessage = 'Erreur de connexion: ' + error.message;
//       }
//     });
//   }
// }


// // -----------------------------------ajoute la méthode modifier un client--------------------------------

// import { Component, OnInit } from '@angular/core';
// import { FooterComponent } from '../footer/footer.component';
// import { HttpClientsService } from './http-clients.service';
// import { CommonModule } from '@angular/common';
// import { RouterModule, Router } from '@angular/router';
// import { FormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-clients',
//   standalone: true, // Si vous utilisez un composant autonome
//   imports: [FooterComponent, CommonModule, RouterModule, FormsModule],
//   templateUrl: './clients.component.html',
//   styleUrls: ['./clients.component.css'],
// })
// export class ClientsComponent implements OnInit {
//   clients: any[] = []; // Tableau pour stocker les clients
//   errorMessage: string = ''; // Pour afficher un message d'erreur si nécessaire
//   editMode: { [key: string]: boolean } = {}; // Suivi du mode édition pour chaque client

//   constructor(private InitClients: HttpClientsService, private router: Router) {}

//   ngOnInit(): void {
//     // Authentification avec les informations de l'utilisateur
//     let authBody = { username: 'admin', password: 'pwd' };

//     // Connexion et récupération du token
//     this.InitClients.login(authBody).subscribe({
//       next: (value) => {
//         console.log(value);
//         localStorage.setItem('token', value.token); // Sauvegarde du token

//         // Récupération des clients après authentification
//         this.InitClients.getClients().subscribe({
//           next: (clientsData) => {
//             this.clients = clientsData; // Stockage des données des clients
//             console.table(clientsData);
//           },
//           error: (error) => {
//             this.errorMessage =
//               'Erreur lors du chargement des données des clients: ' +
//               error.message;
//           },
//         });
//       },
//       error: (error) => {
//         this.errorMessage = 'Erreur de connexion: ' + error.message;
//       },
//     });
//   }


//   // Méthode pour activer le mode édition pour un client
//   enableEdit(clientId: string): void {
//     this.editMode[clientId] = true;
//   }

//   navigateToEdit(clientId: string): void {
//     this.router.navigate([`/modification-client/${clientId}`]);
//   }

//   // Méthode pour sauvegarder les modifications
//   modifClient(client: any): void {
//     this.InitClients.modifClient(client.id, client).subscribe({
//       next: (response) => {
//         console.log('Client modifié avec succès :', response);

//   // Mettre à jour le client dans la liste locale
//         const index = this.clients.findIndex((c) => c.id === client.id);
//         if (index !== -1) {
//           this.clients[index] = response;
//         }
//       },
//       error: (error) => {
//         console.error('Erreur lors de la modification du client :', error);
//         alert('Une erreur est survenue lors de la modification du client.');
//       },
      
//     });

    
//   }
// }


// -----------------------------------ajoute la méthode supprimer un client--------------------------------

// import { Component, OnInit } from '@angular/core';
// import { FooterComponent } from '../footer/footer.component';
// import { HttpClientsService } from './http-clients.service';
// import { CommonModule } from '@angular/common';
// import { RouterModule, Router } from '@angular/router';
// import { FormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-clients',
//   standalone: true, // Si vous utilisez un composant autonome
//   imports: [FooterComponent, CommonModule, RouterModule, FormsModule],
//   templateUrl: './clients.component.html',
//   styleUrls: ['./clients.component.css'],
// })
// export class ClientsComponent implements OnInit {
//   clients: any[] = []; // Tableau pour stocker les clients
//   errorMessage: string = ''; // Pour afficher un message d'erreur si nécessaire
//   editMode: { [key: string]: boolean } = {}; // Suivi du mode édition pour chaque client

//   constructor(private InitClients: HttpClientsService, private router: Router) {}

//   ngOnInit(): void {
//     // Authentification avec les informations de l'utilisateur
//     let authBody = { username: 'admin', password: 'pwd' };

//     // Connexion et récupération du token
//     this.InitClients.login(authBody).subscribe({
//       next: (value) => {
//         console.log(value);
//         localStorage.setItem('token', value.token); // Sauvegarde du token

//         // Récupération des clients après authentification
//         this.InitClients.getClients().subscribe({
//           next: (clientsData) => {
//             this.clients = clientsData; // Stockage des données des clients
//             console.table(clientsData);
//           },
//           error: (error) => {
//             this.errorMessage =
//               'Erreur lors du chargement des données des clients: ' +
//               error.message;
//           },
//         });
//       },
//       error: (error) => {
//         this.errorMessage = 'Erreur de connexion: ' + error.message;
//       },
//     });
//   }
  


//   // Méthode pour activer le mode édition pour un client
//   enableEdit(clientId: string): void {
//     this.editMode[clientId] = true;
//   }

//   navigateToEdit(clientId: string): void {
//     this.router.navigate([`/modification-client/${clientId}`]);
//   }

//   confirmDelete(clientId: string): void {
//     const confirmation = window.confirm(
//       "Êtes-vous sûr de vouloir supprimer ce client ? Cette action est irréversible."
//     );
  
//     if (confirmation) {
//       this.deleteClient(clientId);
//     }
//   }

//   deleteClient(clientId: string): void {
//     this.InitClients.deleteClient(clientId).subscribe({
//       next: () => {
//         console.log(`Client avec l'ID ${clientId} supprimé avec succès.`);
//         // Mise à jour locale : filtrez le client supprimé
//         this.clients = this.clients.filter(client => client.id !== clientId);
//         alert("Client supprimé avec succès.");
//       },
//       error: (error) => {
//         console.error("Erreur lors de la suppression du client :", error);
//         alert("Une erreur est survenue lors de la suppression du client.");
//       }
//     });
//   }
  
  

//   // Méthode pour sauvegarder les modifications
//   modifClient(client: any): void {
//     this.InitClients.modifClient(client.id, client).subscribe({
//       next: (response) => {
//         console.log('Client modifié avec succès :', response);

//   // Mettre à jour le client dans la liste locale
//         const index = this.clients.findIndex((c) => c.id === client.id);
//         if (index !== -1) {
//           this.clients[index] = response;
//         }
//       },
//       error: (error) => {
//         console.error('Erreur lors de la modification du client :', error);
//         alert('Une erreur est survenue lors de la modification du client.');
//       },
      
//     });

    
//   }
// }


// -----------------------------------ajoute de la barre de recherche de client--------------------------------

import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { HttpClientsService } from './http-clients.service';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-clients',
  standalone: true, // Si vous utilisez un composant autonome
  imports: [FooterComponent, CommonModule, RouterModule, FormsModule],
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css'],
})
export class ClientsComponent implements OnInit {
  clients: any[] = []; // Liste complète des clients
  filteredClients: any[] = []; // Liste filtrée pour l'affichage
  errorMessage: string = ''; // Gestion des messages d'erreur
  searchQuery: string = ''; // Requête de recherche
  editMode: { [key: string]: boolean } = {}; // Suivi des modes édition par client

  constructor(private clientService: HttpClientsService, private router: Router) {}

  ngOnInit(): void {
    this.authenticateAndLoadClients();
  }

  /**
   * Authentifie l'utilisateur et charge les clients.
   */
  private authenticateAndLoadClients(): void {
    const authBody = { username: 'admin', password: 'pwd' };

    this.clientService.login(authBody).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.token);
        this.loadClients();
      },
      error: (error) => {
        this.errorMessage = `Erreur de connexion : ${error.message}`;
      },
    });
  }

  /**
   * Charge les clients après authentification.
   */
  private loadClients(): void {
    this.clientService.getClients().subscribe({
      next: (clientsData) => {
        this.clients = clientsData;
        this.filteredClients = [...clientsData]; // Initialisation de la liste filtrée
      },
      error: (error) => {
        this.errorMessage = `Erreur lors du chargement des clients : ${error.message}`;
      },
    });
  }

  /**
   * Filtre les clients selon la requête de recherche.
   */
  filterClients(): void {
    const query = this.searchQuery.toLowerCase();
    this.filteredClients = this.clients.filter((client) =>
      client.name.toLowerCase().includes(query)
    );
  }

  /**
   * Active le mode édition pour un client donné.
   */
  enableEdit(clientId: string): void {
    this.editMode[clientId] = true;
  }

  /**
   * Redirige vers la page de modification d'un client.
   */
  navigateToEdit(clientId: string): void {
    this.router.navigate([`/modification-client/${clientId}`]);
  }

/**
 * Confirme et supprime un client.
 */
confirmDelete(clientId: string): void {
  // Trouver le client à supprimer
  const clientToDelete = this.clients.find((client) => client.id === clientId);

  if (!clientToDelete) {
    alert('Client introuvable.');
    return;
  }

  const confirmation = window.confirm(
    `Êtes-vous sûr de vouloir supprimer le client "${clientToDelete.name}" ?`
  );

  if (confirmation) {
    this.deleteClient(clientId, clientToDelete.name);
  }
}

/**
 * Supprime un client donné.
 */
deleteClient(clientId: string, clientName: string): void {
  this.clientService.deleteClient(clientId).subscribe({
    next: () => {
      // Supprimer le client de la liste locale
      this.clients = this.clients.filter((client) => client.id !== clientId);

      // Recalculer les IDs
      this.clients = this.clients.map((client, index) => ({
        ...client,
        id: index + 1, // Recalcule l'ID
      }));

      this.filteredClients = [...this.clients]; // Mise à jour de la liste filtrée

      console.log(`Client "${clientName}" a été supprimé avec succès.`);
      alert(`Le client "${clientName}" a été supprimé avec succès.`);
    },
    error: (error) => {
      alert(`Erreur lors de la suppression du client : ${error.message}`);
    },
  });
}


  

  /**
   * Sauvegarde les modifications apportées à un client.
   */
  modifClient(client: any): void {
    this.clientService.modifClient(client.id, client).subscribe({
      next: (updatedClient) => {
        const index = this.clients.findIndex((c) => c.id == client.id);
        if (index !== -1) {
          this.clients[index] = updatedClient;
          this.filteredClients = [...this.clients];
        }
        alert('Client modifié avec succès.');
      },
      error: (error) => {
        alert(`Erreur lors de la modification du client : ${error.message}`);
      },
    });
  }
}
