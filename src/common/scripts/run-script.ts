import { INestApplicationContext } from '@nestjs/common';
import { LoggerService } from '@src/modules/logger/services/logger.service';

export async function runScript(app: INestApplicationContext): Promise<void> {
  const loggerService = app.get(LoggerService);
  const [, , scriptArg] = process.argv;
  if (scriptArg?.startsWith('script=')) {
    const scriptName = scriptArg.split('=')[1];
    loggerService.info(`Running script ${scriptName}...`, 'SYSTEM', 'INIT');
    await (await import(`./list/${scriptName}.script`)).default(app);
    loggerService.info(`Script ${scriptName} executed.`, 'SYSTEM', 'INIT');
    process.exit(0);
  }
}
