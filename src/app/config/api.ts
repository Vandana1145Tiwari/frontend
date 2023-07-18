import { environment } from 'src/environments/environment';

export const apiBaseUrl = `${environment.apiBaseUrl}`;

export const api = {
  auth: {
    login: `${apiBaseUrl}user/authenticate`,
    register: `${apiBaseUrl}user/register`
  },
  book: {
    allBooks: `${apiBaseUrl}books`
  }
};
