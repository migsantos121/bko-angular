import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'etatProduit' })
export class EtatProduitPipe implements PipeTransform {
  transform(value: string, args: string[]): any {
    const tab = ['Neuf', 'Occasion'];
    if (!value) { return value; }

    return tab[value];
  }
}

@Pipe({ name: 'typeAnnonce' })
export class TypeAnnoncePipe implements PipeTransform {
  transform(value: string, args: string[]): any {
    const tab = ['Offre', 'Service', 'Demande'];
    if (!value) { return value; }

    return tab[value];
  }
}

@Pipe({ name: 'etatAnnonce' })
export class EtatAnnoncePipe implements PipeTransform {
  transform(value: string, args: string[]): any {
    const tab = ['En attente', 'Valide', 'Rejete', '', 'Signale'];
    if (!value) { return value; }

    return tab[value];
  }
}

@Pipe({ name: 'roleModerateur' })
export class RoleModerateurPipe implements PipeTransform {
  transform(value: string, args: string[]): any {
    const tab = ['Moderateur', 'Chef moderateur'];
    if (!value) { return value; }

    return tab[value];
  }
}

@Pipe({ name: 'keys' })
export class KeysPipe implements PipeTransform {
  transform(value, args: string[]): any {
    const keys = [];
    for (const enumMember in value) {
      if (!isNaN(parseInt(enumMember, 10))) {
        keys.push({ key: enumMember, value: value[enumMember] });
      }
    }
    return keys;
  }
}

@Pipe({ name: 'sortBy' })
export class SortPipe implements PipeTransform {
  transform(array: Array<string>, args: string): Array<string> {
    array.sort((a: any, b: any) => {
      if (a[args] < b[args]) {
        return -1;
      } else if (a[args] > b[args]) {
        return 1;
      } else {
        return 0;
      }
    });
    return array;
  }
}
