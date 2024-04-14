import { Component } from '@angular/core'
import { TranslocoPipe } from '@ngneat/transloco'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [TranslocoPipe],
})
export class HomeComponent {}
