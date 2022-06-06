const config = require("../config");

module.exports = async (snap, context) => {
  try {

    if (config.CHAT_WIDGET.SEND_EMAIL_ON_RECEIVE !== "true") return;

    if (config.EMAIL.POSTMARK_SERVER === "") return;

    if (process.env.NODE_ENV !== "production") return;

    const newChatMessage = snap.data();

    if (newChatMessage.message === undefined || newChatMessage.message === "")
      return;

    if (newChatMessage.reply) return;

    const postmark = await require("postmark");

    const client = new postmark.ServerClient(config.EMAIL.POSTMARK_SERVER);

    await client.sendEmailWithTemplate({
      From: config.EMAIL.EMAIL_SENDER_ADDRESS,
      To: config.CHAT_WIDGET.CHAT_RECEIVE_EMAIL,
      TemplateAlias: "chat-notification",
      TemplateModel: {
        product_url: config.EMAIL.PRODUCT_URL,
        product_name: config.EMAIL.PRODUCT_NAME,
        twitter_url: config.EMAIL.TWITTER_URL,
        company_name: config.EMAIL.COMPANY_NAME,
        message: newChatMessage.message,
        chat_sender: `Email: ${newChatMessage.customerEmail} Id: ${context.params.userId}`,
        chat_websiteURL: config.CHAT_WIDGET.CHAT_WEBSITE_URL,
        timestamp: new Date(
          newChatMessage.createdAt._seconds * 1000
        ).toUTCString(),
        company_address: config.EMAIL.COMPANY_ADDRESS,
      },
    });
  } catch (error) {


    const functions = await require("firebase-functions");
    functions.logger.log(error);
  }
};
