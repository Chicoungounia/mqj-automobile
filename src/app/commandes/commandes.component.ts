import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { HttpCommandesService } from './http-commandes.service';

@Component({
  selector: 'app-commandes',
  imports: [FooterComponent],
  templateUrl: './commandes.component.html',
  styleUrl: './commandes.component.css'
})
export class CommandesComponent implements OnInit {
  
  produits: any[] = []; 
  
  constructor(private commandesService: HttpCommandesService) { }

  ngOnInit(): void {

    let authBody = {"username": "admin", "password": "pwd"}

    this.commandesService.login(authBody).subscribe((value) => {
      console.log(value);
      localStorage.setItem('token', value.token);
    
    this.commandesService.getCommandes().subscribe(value => {
        console.table(value); 
      },
    
    );
  });
  }
}


