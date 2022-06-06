async function deleteCollection(db, collectionPath, batchSize) {
  const collectionRef = db.collection(collectionPath);
  const query = collectionRef.orderBy("__name__").limit(batchSize);

  return new Promise((resolve, reject) => {
    deleteQueryBatch(db, query, resolve).catch(reject);
  });
}

async function deleteQueryBatch(db, query, resolve) {
  const snapshot = await query.get();

  const batchSize = snapshot.size;
  if (batchSize === 0) {

    resolve();
    return;
  }

  const batch = db.batch();
  snapshot.docs.forEach((doc) => {
    batch.delete(doc.ref);
  });
  await batch.commit();

  process.nextTick(() => {
    deleteQueryBatch(db, query, resolve);
  });
}
let isAdminInitiated = false;
module.exports = async (_, context) => {
  try {
    const userId = context.params.userId;
    const { initializeApp } = await require("firebase-admin/app");
    const { getFirestore } = await require("firebase-admin/firestore");
    if (!isAdminInitiated) {
      initializeApp();
      isAdminInitiated = true;
    }
    const firestore = await getFirestore();

    await deleteCollection(firestore, `chatUsers/${userId}/chatMessages`, 30);
  } catch (error) {

    const functions = await require("firebase-functions");
    functions.logger.log(error);
  }
};
