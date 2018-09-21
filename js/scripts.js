(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _showMenu = require("./modules/show-menu");

var _scroll = require("./modules/scroll");

var _verifyForm = require("./modules/verify-form");

(0, _showMenu.showMenu)('main-menu', 'toogle-menu');
(0, _scroll.headerFixed)('main-header');
(0, _verifyForm.verifyForm)('contact-form');

document.querySelectorAll('a[href^="#"').forEach(function (anchor) {
  anchor.addEventListener('click', function (evt) {
    evt.preventDefault();
    document.getElementById('main-menu').classList.remove('show');
    if (this.getAttribute('href') === '#banner') {}
    smoothScroll.scrollTo(this.getAttribute('href'), 1000);
  });
});

document.getElementById('year').textContent = new Date().getFullYear();

// ((d)=>{
//   let form = d.querySelector('#contact-form')
//   let llenar = d.querySelector('#llenar');
//   let data = ["FLorentino Navarro","3331213843","tino@sigmapcs.com.mx","Prueba de envio" ]
//   let inputs = [...form.querySelectorAll('input, textarea')]
//   for (let i=0; i<inputs.length; i++){
//     inputs[i].value = data[i];
//     inputs[i].parentElement.classList.add('noempty');
//   }
// })(document)

},{"./modules/scroll":2,"./modules/show-menu":3,"./modules/verify-form":4}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var headerFixed = exports.headerFixed = function headerFixed(headerEl) {
  var header = document.getElementById(headerEl);
  var toTop = document.getElementById('totop');
  var bannerHeight = document.getElementById('banner').clientHeight;
  window.addEventListener('scroll', function () {
    var currentScrollTop = window.scrollY;
    if (currentScrollTop >= 160) {
      header.classList.add('fixed');
    } else {
      header.classList.remove('fixed');
    }
    if (currentScrollTop >= bannerHeight) {
      toTop.classList.add('show');
    } else {
      toTop.classList.remove('show');
    }
  });
};

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var showMenu = exports.showMenu = function showMenu(menuId, toggleId) {
  //  alert(menuId)
  var menu = document.getElementById(menuId);
  var toggle = document.getElementById(toggleId);
  toggle.addEventListener('click', function () {
    //    alert('hola');
    menu.classList.toggle('show');
  });
};

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var verifyForm = exports.verifyForm = function verifyForm(formEl) {
  var form = document.getElementById(formEl);
  var inputs = [].concat(_toConsumableArray(form.querySelectorAll('input, textarea')));

  inputFocus(inputs);
  sendFormVerify(form, inputs);
};

var inputFocus = function inputFocus(inputs) {
  var ver = false;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = inputs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var input = _step.value;

      input.addEventListener('focus', function (e) {
        e.target.parentElement.classList.add('noempty');
      });
      input.addEventListener('blur', function (e) {
        if (e.target.value === '') {
          e.target.parentElement.classList.remove('noempty');
        }
      });
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
};

var sendFormVerify = function sendFormVerify(form, inputs) {

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    //    let ver = verify(inputs)
    //      sendForm(e.target)
    succesShow(e.target);
  });
};

var succesShow = function succesShow(form) {
  console.log(form);
  var d = document;
  var loader = d.getElementById('loader-mail'),
      successEl = d.getElementById('success-message'),
      btnSend = d.getElementById('send');
  console.log(btnSend);
  loader.classList.add('active');
  var i = 0;
  setTimeout(function () {
    console.log('2 segundos despues');
    sendForm(form, loader, successEl, btnSend);
  }, 2000);
};

