import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from '../footer/footer.component';
import { HttpCommandesService } from './http-commandes.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-commandes',
  imports: [FooterComponent, CommonModule, FormsModule],
  templateUrl: './commandes.component.html',
  styleUrl: './commandes.component.css'
})

export class CommandesComponent implements OnInit {
  orders: any[] = []; // Liste des commandes
  isFormVisible = false; // Afficher ou cacher le formulaire
  isEdit = false; // Mode édition ou création
  errorMessage: string = ''; // Gestion des messages d'erreur
  orderForm: any = { productId: null, quantity: null, clientId: null }; // Modèle de formulaire
  customers: any[] = [];
  victor: string = 'Veuillez appelez l\'admin Victor Garcia';

  
  

  constructor(private orderService: HttpCommandesService, private http:HttpClient) { }

  ngOnInit(): void {
    
    this.orderService.getOrders().subscribe({
      next: (data) => {
        this.orders = data;
        this.orders = [...this.orders]
        console.table(data)
      },

      error: (error : any) => {
        console.error('Erreur lors de la récupération des commandes :', error);
        this.errorMessage = `Erreur lors de la récupération des commandes...${this.victor}`
      }
  });
  }


  // Afficher le formulaire pour une nouvelle commande
  showForm(): void {
    this.isFormVisible = true;
    this.isEdit = false;
    this.orderForm = { productId: null, quantity: null, clientId: null };
  }

  // Remplir le formulaire pour modifier une commande existante
  editOrder(order: any): void {
    this.isFormVisible = true;
    this.isEdit = true;
    this.orderForm = { ...order };
  }

  // Soumettre le formulaire (création ou modification)
  submitForm(): void {
    if (this.isEdit) {
      this.orderService.updateOrder(this.orderForm.id, this.orderForm).subscribe(() => {
        
        this.isFormVisible = false;
      });
    } else {
      this.orderService.createOrder(this.orderForm).subscribe(() => {
        
        this.isFormVisible = false;
      });
    }
  }

  // Supprimer une commande
  deleteOrder(orderId: string): void {
    const orderToDelete = this.orders.find(order => order.id === orderId);
  
    if (!orderToDelete) {
      alert("Commande introuvable");
      return;
    }
  
    // Appel au service pour supprimer la commande du backend
    this.orderService.deleteOrder(+orderId).subscribe({
      next: () => {
        // Suppression de la commande de la liste localement
        this.orders = this.orders.filter(order => order.id !== orderId);
        console.log('Commande supprimée avec succès');
      },
      error: (error: any) => {
        console.error('Erreur lors de la suppression de la commande :', error);
      }
    });
  }
  
  // Annuler l’action (revenir à la liste)
  cancelForm(): void {
    this.isFormVisible = false;
  }
}