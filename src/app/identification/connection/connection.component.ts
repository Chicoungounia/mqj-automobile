import { Component, OnInit } from "@angular/core";
import { FooterComponent } from "../../footer/footer.component";
import { HttpLoginService } from "../http-login.service";


@Component({
  selector: 'app-root',
  imports: [FooterComponent],
  templateUrl: './connection.component.html',
  styleUrl: './connection.component.css'
})
export class ConnectionComponent implements OnInit{


  constructor(private httpLoginService: HttpLoginService) { }
  
  ngOnInit() {
    let authBody = {"username": "admin", "password": "pwd"}

    this.httpLoginService.login(authBody).subscribe((value) => {
      console.log(value);
      localStorage.setItem('token', value.token);

      this.httpLoginService.getUser().subscribe(value => {
        console.log(value);
      })
    });
  }
}

