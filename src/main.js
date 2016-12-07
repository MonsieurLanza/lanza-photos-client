/* eslint-env browser */

import Vue from 'vue';
import App from './App';
import flexImages from './assets/flexImages';

// const pathToApp = '/' + window.location.pathname.substring(1);
const appRoot = 'http://localhost:9104';
const fullURL = appRoot + '/apps/lanza-photos';

let rowHeight = 150;

let vm = new Vue({
  el: '#app',
  template: '<App :photos="photos" />',
  components: { App },
  data: {
    photos: []
  }
});

var headers = new Headers();
headers.append('Accept', 'application/json');
var request = {
  method: 'GET',
  headers: headers,
  mode: 'cors',
  cache: 'default',
  credentials: 'include'
};

fetch(fullURL + '/', request).then(function (response) {
  response.json().then(function (json) {
    vm.photos = json;
    Vue.nextTick(function () {
      /* eslint new-cap: ["error", { "newIsCapExceptions": ["flexImages"] }] no-new: 0 */
      new flexImages({selector: '.photolist', container: '.photo', rowHeight: rowHeight});
    });
  });
});
