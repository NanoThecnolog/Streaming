export type NewUserProps = {
    name: string;
    email: string;
    birthday: string;
    password: string;
    cpf: string;
    phone_number: string;
    address?: {
        street: string;
        number: string;
        zipcode: string;
        state: string;
        city: string;
        neighborhood: string;
        complement?: string;
    };
};