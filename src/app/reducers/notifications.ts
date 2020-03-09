import * as notificationsActions from '../actions/notifications';
import * as notificationsConstants from '../constants/notifications';

export interface State {
  messages: any[];
  message: {};
};

const notificationInitialState: State = {
  messages: [],
  message: {}
};

export function reducer(state = notificationInitialState, action: notificationsActions.Actions) {
  switch (action.type) {
    case notificationsConstants.NOTIFY_USER:
      return Object.assign({}, state, {
        messages: [action.payload, ...state.messages]
      });
    case notificationsConstants.DELETE_NOTIFICATION:
      return Object.assign({}, state, {
        messages: state.messages.filter((message) => {
          return message.uuid !== action.payload;
        })
      });
    default:
      return state;
  }
}

export const getMessages = (state: State) => state.messages;
