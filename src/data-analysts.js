class DataAnalysts {
  constructor() {
    this.isActive = true
    this.mixpanel = window.mixpanel
    this.intercom = window.Intercom
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

    this.mixpanel.alias(uid)

    this.mixpanel.people.set({
      Uid: uid,
      $email: email,
      $name: name,
      $phone: phone,
      Phone: phone
    })

    this.mixpanel.identify(uid)

    this.mixpanel.register({
      uid,
      email
    })

    this.intercom('boot', {
      app_id: this.intercomID,
      name,
      email,
      user_id: uid,
      phone
    })

    this.intercom('trackEvent', 'reg')
  }

  loginUser(uid, email = '', phone = '') {
    if (!this.isActive) return

    this.mixpanel.identify(uid)

    this.mixpanel.register({
      uid,
      email,
      phone
    })

    this.intercom('boot', {
      app_id: this.intercomID,
      email,
      user_id: uid,
      phone
    })

    this.intercom('trackEvent', 'login')
  }

  trackEvent(eventStr, propertyObj = {}, isSendAll = false) {
    if (!this.isActive) return

    this.mixpanel.track(eventStr, propertyObj)

    if (isSendAll) {
      this.intercom('trackEvent', eventStr, propertyObj)
    }
  }

  trackLink(tagIdStr, eventStr, propertyObj = {}) {
    if (!this.isActive) return

    this.mixpanel.track_links(tagIdStr, eventStr, propertyObj)
  }
}

export default new DataAnalysts()
