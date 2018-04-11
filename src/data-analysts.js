class DataAnalysts {
  constructor() {
    this.isActive = true
  }

  setState(
    obj = {
      isActive: true,
      intercomID: '',
      GAID: ''
    }
  ) {
    this.isActive = obj.isActive
    this.intercomID = obj.intercomID

    window[`ga-disable-${obj.GAID}`] = !this.isActive
  }

  regNewUser(uid, name = '', email = '', phone = '') {
    if (!this.isActive) return

    window.mixpanel.alias(uid)

    window.mixpanel.people.set({
      Uid: uid,
      $email: email,
      $name: name,
      $phone: phone,
      Phone: phone
    })

    window.mixpanel.identify(uid)

    window.mixpanel.register({
      uid,
      email,
      name,
      phone
    })

    window.Intercom('boot', {
      app_id: this.intercomID,
      user_id: uid,
      name,
      email,
      phone
    })

    window.Intercom('trackEvent', 'reg')

    gtag('set', {user_id: uid})
  }

  loginUser(uid, name = '', email = '', phone = '') {
    if (!this.isActive) return

    if (name) {
      window.mixpanel.people.set({
        Uid: uid,
        $email: email,
        $name: name,
        $phone: phone,
        Phone: phone
      })
    }

    window.mixpanel.identify(uid)

    window.mixpanel.register({
      uid,
      email,
      name,
      phone
    })

    if (!name) {
      window.Intercom('boot', {
        app_id: this.intercomID,
        user_id: uid
      })
    } else {
      window.Intercom('boot', {
        app_id: this.intercomID,
        user_id: uid,
        email,
        name,
        phone
      })
    }

    window.Intercom('trackEvent', 'login')

    gtag('set', {user_id: uid})
  }

  trackEvent(eventStr, propertyObj = {}, isSendAll = false) {
    if (!this.isActive) return

    // NOTE: Do not put this block after mixpanel.track, as it'll change the value of propertyObj. So terrible.
    if (isSendAll) {
      window.Intercom('trackEvent', eventStr, propertyObj)
    }

    window.mixpanel.track(eventStr, propertyObj)
  }

  trackLink(tagIdStr, eventStr, propertyObj = {}) {
    if (!this.isActive) return

    window.mixpanel.track_links(tagIdStr, eventStr, propertyObj)
  }

  trackCharge(value) {
    if (!this.isActive || !value) return

    window.mixpanel.people.track_charge(value)
  }
}

export default new DataAnalysts()
