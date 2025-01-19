import { Router, RouterModule } from '@angular/router';
import { Component, OnInit } from "@angular/core";
import { FooterComponent } from "../../footer/footer.component";
import { HttpLoginService } from "../http-login.service";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-root',
  imports: [FooterComponent, CommonModule, RouterModule, FormsModule],
  templateUrl: './connection.component.html',
  styleUrl: './connection.component.css'
})


export class ConnectionComponent implements OnInit{

  authData = { username: '', password: '' };
  errorMessage: string = '';
  username: string = ''; // Nom d'utilisateur connect
 

  constructor(private httpLoginService: HttpLoginService, private router: Router) { }
  
  ngOnInit() {
   // Vérifiez si un utilisateur est déjà connecté
   const storedUsername = localStorage.getItem('username');
   if (storedUsername) {
     this.username = storedUsername;
   }

  }

  onSubmit() {
    this.httpLoginService.login(this.authData).subscribe({
      next: (response) => {
        console.log('Connexion réussie: ', this.authData.username , response);
        localStorage.setItem('token', response.token); // Stocker le token
        localStorage.setItem('username', this.authData.username);
        this.username = this.authData.username;
        this.router.navigate(['/accueil']); // Naviguer vers une autre page
        
      },
      error: (error) => {
        this.errorMessage = 'Erreur de connexion avec l\'api !!!'; 
        console.error("Erreur de connection avec l'api",error);
      }
    });
  }

  logout() {
    localStorage.removeItem('token'); // Supprime le token
    this.router.navigate(['/accueil']); // Redirige vers la page d'accueil
  }
}

