import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientsService } from '../Services/clients.service';

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.css'],
})
export class CreateClientComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private clientService: ClientsService,
    private router: Router
  ) {}

  newClientForm = this.formBuilder.group({
    clientName: [null],
    clientDesc: [null],
  });

  ngOnInit(): void {}

  clickSubmit() {
    console.log(this.newClientForm.value);
    this.clientService
      .createNewClient(this.newClientForm.value)
      .subscribe((data: {}) => this.router.navigate(['/dashboard']));
  }
}
