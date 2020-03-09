import { Action } from '@ngrx/store';

import * as notificationConstant from '../constants/notifications';

export class NotifyUser implements Action {
  readonly type = notificationConstant.NOTIFY_USER;
  constructor(public payload: Object) { }
}

export class DeleteNotification implements Action {
  readonly type = notificationConstant.DELETE_NOTIFICATION;
  constructor(public payload: string | number) { }
}

export type Actions = NotifyUser | DeleteNotification;
