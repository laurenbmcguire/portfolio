
const firebaseConfig = {apiKey: "AIzaSyCXBxCTQ1QUwnUfPzAmnGvId91JkgptgXY",
  authDomain: "saas-react-a9393.firebaseapp.com",
  projectId: "saas-react-a9393",
  storageBucket: "saas-react-a9393.appspot.com",
  messagingSenderId: "8142728621",
  appId: "1:8142728621:web:93ccc4bb6141f2fde80524",
  measurementId: "G-JPHPYY2CFZ"};
const reCaptchaV3ProviderId = "";

export function getFirebaseConfig() {
  if (!firebaseConfig || !firebaseConfig.apiKey) {
    throw new Error(
      "No Firebase configuration object provided." +
        "\n" +
        "Add your web app's configuration object to firebase-config.js"
    );
  } else {
    return firebaseConfig;
  }
}
export function getRecaptchaProviderConfig() {
  return reCaptchaV3ProviderId;
}
