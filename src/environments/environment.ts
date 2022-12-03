// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  wordpress: {
    api_url: 'https://challenge-international.net/wp-json/wp/v2/',
    auth_url: 'https://challenge-international.net/wp-json/jwt-auth/v1/token'
  },
  firebase:{
    apiKey: "AIzaSyAlTNr-uRpsRo1DL2mUhnBwUpm6rcCFRNo",
    authDomain: "challenge-international.firebaseapp.com",
    databaseURL: "https://challenge-international.firebaseio.com",
    projectId: "challenge-international",
    storageBucket: "challenge-international.appspot.com",
    messagingSenderId: "403180413623",
    appId: "1:403180413623:web:e87124108d61ed45"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
