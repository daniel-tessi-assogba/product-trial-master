import { Component } from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import { ToolbarModule } from 'primeng/toolbar';
import { SplitterModule } from 'primeng/splitter';
import { CommonModule } from '@angular/common';
import {PanelMenuComponent} from "../../../shared/ui/panel-menu/panel-menu.component";
import {AuthService} from "../../../auth/services/auth.service";

// Adjust path if needed

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    ToolbarModule,
    SplitterModule,
    PanelMenuComponent // Your custom sidebar/menu
  ],
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.scss']
})
export class DashboardLayoutComponent {
  constructor(private authService: AuthService, private router: Router) {}
  title = 'Dashboard';
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}

