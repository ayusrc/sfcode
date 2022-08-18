import {Component, OnInit} from '@angular/core';
import {ApiService} from '../api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  loggedIn: boolean;

  constructor(private dataService: ApiService) {
  }

  ngOnInit(): void {
    this.dataService.getLoggedInState.subscribe(state => this.changeState(state));
    this.loggedIn = this.dataService.isLoggedIn();
  }

  private changeState(state: boolean): void {
    this.loggedIn = state;
  }

}
