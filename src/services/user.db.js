import { firestore } from "firebase";
import auth from "../auth";

const collectionName = "splitabill-user";

const user = {
  getUser: function() {
    return new Promise((resolve, reject) => {
      try {
        const googleId = auth.user().uid;
        firestore()
          .collection(collectionName)
          .where("googleId", "==", googleId)
          .get()
          .then((snapshot) => {
            if (snapshot.docs.length > 0) {
              let data = snapshot.docs[0].data();
              data.id = snapshot.docs[0].id;
              resolve(data);
            } else resolve(null);
          })
          .catch((e) => {
            reject(e);
          });
      } catch (e) {
        reject(e);
      }
    });
  },
  createUser: function() {
    return new Promise((resolve, reject) => {
      try {
        let ref = firestore()
          .collection(collectionName)
          .doc();

        let user = {
          email: auth.user().email
        };

        ref.set(user);
        user.id = ref.id;
        resolve(user);
      } catch (e) {
        reject(e);
      }
    });
  },
};

export default user;
