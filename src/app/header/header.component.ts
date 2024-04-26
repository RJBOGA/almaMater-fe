import { Component } from '@angular/core';
import { AppModule } from '../app.module';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  constructor(private app: AppModule){}

  goToPage(pageName: String){
    this.app.goToPage(pageName);
  }

}
