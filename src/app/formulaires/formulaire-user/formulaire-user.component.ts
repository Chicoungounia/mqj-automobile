import { Component } from '@angular/core';
import { HttpUtilisateursService } from '../../utilisateurs/http-utilisateurs.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from '../../footer/footer.component';

@Component({
  selector: 'app-formulaire-user',
  imports: [CommonModule, FormsModule, FooterComponent],
  templateUrl: './formulaire-user.component.html',
  styleUrl: './formulaire-user.component.css'
})
export class FormulaireUserComponent {

    newUser = {
    username: '',
    role: '',
    password: ''
  };
 
  error = '';

  constructor(private httpUser: HttpUtilisateursService, private router: Router) {}

  onSubmit() {
    this.httpUser.addUser(this.newUser).subscribe({
      next: (response) => {
        console.log('Client ajouté:', response);
        alert(`L'utilisateur "${response.username}" a été ajouté avec succès !`);
        this.newUser = response
        this.router.navigate(['/utilisateurs']); // Redirige vers la page des clients après l'ajout
      },
      error: (error) => {
        console.error('Erreur lors de l\'ajout de l\'utilisateur:', error);
        alert(`! L'opération a échouée et l'utilisateur n'a pas été ajouté !`);
        

      }
    });
  }

}

