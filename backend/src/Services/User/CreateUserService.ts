import dotenv from "dotenv";
dotenv.config();
import { randomUUID } from "crypto";
import { hash } from "bcrypt";
import prismaClient from "../../prisma";
import { apiEmail } from "../../Utils/apiMessenger";
import { BadRequestError } from "../../Utils/badRequestExtend";
import { isEmail } from "validator";
import { Normalizer } from "../../Utils/normalizer";
import { SecurityService } from "../../classes/security";

interface AddressRequest {
  street: string;
  number: string;
  zipcode: string;
  state: string;
  city: string;
  neighborhood: string;
  complement?: string;
}
interface UserRequest {
  name: string;
  email: string;
  //birthday: Date,
  password: string;
  cpf: string;
  phone_number: string;
  //address?: AddressRequest
  verified?: boolean;
}

class CreateUserService {
  private async verifyUser(email: string) {
    return await prismaClient.user.findFirst({
      where: { email },
    });
  }
  async execute({
    name,
    email,
    /*birthday,*/ password,
    cpf,
    phone_number,
    /*address,*/ verified,
  }: UserRequest) {
    const userExiste = await this.verifyUser(email);

    if (userExiste) {
      throw new BadRequestError("Email já cadastrado.");
    }
    if (!isEmail(email)) {
      throw new BadRequestError("Email inválido");
    }

    const passwordHash = await SecurityService.hash(password);
    const avatarSeed = `flixnext-${randomUUID()}`;
    const avatar = `https://api.dicebear.com/10.x/adventurer/svg?seed=${avatarSeed}&backgroundColor=d42c2c&borderRadius=50&scale=1&rotate=0&translateX=0&translateY=0`;

    const user = await prismaClient.user.create({
      data: {
        name,
        email: Normalizer.email(email),
        //birthday,
        password: passwordHash,
        cpf,
        phone_number,
        verified,
        avatar,
        /*address: address
                    ? {
                        create: {
                            street: address.street,
                            number: address.number,
                            neighborhood: address.neighborhood,
                            zipcode: address.zipcode,
                            city: address.city,
                            complement: address.complement ?? null,
                            state: address.state,
                        }
                    } : undefined*/
      },
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
        cpf: true,
        phone_number: true,
        //address: true
      },
    });

    //return user
    if (user) {
      let responses = { user, systemNotify: "" };

      try {
        const systemNotification = await apiEmail.post("/internal/new/user", {
          name: user.name,
          email: user.email,
          //birthday: birthday,
          password: password,
        });
        responses = {
          user,
          systemNotify:
            systemNotification.data.data.accepted.length > 0
              ? "email enviado"
              : "email não enviado",
        };
      } catch (err) {
        console.warn("Erro ao enviar emails");
        console.error(err);
        //throw new BadRequestError("Erro ao enviar email")
      }
      return responses;
    } else {
      throw new BadRequestError("Usuário não criado.");
    }
  }
}

export { CreateUserService };
