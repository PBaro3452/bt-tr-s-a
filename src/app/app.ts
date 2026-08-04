import { Component, signal } from '@angular/core';
import { RouterOutlet } from "../../node_modules/@angular/router/types/_router_module-chunk";
@Component({
  selector: 'app-root',
  imports: [ RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('bai-tap-tra-sua');
  protected readonly ShopName = signal<string>('QUAN TRA SUA 32');
}