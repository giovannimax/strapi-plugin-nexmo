'use strict';


/**
 * Nexmo.js controller
 *
 * @description: A set of functions called "actions" of the `nexmo` plugin.
 */

module.exports = {

  /**
   * Default action.
   *
   * @return {Object}
   */

  index: async (ctx) => {
    // Add your own logic here.
    let config = strapi.config.nexmo;
    let sender = config.sender;
    let recipient = config.recipient;
    let order = await strapi.models.orders.findOne({ _id: ctx.params.id});
  
    let sms = await strapi.plugins.nexmo.services.nexmo.sendSms(sender, recipient, order);

    if(sms === 'error') {
      return ctx.send('error');
    }

    // Send 200 `ok`
    ctx.send({
      message: sms
    });
  }
};
