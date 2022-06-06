const config = require("../config");

module.exports = async (newUser) => {
  try {
    if (config.EMAIL.POSTMARK_SERVER === "") return;

    if (newUser.email === undefined) return;
    const postmark = await require("postmark");

    const client = new postmark.ServerClient(config.EMAIL.POSTMARK_SERVER);

    await client.sendEmailWithTemplate({
      From: config.EMAIL.EMAIL_SENDER_ADDRESS,
      To: newUser.email,
      TemplateAlias: "welcome",
      TemplateModel: {
        product_url: config.EMAIL.PRODUCT_URL,
        product_name: config.EMAIL.PRODUCT_NAME,
        action_url: config.EMAIL.TEMPLATE_WELCOME.ACTION_URL,
        support_email: config.EMAIL.EMAIL_SENDER_ADDRESS,
        sender_name: config.EMAIL.SENDER_NAME,
        twitter_url: config.EMAIL.TWITTER_URL,
        company_name: config.EMAIL.COMPANY_NAME,
        company_address: config.EMAIL.COMPANY_ADDRESS,
      },
    });
  } catch (error) {

    const functions = await require("firebase-functions");
    functions.logger.log(error);
  }
};
