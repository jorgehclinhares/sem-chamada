import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RequestService } from '../../providers/request.service';
import { ROUTE_TRANSITION } from '../../app.animation';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  animations: [...ROUTE_TRANSITION],
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  messageError: string;

  constructor(
    formBuilder: FormBuilder,
    private request: RequestService,
    private router: Router
  ) {
    this.loginForm = formBuilder.group({
      'email': [null, Validators.compose([Validators.required, Validators.email])],
      'password': [null, Validators.required]
    });
  }

  ngOnInit() {
    if (this.request.getToken()) {
      this.router.navigate(['/classroom']);
    }
  }

  login(value) {
    const request = {
      "operacao": "008",
      "chaveSistema": "356a192b7913b04c54574d18c28d46e6395428ab",
      "login": value.email,
      "senha": value.password
    };

    this.messageError = null;

    this.request.post('http://plurieducacional.com.br/homologacao/pluriidapi/webservice.php', request).subscribe(
      (res) => {
        if (res.hasOwnProperty('erros')) {

          const error = res.erros[0];

          if (error.codigoErro === 22) {
            this.loginForm.controls['password'].setErrors(Validators.required);
          } else if (error.codigoErro === 11) {
            this.loginForm.controls['email'].setErrors(Validators.required);
          } else {
            this.loginForm.controls['email'].setErrors(Validators.required);
            this.loginForm.controls['password'].setErrors(Validators.required);
          }

          this.messageError = error.descricaoErro;

        } else if (res.hasOwnProperty('informacoesUsuario') && res.informacoesUsuario.hasOwnProperty('token')) {
          this.request.setToken(res.informacoesUsuario.token);
          this.router.navigate(['/classroom']);
        }
      },
      (err) => {
        this.messageError = "Desculpe, ocorreu algum problema, tente novamente em instantes."
      }
    );
  }


}
