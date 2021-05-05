import { firestore } from "firebase";
import auth from "../auth";
import store, { STORE_COMMITS } from "../store";

const env = process.env.NODE_ENV === 'production' ?
  '-prod' :
  '-test';

const collectionName = "splitabill-settlements" + env;

const settlements = {
  connect: function() {
    const email = auth.user().email;

    firestore()
      .collection(collectionName)
      .where("users", "array-contains", email.toLowerCase())
      .onSnapshot((snapshot) => {
        let docs = [];
        snapshot.docs.forEach((d) => {
          let obj = d.data();
          obj.id = d.id;
          docs.push(obj);
        });
        store.commit(STORE_COMMITS.SET_SETTLEMENTS, docs);
      });
  },
  create: function(title) {
    const email = auth.user().email;

    let settlement = {
      owner: email.toLowerCase(),
      title: title,
      users: [email.toLowerCase()],
      expenses: [],
    };
    firestore()
      .collection(collectionName)
      .doc()
      .set(settlement);
  },
  delete: function(id) {
    firestore()
      .collection(collectionName)
      .doc(id)
      .delete();
  },
  addExpense: async function(id, expense) {
    let doc = await firestore()
      .collection(collectionName)
      .doc(id)
      .get();
    let data = doc.data();
    data.expenses.push(expense);
    await firestore()
      .collection(collectionName)
      .doc(id)
      .set(data);
  },
  updateExpense: async function(id, expense) {
    let doc = await firestore()
      .collection(collectionName)
      .doc(id)
      .get();
    let data = doc.data();
    let index = data.expenses.findIndex((e) => expense.id == e.id);
    data.expenses[index] = expense;

    await firestore()
      .collection(collectionName)
      .doc(id)
      .update(data);
  },
  deleteExpense: async function(id, expense) {
    let doc = await firestore()
      .collection(collectionName)
      .doc(id)
      .get();
    let data = doc.data();
    let index = data.expenses.findIndex((e) => expense.id == e.id);
    data.expenses.splice(index, 1);

    await firestore()
      .collection(collectionName)
      .doc(id)
      .update(data);
  },
  addUser: async function(id, user) {
    let doc = await firestore()
      .collection(collectionName)
      .doc(id)
      .get();
    let data = doc.data();
    data.users.push(user.toLowerCase());
    await firestore()
      .collection(collectionName)
      .doc(id)
      .set(data);
  },
  deleteUser: async function(id, user) {
    let doc = await firestore()
      .collection(collectionName)
      .doc(id)
      .get();
    let data = doc.data();
    let index = data.users.findIndex((e) => e == user.toLowerCase());
    data.users.splice(index, 1);

    data.expenses = data.expenses.filter((e) => e.payedBy != user);

    await firestore()
      .collection(collectionName)
      .doc(id)
      .update(data);
  },
};

export default settlements;
