import * as SendgridClient from '@sendgrid/mail';
import { Configs } from '@src/configs';

export const sendgridClient = {
    instance: SendgridClient,
    initialize() {
        SendgridClient.setApiKey(Configs.sendgrid.apiKey);
    }
};
