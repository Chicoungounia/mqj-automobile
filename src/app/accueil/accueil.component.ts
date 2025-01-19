import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accueil',
  imports: [FooterComponent, CommonModule],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.css'
})
export class AccueilComponent {
  isLoggedIn = !!localStorage.getItem('token');
  username: string = ''; // Variable pour stocker le nom d'utilisateur connecté

  constructor(private router: Router) {
       // Récupérer le nom d'utilisateur depuis localStorage
       const storedUsername = localStorage.getItem('username');
       if (storedUsername) {
         this.username = storedUsername;
       }
     }

  // Action pour gérer connexion/déconnexion
  handleAuthAction() {
    if (this.isLoggedIn) {
      // Déconnexion
      localStorage.removeItem('token'); // Supprime le token
      localStorage.removeItem('username'); // Supprime le nom d'utilisateur
      this.isLoggedIn = false;
      this.username = ''; // Réinitialiser le nom d'utilisateur
      this.router.navigate(['/accueil']); // Redirige vers la page d'accueil
      console.log('Vous êtes déconnecté');
    } else {
      // Connexion
      this.router.navigate(['/connection']); // Redirige vers la page de connexion
    }
  }
}