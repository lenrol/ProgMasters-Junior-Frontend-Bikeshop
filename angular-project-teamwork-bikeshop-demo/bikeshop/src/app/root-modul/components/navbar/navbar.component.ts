import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from '../../service/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public loggedInStatus$?: Observable<boolean | null>;

  constructor(private loginService: LoginService) { this.loggedInStatus$ = this.loginService.loggedInStatus$ }

  ngOnInit(): void {
  }

  public async logout(): Promise<void> {
    await this.loginService.logout()
  }

}
