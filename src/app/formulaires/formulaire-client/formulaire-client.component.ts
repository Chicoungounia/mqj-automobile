import { Component } from '@angular/core';
import { HttpClientsService } from '../../clients/http-clients.service';
import { Router, RouterModule } from '@angular/router';
import { FormsModule} from '@angular/forms';
import { FooterComponent } from '../../footer/footer.component';

@Component({
  selector: 'app-formulaire-client',
  imports: [FormsModule, RouterModule, FooterComponent],
  templateUrl: './formulaire-client.component.html',
  styleUrl: './formulaire-client.component.css'
})
export class FormulaireClientComponent {

  newClient = {  // Objet pour stocker les informations du nouveau client
 
    name: '',
    email: '',
    phone: '',
    address: '',
    orders: []
  };

  constructor(private methodeClients: HttpClientsService, private router: Router) { }

  // Méthode pour soumettre le formulaire et ajouter le client
  onSubmit() {
    this.methodeClients.addClient(this.newClient).subscribe({
      next: (response) => {
        console.log('Client ajouté:', response);
        alert(`Le client "${response.name}" a été ajouté avec succès !`);
        this.newClient = response
        this.router.navigate(['/clients']); // Redirige vers la page des clients après l'ajout
      },
      error: (error) => {
        console.error('Erreur lors de l\'ajout du client:', error);
        alert(`! L'opération a échouée et le client n'a pas été ajouté !`);
        

      }
    });
  }

}
