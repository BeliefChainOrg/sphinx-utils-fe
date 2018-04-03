'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DataAnalysts = function () {
  function DataAnalysts() {
    _classCallCheck(this, DataAnalysts);

    this.isActive = true;
  }

  _createClass(DataAnalysts, [{
    key: 'setState',
    value: function setState() {
      var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
        isActive: true,
        intercomID: '',
        GAID: ''
      };

      this.isActive = obj.isActive;
      this.intercomID = obj.intercomID;

      window['ga-disable-' + obj.GAID] = !this.isActive;
    }
  }, {
    key: 'regNewUser',
    value: function regNewUser(uid) {
      var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      var email = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
      var phone = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';

      if (!this.isActive) return;

      window.mixpanel.alias(uid);

      window.mixpanel.people.set({
        Uid: uid,
        $email: email,
        $name: name,
        $phone: phone,
        Phone: phone
      });

      window.mixpanel.identify(uid);

      window.mixpanel.register({
        uid: uid,
        email: email,
        name: name,
        phone: phone
      });

      window.Intercom('boot', {
        app_id: this.intercomID,
        user_id: uid,
        name: name,
        email: email,
        phone: phone
      });

      window.Intercom('trackEvent', 'reg');

      gtag('set', { user_id: uid });
    }
  }, {
    key: 'loginUser',
    value: function loginUser(uid) {
      var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      var email = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
      var phone = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';

      if (!this.isActive) return;

      if (name) {
        window.mixpanel.people.set({
          Uid: uid,
          $email: email,
          $name: name,
          $phone: phone,
          Phone: phone
        });
      }

      window.mixpanel.identify(uid);

      window.mixpanel.register({
        uid: uid,
        email: email,
        name: name,
        phone: phone
      });

      if (!name) {
        window.Intercom('boot', {
          app_id: this.intercomID,
          user_id: uid
        });
      } else {
        window.Intercom('boot', {
          app_id: this.intercomID,
          user_id: uid,
          email: email,
          name: name,
          phone: phone
        });
      }

      window.Intercom('trackEvent', 'login');

      gtag('set', { user_id: uid });
    }
  }, {
    key: 'trackEvent',
    value: function trackEvent(eventStr) {
      var propertyObj = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var isSendAll = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      if (!this.isActive) return;

      window.mixpanel.track(eventStr, propertyObj);

      if (isSendAll) {
        window.Intercom('trackEvent', eventStr, propertyObj);
      }
    }
  }, {
    key: 'trackLink',
    value: function trackLink(tagIdStr, eventStr) {
      var propertyObj = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      if (!this.isActive) return;

      window.mixpanel.track_links(tagIdStr, eventStr, propertyObj);
    }
  }]);

  return DataAnalysts;
}();

exports.default = new DataAnalysts();