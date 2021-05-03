import firebase from "firebase/app";
import "firebase/firebase-auth";
import * as firebaseui from "firebaseui";
import router from "./router";
import DB from "./services/DB";
import store, { STORE_COMMITS } from "./store";

const config = {
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: "bogsynth.firebaseapp.com",
  databaseURL: "https://bogsynth.firebaseio.com",
  projectId: "bogsynth",
  storageBucket: "bogsynth.appspot.com",
  messagingSenderId: "359303561397",
  appId: "1:359303561397:web:2d73a7613b08ebd2",
};

const auth = {
  context: null,
  uiConfig: null,
  ui: null,

  init(context) {
    this.context = context;

    firebase.initializeApp(config);
    this.uiConfig = {
      signInSuccessUrl: "settlements",
      signInOptions: [
        {
          provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          customParameters: { prompt: "select_account" },
        },
      ],
    };
    this.ui = new firebaseui.auth.AuthUI(firebase.auth());

    firebase.auth().onAuthStateChanged(async (user) => {
        console.log('state changed', user)
      if (user) {
        let account = await DB.user.getUser();
        if (!account) {
          account = await DB.user.createUser();
        }
        DB.settlements.connect();
        store.commit(STORE_COMMITS.SET_CURRENT_USER, user);
        router
          .push("/settlements")
          .catch(() => {})
          .finally();
      } else {
        router
        .push("/landing")
        .catch(() => {})
        .finally(); 
      }
    });
  },
  authForm(container) {
    this.ui.start(container, this.uiConfig);
  },
  user() {
    return this.context ? firebase.auth().currentUser : null;
  },
  logout() {
    this.context.$store.commit(STORE_COMMITS.SET_CURRENT_USER, null);

    firebase
      .auth()
      .signOut()
      .then(
        function() {
          // Sign-out successful.
          //console.log("Logout successful");
          router.push("/");
        },
        function(error) {
          console.log(error);

          // An error happened.
          router.push("/");
        }
      );
  },
};

export default auth;
