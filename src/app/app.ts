import { Component, signal, inject } from '@angular/core';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterOutlet } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-root',
  imports: [ RouterOutlet, MatToolbarModule,MatIconModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('bai-tap-tra-sua');
  protected readonly ShopName = signal<string>('QUAN TRA SUA 32');
 private readonly iconRegistry = inject(MatIconRegistry);
 private readonly sanitizer = inject(DomSanitizer);
  constructor()
  {
    this.iconRegistry.addSvgIcon('add',this.sanitizer.bypassSecurityTrustResourceUrl('icons/add.svg'));
    this.iconRegistry.addSvgIcon('remove',this.sanitizer.bypassSecurityTrustResourceUrl('icons/remove.svg'));
    this.iconRegistry.addSvgIcon('local-drink',this.sanitizer.bypassSecurityTrustResourceUrl('icons/local-drink.svg'));
  }
}