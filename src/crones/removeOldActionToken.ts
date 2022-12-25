import { CronJob } from 'cron';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { TokenDb } from '../models';

dayjs.extend(utc);

export const removeOldActionTokens = new CronJob(
    '* 0 * * * *',
    async ():Promise<void> => {
        try {
            const dayAgo = dayjs().utc().subtract(1, 'day');
            await TokenDb.deleteMany({ createdAt: { $lte: dayAgo } });
        } catch (e:any) {
            console.log(e.message);
        }
    }
);
