/* eslint-env browser */
/* global Vue io flexImages tus:true */

const pathToApp = '/' + window.location.pathname.substring(1);
const appRoot = 'http://localhost:9125';
const fullURL = appRoot + pathToApp;
var rowHeight = 150;

var socket = io(appRoot, {path: pathToApp + 'messages'});

// function adjustRows (rootEl, photos, height) {
//   var totalW = 0;
//   var rows = [];
//   var maxW = rootEl.getClientWidth();
//   rows.push([]);
//   var row = 0;
//   for (var i in photos) {
//     if (photos.hasOwnProperty(i)) {
//       var currentSize = photos[i].size.thumb;
//       var ratio = height / currentSize.height;
//       var curw = currentSize.width * ratio;
//
//       totalW += curw;
//       rows[row].push({index: i, width: curw});
//
//       if (totalW > maxW) {
//         var wratio = maxW / totalW;
//         var curh = height * wratio;
//         for (var y = 0; y++; y > rows[row].length) {
//           photos[rows[row][y].index].display = {
//             width: rows[row][y].width * wratio,
//             height: curh
//           };
//         }
//
//         rows.push([]); row++; totalW = 0;
//       }
//     }
//   }
// }

document.addEventListener('DOMContentLoaded', function () {
  var fsBtn = document.getElementById('fullscreen');
  fsBtn.addEventListener('click', toggleFullScreen);

  var zoomInBtn = document.getElementById('zoomin');
  var zoomOutBtn = document.getElementById('zoomout');

  zoomInBtn.addEventListener('click', zoomIn, false);
  zoomOutBtn.addEventListener('click', zoomOut, false);

  Vue.config.silent = false;

  Vue.component('photo', {
    props: ['photo'],
    template: '<li class="photo" :style="cStyle"><a :href="photo.src" :data-big="photo.src" class="lightbox"><img :src="thumb" :alt="photo.title"></a><button v-on:click="deletePhoto">X</button></li>',
    computed: {
      thumb: function () {
        return `${fullURL}/photos/${this['photo'].id}/thumb.jpg`;
      },
      cStyle: function () {
        return `width:${this['photo'].display.width}px;height:${this['photo'].display.height}px;`;
      }
    },
    methods: {
      deletePhoto: function (event) {
        var tof = this.photo;
        if (confirm(`Delete photo ${this.photo.title}?`)) {
          fetch(fullURL + 'photos/' + this.photo.id, {
            method: 'DELETE',
            headers: headers,
            mode: 'cors',
            cache: 'default',
            credentials: 'include'
          }).then(
            function () {
              var index = vm.photos.findIndex(function (el) { return el.id === tof.id; });
              vm.photos.splice(index, 1);
            });
        }
      }
    }
  });

  var vm = new Vue({
    el: '#photo-view',
    data: { photos: [] }
    // beforeUdate: function () {
    //   adjustRows(this.$el, this.photos, rowHeight);
    // }
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

  fetch(fullURL, request).then(function (response) {
    response.json().then(function (json) {
      vm.photos = json;
      Vue.nextTick(function () {
        /* eslint new-cap: ["error", { "newIsCapExceptions": ["flexImages"] }] no-new: 0 */
        new flexImages({selector: '.photolist', container: '.photo', rowHeight: rowHeight});
      });
    });
  });

  socket.on('new photo', function (data) {
    var index = vm.photos.findIndex(function (el) {
      return data.date > el.date;
    });
    vm.photos.splice(index, 0, data);
  });
});

function toggleFullScreen () {
  if (!document.mozFullScreenElement) {
    document.documentElement.mozRequestFullScreen();
  } else {
    if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    }
  }
}

function zoomIn () {
  rowHeight = rowHeight > 300 ? rowHeight : rowHeight * 1.20;
  new flexImages({selector: '.photolist', container: '.photo', rowHeight: rowHeight});
}

function zoomOut () {
  rowHeight = rowHeight < 50 ? rowHeight : rowHeight * 0.80;
  new flexImages({selector: '.photolist', container: '.photo', rowHeight: rowHeight});
}

var droptarget = document.documentElement;
droptarget.addEventListener('dragenter', drag, false);
droptarget.addEventListener('dragover', drag, false);
droptarget.addEventListener('drop', dropFile, false);
droptarget.addEventListener('dragleave', unDrag, false);

function drag (e) {
  e.stopPropagation();
  e.preventDefault();

  highLightTarget(e.currentTarget);
}

function unDrag (e) {
  e.stopPropagation();
  e.preventDefault();

  downLightTarget(e.currentTarget);
}

function dropFile (e) {
  e.stopPropagation();
  e.preventDefault();

  var dt = e.dataTransfer;
  var files = dt.files;

  downLightTarget(e.currentTarget);

  batchUploads(files);
}

function highLightTarget (target) {
  target.classList.add('dragover');
}

function downLightTarget (target) {
  target.classList.remove('dragover');
}

var input = document.getElementById('photo-input');
input.addEventListener('change', function (e) {
  // Get the selected file from the input element
  var file = e.target.files[0];
  uploadFile(file);
});

var batchUploads = function (files) {
  for (var i in files) {
    uploadFile(files[i]);
  }
};

var uploadFile = function (file) {
  // Create a new tus upload
  var upload = new tus.Upload(file, {
    endpoint: fullURL + 'uploads/',
    retryDelays: [0, 1000, 3000, 5000],
    metadata: {fileName: file.name},
    onError: function (error) {
      console.log('Failed because: ' + error);
    },
    onProgress: function (bytesUploaded, bytesTotal) {
      // var percentage = (bytesUploaded / bytesTotal * 100).toFixed(2)
    },
    onSuccess: function () {
      console.log('Download %s', upload.file.name);
    }
  });

  // Start the upload
  upload.start();
};
