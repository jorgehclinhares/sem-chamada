import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { RequestService } from '../../providers/request.service';
import { Router } from '@angular/router';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ClassroomListComponent implements OnInit, OnDestroy {

  searchForm: FormGroup;
  classrooms: Array<any>;
  cardColors: Array<any>;
  colspan: number;
  termSearch: string;
  loadItems: boolean;
  searchSubscription: Subscription;
  requestSubscription: Subscription;

  constructor(
    formBuilder: FormBuilder,
    private request: RequestService,
    private router: Router
  ) {
    this.searchForm = formBuilder.group({
      'term': [null, null]
    });
    this.classrooms = [];
    this.cardColors = ['#8D6E63', '#78909C', '#4c96d1', '#2aa95f', '#ee9d11', '#75256e'];
    this.loadItems = false;
    this.searchForm.controls['term'].disable();

    if (window.innerWidth < 700) {
      this.colspan = 3;
    } else if (window.innerWidth < 950) {
      this.colspan = 1;
    } else {
      this.colspan = 1;
    }
  }

  ngOnInit() {
    this.searchSubscription = this.searchForm.controls['term'].valueChanges.subscribe(
      (value) => {
        if (value && value.length > 2) {
          this.termSearch = value;
        } else {
          this.termSearch = "";
        }
      }
    );

    this.requestSubscription = this.request.get('http://hom.plurieducacional.com.br/hom.semchamada.plurieducacional.com.br/back/public/aulas ', {}).subscribe(
      (res) => {
        this.loadItems = true;
        this.classrooms = res.data.map((elem) => {
          elem['color'] = this.cardColors[`${elem.areaconhecimento_id}`];
          elem['nfd_aula_descricao'] = elem.aula_descricao.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase();
          elem['nfd_modulo_descricao'] = elem.modulo_descricao.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase();
          elem['nfd_areaconhecimento_descricao'] = elem.areaconhecimento_descricao.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase();
          elem['nfd_disciplina_descricao'] = elem.disciplina_descricao.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase();
          return elem;
        });
        this.searchForm.controls['term'].enable();
      },
      (err) => {
        if (err.status === 401) {
          return this.router.navigate(['/logout']);
        }
      }
    );
  }

  @HostListener('window:resize', ['$event']) onResize(event) {
    const element = event.target.innerWidth;

    if (element < 700) {
      this.colspan = 3;
    } else if (element < 950) {
      this.colspan = 1;
    } else {
      this.colspan = 1;
    }
  }

  ngOnDestroy() {
    this.searchSubscription.unsubscribe();
    this.requestSubscription.unsubscribe();
  }

}
