import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { HttpClientsService } from './http-clients.service';

@Component({
  selector: 'app-clients',
  imports: [FooterComponent],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.css'
})
export class ClientsComponent implements OnInit {
  
  clients: any[] = []; 
  
  constructor(private produitsClients: HttpClientsService) { }

  ngOnInit(): void {

    let authBody = {"username": "admin", "password": "pwd"}

    this.produitsClients.login(authBody).subscribe((value) => {
      console.log(value);
      localStorage.setItem('token', value.token);
    
    this.produitsClients.getClients().subscribe(value => {
        console.table(value); 
      },
    
    );
  });
  }
}


