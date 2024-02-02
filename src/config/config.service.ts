import { IConfifService } from "./config.service.interface";
import { DotenvConfigOutput, DotenvParseOutput, config } from "dotenv";
import { inject, injectable } from "inversify";
import { Types } from "../types";
import { LoggerService } from "../logger/logger.service";

@injectable()
export class ConfigService implements IConfifService {
    private config: DotenvParseOutput;

    constructor(
		@inject(Types.LoggerService) private logger: LoggerService,
    ){
        const result: DotenvConfigOutput = config();

        if(result.error){
            this.logger.error('Не удалось прочитать файл dotenv или он отстуствует');
        } else {
            this.logger.log('[ConfigService] Конфигурация загружена');
            this.config = result.parsed as DotenvParseOutput;
        }
    }
    getKey(key: string): string {
        return this.config[key];
    };
}