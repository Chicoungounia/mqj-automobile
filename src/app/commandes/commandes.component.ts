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

  
    
    this.commandesService.getCommandes().subscribe(value => {
        console.table(value); 
      },
    
    );
  
  }
}


