import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';
import { HttpProduitsService } from './http-produits.service';

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css'],
  imports: [CommonModule, FormsModule, FooterComponent],
})
export class ProduitsComponent implements OnInit {
  produits: any[] = [];  // Liste des produits
  selectedProduct: any = {};  // Produit sélectionné pour la modification
  newProduct: any = { name: '', stock: 0 };  // Nouveau produit à ajouter
  isEditMode: boolean = false;  // Mode édition pour un produit
  err: string =""
  victor: string = 'Veuillez appelez l\'admin Victor Garcia';

  constructor(private produitsService: HttpProduitsService) {}

  ngOnInit(): void {

  
    

        // Récupérer les produits après l'authentification réussie
        this.produitsService.getProducts().subscribe({
          next: (data) => {
            this.produits = data;  // Mise à jour de la liste des produits
            this.produits = [...this.produits];
            console.table(data)
          },

          error: (err: any) => {
            this.err = `Erreur de récupération des produits... ${this.victor}`
            console.error('Erreur de récupération des produits:', err);
          }
        });
  }
    

  // Fonction pour activer le mode édition d'un produit
  editProduct(produit: any): void {
    this.selectedProduct = { ...produit };  // Créer une copie du produit sélectionné
    this.isEditMode = true;  // Activer le mode édition
  }

  // Fonction pour sauvegarder les modifications d'un produit
  saveProduct(): void {
    if (this.selectedProduct.id) {
      this.produitsService
        .updateProduct(this.selectedProduct.id, this.selectedProduct)
        .subscribe({
          next: (updatedProduct) => {
            console.log('Produit mis à jour:', updatedProduct);
            this.isEditMode = false;  // Désactiver le mode édition
            this.selectedProduct = {};  // Réinitialiser le produit sélectionné
            this.refreshProducts();  // Rafraîchir la liste des produits
          },
          error: (err) => {
            console.error('Erreur lors de la mise à jour du produit:', err);
          },
        });
    }
  }

  // Fonction pour annuler l'édition d'un produit
  cancelEdit(): void {
    this.isEditMode = false;  // Désactiver le mode édition
    this.selectedProduct = {};  // Réinitialiser le produit sélectionné
  }

  // Fonction pour supprimer un produit
  deleteProduct(id: number): void {
    this.produitsService.deleteProduct(id).subscribe({
      next: () => {
        console.log('Produit supprimé');
        this.refreshProducts();  // Rafraîchir la liste des produits après suppression
      },
      error: (err) => {
        console.error('Erreur lors de la suppression du produit:', err);
      },
    });
  }

  // Fonction pour ajouter un nouveau produit
  addProduct(): void {
    if (this.newProduct.name && this.newProduct.stock >= 1) {
      this.produitsService.addProduct(this.newProduct).subscribe({
        next: (addedProduct) => {
          console.log('Nouveau produit ajouté:', addedProduct);
          this.newProduct = { name: '', stock: 0 };  // Réinitialiser le produit après ajout
          this.refreshProducts();  // Rafraîchir la liste des produits
        },
        error: (err) => {
          console.error('Erreur lors de l\'ajout du produit:', err);
        },
      });
    }
  }

  // Fonction pour rafraîchir la liste des produits
  refreshProducts(): void {
    this.produitsService.getProducts().subscribe({
      next: (data) => {
        this.produits = data;  // Mettre à jour la liste des produits
      },
      error: (err) => {
        console.error('Erreur de récupération des produits:', err);
      },
    });
  }
}