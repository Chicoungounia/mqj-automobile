import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpClientsService } from '../../../clients/http-clients.service';
import { FooterComponent } from '../../../footer/footer.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modification-client',
  imports: [FooterComponent, FormsModule, RouterModule],
  templateUrl: './modification-client.component.html',
  styleUrls: ['./modification-client.component.css']
})
export class ModificationClientComponent implements OnInit {
  modifClient = {
    name: '',
    email: '',
    phone: '',
    address: '',
    orders: []
  };

  clientId: string = '';
  
  

  constructor(
    private route: ActivatedRoute,
    private methodeClients: HttpClientsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Récupérer l'ID du client depuis l'URL
    this.clientId = this.route.snapshot.paramMap.get('id') || '';

    // Charger les données du client
    this.methodeClients.getClientById(this.clientId).subscribe({
      next: (client) => {
        this.modifClient = client;
        

      },
      error: (error) => {
        console.error('Erreur lors du chargement du client :', error);
      }
    });
  }

  onSubmit(): void {
    this.methodeClients.modifClient(this.clientId, this.modifClient).subscribe({
      next: (response) => {
        alert(`Le client "${response.name}" a été modifié avec succès !`);
        this.router.navigate(['./clients']); // Redirige vers la page des clients après l'ajout
      },
      error: (error) => {
        console.error('Erreur lors de la modification du client :', error);
      }
    });
  }
}
