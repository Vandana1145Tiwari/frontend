import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
  public initials: string = null;
  public username: string = '';
  isAuthenticated = false;
  collapsed = true;
  private userSubscription: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.userSubscription = this.authService.user.subscribe((user) => {
      console.log('User is authenticated: ' + this.isAuthenticated);
      this.isAuthenticated = !!user;
      if (user) {
        this.initials = Array.from(user.username)[0];
        this.username = user.username;
      }
    });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  onLogout(): void {
    this.authService.logout();
  }
}
