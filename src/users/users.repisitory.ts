import { UserModel } from "@prisma/client";
import { IUserRepository } from "./user.repisitory.interface";
import { User } from "./user.entity";
import { inject, injectable } from "inversify";
import { Types } from "../types";
import { PrismaService } from "../common/db/prisma.service";

@injectable()
export class UsersRepository implements IUserRepository {
    constructor(@inject(Types.PrismaService) private prismaService: PrismaService){}

    async create({ email, password, name }: User): Promise<UserModel>{
        return this.prismaService.client.userModel.create({
            data: {
                email,
                password,
                name
            }
        })
    }

    async find(email: string): Promise<UserModel | null>{
        return this.prismaService.client.userModel.findFirst({
            where: {
                email,
            }
        })
    }
}