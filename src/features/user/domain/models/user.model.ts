// Model: Representa nuestra entidad de dominio. Es cómo queremos usar los datos
// internamente en nuestros componentes y lógica de negocio.
export interface UserModel {
  id: string;
  fullName: string;
  contactEmail: string;
  phoneNumber: string;
  websiteUrl: string;
  companyName: string;
  companyPhrase: string;
}
