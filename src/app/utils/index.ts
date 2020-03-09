declare var jQuery: any;

import * as sessionConstants from '../constants/sessions';
import { AbstractControl } from '@angular/forms';

export function dataTableLify() {
  const table = jQuery('.table');
  jQuery('#search-table').keyup(function () {
    table.fnFilter(jQuery(this).val());
  });
  table.dataTable(sessionConstants.DATATABLE_SETTINGS);
}

export function updateURLParameter(url, param, paramVal) {
  console.log(url);
  let newAdditionalURL = '';
  let tempArray = url.split('?');
  const baseURL = tempArray[0];
  const additionalURL = tempArray[1];
  let temp = '';
  if (additionalURL) {
    tempArray = additionalURL.split('&');
    for (let i = 0; i < tempArray.length; i++) {
      if (tempArray[i].split('=')[0] !== param) {
        newAdditionalURL += temp + tempArray[i];
        temp = '&';
      }
    }
  }

  const rows_txt = temp + '' + param + '=' + paramVal;
  return baseURL + '?' + newAdditionalURL + rows_txt;
}
