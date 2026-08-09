export type NewUserProps = {
  name: string
  email: string
  //birthday: string;
  password: string
  cpf: string
  phone_number: string
  /*address?: {
        street: string;
        number: string;
        zipcode: string;
        state: string;
        city: string;
        neighborhood: string;
        complement?: string;
    };*/
}
export interface SignUpMethodResponse {
  user: {
    /*address?: {
            number: string;
            id: string;
            street: string;
            neighborhood: string;
            zipcode: string;
            city: string;
            complement: string | null;
            state: string;
            userId: string;
        } | null;*/
    id: string
    name: string
    email: string
    cpf: string | null
    phone_number: string | null
  }
  systemNotify: string
  userNotify: string
}
