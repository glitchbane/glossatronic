import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../auth/auth.service';

@Component({
  selector: 'gt-glossary-container',
  templateUrl: './glossary-container.component.html',
  styleUrls: ['./glossary-container.component.css']
})
export class GlossaryContainerComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  doLogout(){
    this.auth.logout();
  }
}
