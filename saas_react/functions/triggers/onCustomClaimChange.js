let isAdminInitiated = false;

module.exports = async (change, context) => {
  try {
    const { initializeApp } = await require("firebase-admin/app");
    const { getAuth } = await require("firebase-admin/auth");

    if (!isAdminInitiated) {
      initializeApp();
      isAdminInitiated = true;
    }
    const uid = context.params.userId;
    const auth = getAuth();

    await auth.getUser(uid);

    const claims = change.after.data() || null;

    if (claims && typeof claims !== "object") {
      const functions = await require("firebase-functions");
      functions.logger.error(
        `Invalid custom claims for user '${uid}'. Must be object, was ${JSON.stringify(
          claims
        )}`,
        { uid }
      );
      return;
    }

    await auth.setCustomUserClaims(uid, claims);

    const functions = await require("firebase-functions");

    functions.logger.info(
      `Claims: ${JSON.stringify(
        claims
      )} set for user '${uid}', logging sync time to Firestore`,
      { uid }
    );
  } catch (error) {

    const functions = await require("firebase-functions");
    functions.logger.log(error);
  }
};
