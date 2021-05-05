import { firestore } from "firebase";
import auth from "../auth";

const env = process.env.NODE_ENV === "production" ? "-prod" : "-test";

const collectionName = "splitabill-user" + env;

const user = {
  getUser: function() {
    return new Promise((resolve, reject) => {
      try {
        const email = auth.user().email;
        firestore()
          .collection(collectionName)
          .where("email", "==", email)
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
          email: auth.user().email,
          darkmode: false,
        };

        ref.set(user);
        user.id = ref.id;
        resolve(user);
      } catch (e) {
        reject(e);
      }
    });
  },
  updateUser: async function(user) {
    const id = user.id;
    let data = { ...user };
    delete data.id;

    await firestore()
      .collection(collectionName)
      .doc(id)
      .update(data);
  },
};

export default user;
