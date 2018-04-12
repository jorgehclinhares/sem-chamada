import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(classroms: any, term: any): any {

    let _classrooms = classroms;

    if (typeof term !== 'undefined') {
      _classrooms = classroms.filter(elem => {
        let _term = term.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase();
        let match = false;

        if (elem.nfd_aula_descricao.toLowerCase().includes(_term)) {
          match = true;
        } else if (elem.nfd_modulo_descricao.includes(_term)) {
          match = true;
        } else if (elem.nfd_areaconhecimento_descricao.includes(_term)) {
          match = true;
        } else if (elem.nfd_disciplina_descricao.includes(_term)) {
          match = true;
        }

        return match;
      });
    }

    return _classrooms;

  }

}
