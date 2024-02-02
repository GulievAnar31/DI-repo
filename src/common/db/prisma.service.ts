import { PrismaClient } from "@prisma/client";
import { injectable, inject } from "inversify";
import { Types } from "../../types";
import { LoggerService } from "../../logger/logger.service";

@injectable()
export class PrismaService {
    client: PrismaClient

    constructor(
		@inject(Types.LoggerService) private logger: LoggerService,
    ){
        this.client = new PrismaClient();
    }

    async connect(){
        try {
            await this.client.$connect();
            this.logger.log('[PrismaService] connected');
        } catch(err){
            if(err instanceof Error){
                this.logger.error('[PrismaService] error of connection: ' + err.message);
            }
        }
    }

    async disconnect(){
        await this.client.$disconnect();
        this.logger.log('[PrismaService] disconnected');
    }
}