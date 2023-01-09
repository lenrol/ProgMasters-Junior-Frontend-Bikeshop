import { apiKey, appId, backup_apiKey, backup_appId } from './firebase';

//* BACKUP Firebase
export const environment = {
  firebase: {
    apiKey: backup_apiKey,
    authDomain: "fir-app-demo-fdani.firebaseapp.com",
    projectId: "fir-app-demo-fdani",
    storageBucket: "fir-app-demo-fdani.appspot.com",
    messagingSenderId: "3909591928",
    appId: backup_appId
  },
  production: false
};

//* ÉLES FIREBASE
// export const environment = {
//   firebase: {
//     apiKey: apiKey,
//     authDomain: "bikeshop-c72f2.firebaseapp.com",
//     projectId: "bikeshop-c72f2",
//     storageBucket: "bikeshop-c72f2.appspot.com",
//     messagingSenderId: "831043474599",
//     appId: appId
//   },
//   production: false
// };
