import { CronJob } from 'cron';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { AuthDb } from '../models';

dayjs.extend(utc);

export const removeOldAccessTokens = new CronJob(
    '* 0 * * * *',
    async ():Promise<void> => {
        try {
            const monthAgo = dayjs().utc().subtract(1, 'month');
            await AuthDb.deleteMany({ createdAt: { $lte: monthAgo } });
        } catch (e:any) {
            console.log(e.message);
        }
    }
);
