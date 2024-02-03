import { PrismaClient } from "@prisma/client";
import { injectable, inject } from "inversify";
import { Types } from "../../types";
import { LoggerService } from "../../logger/logger.service";

@injectable()
export class PrismaService {
	client: PrismaClient;

	constructor(@inject(Types.LoggerService) private logger: LoggerService) {
		this.client = new PrismaClient();
	}

	async connect(): Promise<void> {
		try {
			await this.client.$connect();
			this.logger.log('[PrismaService] Успешно подключились к базе данных');
		} catch (e) {
			if (e instanceof Error) {
				this.logger.error('[PrismaService] Ошибка подключения к базе данных: ' + e.message);
			}
		}
	}

	async disconnect(): Promise<void> {
		await this.client.$disconnect();
	}
}