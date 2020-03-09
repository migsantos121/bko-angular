import { Action } from '@ngrx/store';

import * as exportsConstants from '../constants/export';

export class RequestSendNotifComplete implements Action {
  readonly type = exportsConstants.REQUEST_SEND_NOTIF_COMPLETE;
  constructor(public payload: any) { }
}


export class RequestSendReportComplete implements Action {
  readonly type = exportsConstants.REQUEST_SEND_REPORT_COMPLETE;
  constructor(public payload: any) { }
}
export type Actions =
  | RequestSendReportComplete
  | RequestSendNotifComplete;

