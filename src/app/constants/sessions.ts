export const REQUEST_OAUTH = '[Session] request auth';
export const REQUEST_OAUTH_COMPLETE = '[Session] request auth complete';
export const REQUEST_OAUTH_ERROR = '[Session] request auth error';
export const REQUEST_DESTROY_OAUTH = '[Session] request destroy auth';
export const REQUEST_DESTROY_OAUTH_COMPLETE = '[Session] request destroy auth complete';
export const REQUEST_DESTROY_OAUTH_ERROR = '[Session] request destroy auth error';
export const REQUEST_CURRENT_USER = '[Session] request current user';
export const REQUEST_CURRENT_USER_COMPLETE = '[Session] request current user complete';
export const REQUEST_CURRENT_USER_ERROR = '[Session] request current user error';
export const REQUEST_UPDATE_ACCOUNT = '[Session] request update account';
export const REQUEST_UPDATE_ACCOUNT_COMPLETE = '[Session] request update account complete';
export const REQUEST_UPDATE_ACCOUNT_ERROR = '[Session] request update account error';
export const REQUEST_CHANGE_PASSWORD = '[Session] request change password';
export const REQUEST_CHANGE_PASSWORD_COMPLETE = '[Session] request change password complete';
export const REQUEST_CHANGE_PASSWORD_ERROR = '[Session] request change password error';
export const REQUEST_REFRESH_TOKEN = '[Session] request refresh token';
export const REQUEST_REFRESH_TOKEN_COMPLETE = '[Session] request refresh token complete';
export const REQUEST_RECOVER_PASSWORD = '[Session] request recover password';
export const REQUEST_RECOVER_PASSWORD_COMPLETE = '[Session] request recover password complete';
export const REQUEST_RECOVER_PASSWORD_ERROR = '[Session] request recover password error';
export const DATATABLE_SETTINGS = {
  'sDom': '<\'table-responsive\'t><\'row\'<p i>>',
  'sPaginationType': 'full_numbers',
  'scrollCollapse': true,
  'oLanguage': {
    'sLengthMenu': '_MENU_ ',
    'sInfo': '<b>_START_ groupes sur _END_</b> sur un total de _TOTAL_.'
  },
  'iDisplayLength': 10,
  'bDestroy' : true,
  'bPaginate': true,
  'bSort': true,
  retrieve: true
};
