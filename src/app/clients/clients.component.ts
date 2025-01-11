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


// -----------------------------------ajoute la méthode modifier un client--------------------------------

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
  clients: any[] = []; // Tableau pour stocker les clients
  errorMessage: string = ''; // Pour afficher un message d'erreur si nécessaire
  editMode: { [key: string]: boolean } = {}; // Suivi du mode édition pour chaque client

  constructor(private InitClients: HttpClientsService, private router: Router) {}

  ngOnInit(): void {
    // Authentification avec les informations de l'utilisateur
    let authBody = { username: 'admin', password: 'pwd' };

    // Connexion et récupération du token
    this.InitClients.login(authBody).subscribe({
      next: (value) => {
        console.log(value);
        localStorage.setItem('token', value.token); // Sauvegarde du token

        // Récupération des clients après authentification
        this.InitClients.getClients().subscribe({
          next: (clientsData) => {
            this.clients = clientsData; // Stockage des données des clients
            console.table(clientsData);
          },
          error: (error) => {
            this.errorMessage =
              'Erreur lors du chargement des données des clients: ' +
              error.message;
          },
        });
      },
      error: (error) => {
        this.errorMessage = 'Erreur de connexion: ' + error.message;
      },
    });
  }

  // Méthode pour activer le mode édition pour un client
  enableEdit(clientId: string): void {
    this.editMode[clientId] = true;
  }

  navigateToEdit(clientId: string): void {
    this.router.navigate([`/modification-client/${clientId}`]);
  }

  // Méthode pour sauvegarder les modifications
  modifClient(client: any): void {
    this.InitClients.modifClient(client.id, client).subscribe({
      next: (response) => {
        console.log('Client modifié avec succès :', response);

  // Mettre à jour le client dans la liste locale
        const index = this.clients.findIndex((c) => c.id === client.id);
        if (index !== -1) {
          this.clients[index] = response;
        }
      },
      error: (error) => {
        console.error('Erreur lors de la modification du client :', error);
        alert('Une erreur est survenue lors de la modification du client.');
      },
      
    });
  }
}



