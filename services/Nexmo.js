'use strict';

const Nexmo = require('nexmo');

/**
 * Nexmo.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

module.exports = {

    sendSms: async (sender, recipient, order) => {
            let config = strapi.config.nexmo;
            let nexmo = new Nexmo(config);
            
            let orderType = order.meta.type === "pick-up" ? "PU" : "DEL";

            let orderPlace = order.meta.type === "pick-up" ? order.meta.branch : order.meta.address;

            let payment = order.meta.payment === "paypal" ? "Paid via Paypal" : "COD";

            let message = `New order from ${order.user.name} (${order.meta.phone}). ${orderType} ${order.meta.date} ${order.meta.time} 
            at ${orderPlace}. ${payment}`;

            var sendSms = new Promise(function(resolve, reject) {
            nexmo.message.sendSms(sender, recipient, message, (error, response) => {
            if (error) {
                // throw error;
                return reject(error);
            } else {
                // console.log("Create Payment Response");
                // console.log(payment);
                return resolve(response);
            }
            });
        });

        var sms = null;
        try {
            sms = await sendSms;
        } catch(err) {
            console.log(err);
            return 'error';
        }

        return sms;
    }

};
