import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-nomina',
  templateUrl: './nomina.component.html',
  styleUrls: ['./nomina.component.css']
})
export class NominaComponent {
  loading = false;
  obtenerNomina: number = 8000;
  formGroup!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private loadingService: ServicesService,
    private router:Router
  ){
  }

  ingresarAdmin()
  {
    this.loading = true;
    setTimeout(() => {
      this.loadingService.setLoading().subscribe( () =>
      {
        this.loading=false;
        this.loadingService.setNomina(this.obtenerNomina);
        this.router.navigate(['admin']);
      }
      )
    }, 1000);
  }

  ngOnInit() {

    this.formGroup = this.formBuilder.group(
      {
        nomina: ['', [Validators.required]]
      }
    );
  }
}
