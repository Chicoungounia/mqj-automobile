import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { HttpUtilisateursService } from './http-utilisateurs.service';

@Component({
  selector: 'app-utilisateurs',
  imports: [FooterComponent],
  templateUrl: './utilisateurs.component.html',
  styleUrl: './utilisateurs.component.css'
})
export class UtilisateursComponent implements OnInit {


  constructor(private UtilisateursService: HttpUtilisateursService) { }
  
  ngOnInit() {
    let authBody = {"username": "admin", "password": "pwd"}

    this.UtilisateursService.login(authBody).subscribe((value) => {
      console.log(value);
      localStorage.setItem('token', value.token);

      this.UtilisateursService.getUser().subscribe(value => {
        console.table(value);
      })
    });
  }

}