var verify = function verify(inputs) {
  var ver = false;
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = inputs[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var input = _step2.value;

      if (input.value = !'') ver = true;
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  return ver;
};

var sendForm = function sendForm(form, loader, successEl, btnSend) {
  console.log(form, loader, successEl, btnSend);
  var data = new FormData(form);
  var url = form.action;
  var url1 = 'https://sigmapcs.com.mx/php/send-mail.php';
  var myHeaders = new Headers();
  var myInit = {
    method: 'POST',
    headers: myHeaders,
    mode: 'cors',
    body: data,
    cache: 'default' };
  console.log(url, myInit);
  fetch(url1, myInit).then(function (res) {
    return res.json();
  }).then(function (dataRes) {
    console.log(dataRes);
    showResp(loader, successEl, btnSend);
  });
};

var showResp = function showResp(loader, successEl, btnSend) {
  loader.classList.remove('active');
  successEl.classList.add('active');

  disabledBtn(btnSend);
  removeSuccessEl(successEl, btnSend);
  console.log(loader);
};

var disabledBtn = function disabledBtn(btn) {
  btn.classList.add('disabled');
  btn.textContent = "Enviado";
  btn.setAttribute('disabled', 'disabled');
};

var removeSuccessEl = function removeSuccessEl(successEl, btnSend) {
  var btnClose = successEl.querySelector('#success-message-close');
  btnClose.addEventListener('click', function () {
    disabledBtn(btnSend);
    successEl.classList.remove('active');
    btnSend.classList.remove('disabled');
    btnSend.removeAttribute('disabled');
    btnSend.textContent = "Enviar";
  });
};

/*

  <div class="loader-content">
      <div class="loader">
        <div class="face">
          <div class="circle"></div>
        </div>
        <div class="face">
          <div class="circle"></div>
        </div>
      </div>
    </div>

*/

//scripts.js:165 {status: true, text: "Formulario enviado con éxito, en breve nos pondrémos en contacto con usted"}


//export const verifyForm = (formEl) => {
//  const form = document.getElementById(formEl);
////  console.log(form);
//  const inputs = [...form.querySelectorAll('input, textarea')]
//  inputFocus(inputs);
//  sendFormVerify(form, inputs)
//  console.log('veri')
//}
//
//const inputFocus = inputs => {
//  let ver = false;
//  for(let input of inputs){
//    input.addEventListener('focus', e=> {
//      e.target.parentElement.classList.add('noempty');
//    })
//    input.addEventListener('blur', e => {
//      if (e.target.value === '' ){
//        e.target.parentElement.classList.remove('noempty');
//      }
//    })
//  }
//
//}
//
//const sendFormVerify = (form, inputs) => {
//  form.addEventListener('submit', e => {
//    e.preventDefault();
//      console.log('sendFormVerify')
////    let ver = verify(inputs)
////    sendForm(e.target)
//     loaderStart(e.target)
//  })
//}
//
//const verify = inputs =>{
//  let ver = false;
//  for(let input of inputs){
//    if (input.value =! '') ver = true;
//  }
//  return ver
//}
//
//
//const loaderStart = form => {
//  const successEl = document.getElementById('success-message'),
//        btnSend = document.getElementById('send'),
//        loader = document.getElementById('loader-mail');
//  loader.classList.add('active');
//  setTimeout(() => {
//    sendForm(form,successEl,btnSend,loader)
//  },2500)
//}
//
//
//const sendForm = (form,successEl,btnSend,loader) =>{
//  const data = new FormData(form)
//  const url = form.action
//  const url1 = 'https://sigmapcs.com.mx/new/php/send-mail.php'
//  const myHeaders = new Headers();
//  const myInit = {
//    method: 'POST',
//    headers: myHeaders,
//    mode: 'cors',
//    body: data,
//    cache: 'default' };
//  fetch(url1, myInit)
//    .then(res =>res.json())
//    .then( dataRes =>{
//      console.log(dataRes)
//      showSuccessEl(dataRes,successEl,btnSend,loader)
//    })
//}
//
//const showSuccessEl = (dataRes,successEl,btnSend,loader) => {
//  if (dataRes.status){
//    loader.classList.remove('active')
//    successEl.classList.add('active')
//    btnSend..classList.add('disabled');
//    btnSend.textContent = "Enviado";
//    btnSend.setAttribute('disabled', 'disabled')
//  }
//}
//
//
////scripts.js:165 {status: true, text: "Formulario enviado con éxito, en breve nos pondrémos en contacto con usted"}

},{}]},{},[1]);

//# sourceMappingURL=scripts.js.map
