const mixpanel = window.mixpanel
const intercom = window.Intercom

const isOpenDataAnalyst = () => window.sphinxConfig && window.sphinxConfig.openDataAnalyst

const dataAnalysts = {
  regNewUser: (uid, name = '', email = '', phone = '') => {
    if (!isOpenDataAnalyst()) return

    mixpanel.alias(uid)

    mixpanel.people.set({
      Uid: uid,
      $email: email,
      $name: name,
      $phone: phone,
      Phone: phone
    })

    mixpanel.identify(uid)

    mixpanel.register({
      uid,
      email
    })

    intercom('boot', {
      app_id: 'poh1d9m6',
      name,
      email,
      user_id: uid,
      phone
    })

    intercom('trackEvent', 'reg')
  },

  loginUser: (uid, email = '', phone = '') => {
    if (!isOpenDataAnalyst()) return

    mixpanel.identify(uid)

    mixpanel.register({
      uid,
      email,
      phone
    })

    intercom('boot', {
      app_id: 'poh1d9m6',
      email,
      user_id: uid,
      phone
    })

    intercom('trackEvent', 'login')
  },

  trackEvent: (eventStr, propertyObj = {}, isSendAll = false) => {
    if (!isOpenDataAnalyst()) return

    mixpanel.track(eventStr, propertyObj)

    if (isSendAll) {
      intercom('trackEvent', eventStr, propertyObj)
    }
  },

  trackLink: (tagIdStr, eventStr, propertyObj = {}) => {
    if (!isOpenDataAnalyst()) return

    mixpanel.track_links(tagIdStr, eventStr, propertyObj)
  }
}

export default dataAnalysts
