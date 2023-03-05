import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent {
  isLogged: boolean = false;

  constructor(public authService: AuthService, private router: Router) {}

  logout(event: Event) {
    event.preventDefault();
    this.router.navigate(['/admin', 'login']);
  }
}
