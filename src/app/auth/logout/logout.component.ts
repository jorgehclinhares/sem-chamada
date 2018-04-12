import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequestService } from '../../providers/request.service';

@Component({
  selector: 'app-logout',
  template: ''
})
export class LogoutComponent implements OnInit {
  constructor(
    private router: Router,
    private request: RequestService
  ) { }

  ngOnInit() {
    this.request.setToken(null);
    this.router.navigateByUrl('/');
  }
}