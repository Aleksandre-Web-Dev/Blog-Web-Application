import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss'],
})
export class AdminHeaderComponent {
  constructor(private auth: AuthService, private router: Router) {}
  logout() {
    this.router.navigate(['/admin', 'login']);
    this.auth.logout();
  }
}
