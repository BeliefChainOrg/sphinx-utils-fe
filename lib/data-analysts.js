'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _logrocket = require('logrocket');

var _logrocket2 = _interopRequireDefault(_logrocket);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

      if (this.isActive) {
        _logrocket2.default.init('oe8tam/sphinxchain');

        _logrocket2.default.getSessionURL(function (sessionURL) {
          window.mixpanel.register({
            logRocketSessionURL: sessionURL
          });
        });
      }
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

      var regEvent = 'reg';
      window.mixpanel.track(regEvent);
      window.Intercom('trackEvent', regEvent);

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

      window.Intercom('update', {
        user_id: uid,
        logrocketURL: 'https://app.logrocket.com/oe8tam/sphinxchain/sessions?u=' + uid
      });

      gtag('set', { user_id: uid });

      _logrocket2.default.identify(uid, {
        name: name,
        email: email,
        subscriptionType: 'MVP'
      });
    }
  }, {
    key: 'trackEvent',
    value: function trackEvent(eventStr) {
      var propertyObj = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var isSendAll = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      if (!this.isActive) return;

      // NOTE: Do not put this block after mixpanel.track, as it'll change the value of propertyObj. So terrible.
      if (isSendAll) {
        window.Intercom('trackEvent', eventStr, propertyObj);
      }

      window.mixpanel.track(eventStr, propertyObj);
    }
  }, {
    key: 'trackLink',
    value: function trackLink(tagIdStr, eventStr) {
      var propertyObj = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      if (!this.isActive) return;

      window.mixpanel.track_links(tagIdStr, eventStr, propertyObj);
    }
  }, {
    key: 'trackCharge',
    value: function trackCharge(value) {
      if (!this.isActive || !value) return;

      window.mixpanel.people.track_charge(value);
    }
  }]);

  return DataAnalysts;
}();

exports.default = new DataAnalysts();