import { inject, injectable } from "inversify";
import { UserLoginDto } from "./dto/user-login.dto";
import { UserRegisterDto } from "./dto/user-register.dto";
import { User } from "./user.entity";
import { IUserService } from "./users.service.interface";
import { Types } from "../types";
import { ConfigService } from "../config/config.service";
import { UsersRepository } from "./users.repisitory";
import { UserModel } from "@prisma/client";
import { compare } from "bcryptjs";

@injectable()
export class UserService implements IUserService {
    constructor(
        @inject(Types.ConfigService) private configService: ConfigService,
        @inject(Types.UsersRepository) private usersRepository: UsersRepository
    ){}
    async createUser({ email, name, password }:  UserRegisterDto): Promise<UserModel | null>{
        const newUser = new User(email, name)
        const salt: string = this.configService.getKey("SALT")
        console.log(salt);
		await newUser.setPassword(password, Number(salt));
        const existedUser = await this.usersRepository.find(newUser.email);
  
        if(existedUser){
            return null;
        }

        return this.usersRepository.create(newUser)
    };

    async validateUser({ email, password }: UserLoginDto): Promise<boolean>{
        const user = await this.usersRepository.find(email);

        if(!user){
            return false;
        }

        const newUser = new User(user.email, user.name, user.password);

        return newUser.comparePassword(password);
    };
}