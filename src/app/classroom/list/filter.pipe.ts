import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(classroms: any, term: any): any {

    let _classrooms = classroms;

    if (typeof term !== 'undefined') {
      _classrooms = classroms.filter(elem => {
        let _term = term.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
        let _value = elem.aula_descricao.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
        return _value.toLowerCase().includes(_term.toLowerCase());
      });
    }

    return _classrooms;

  }

}
