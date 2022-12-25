import { removeOldAccessTokens } from './removeOldAccessToken';
import { removeOldActionTokens } from './removeOldActionToken';

export const cronRunner = ():void => {
    removeOldAccessTokens.start();
    removeOldActionTokens.start();
};
