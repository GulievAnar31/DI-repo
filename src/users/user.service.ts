import { inject, injectable } from "inversify";
import { UserLoginDto } from "./dto/user-login.dto";
import { UserRegisterDto } from "./dto/user-register.dto";
import { User } from "./user.entity";
import { IUserService } from "./users.service.interface";
import { Types } from "../types";
import { ConfigService } from "../config/config.service";

@injectable()
export class UserService implements IUserService {
    constructor(@inject(Types.ConfigService) private configService: ConfigService){}
    async createUser({ email, name, password }:  UserRegisterDto): Promise<User | null>{
        const newUser = new User(email, name)
        const salt: string = this.configService.getKey("SALT")
        console.log(salt);
		await newUser.setPassword(password, Number(salt));
        // проверка что он есть если есть возвращаем null если нет создаем 
        return null;
    };

    async validateUser(dto: UserLoginDto): Promise<boolean>{
        return false;
    };
}