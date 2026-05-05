// Domain Model: Representa al usuario autenticado en nuestra app.
// Solo contiene lo que necesitamos internamente, no lo que devuelve la API.
export interface AuthUserModel {
  id: string;
  name: string;
  email: string;
}
