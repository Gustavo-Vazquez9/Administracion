import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  public items: MenuItem[] =[];

  ngOnInit() {
      this.items = [
          {
              label: 'Administracion',
              icon: 'pi pi-fw pi-dollar',
              routerLink:['/admin']
          },
          {
              label: 'Historial',
              icon: 'pi pi-fw pi-clock',
              routerLink:['/historial']
          },
          {
            label: 'Cerrar Sesion',
            icon: 'pi pi-fw pi-lock'
        }
      ];
  }

}
