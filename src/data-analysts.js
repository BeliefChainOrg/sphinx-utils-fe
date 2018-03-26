const mixpanel = window.mixpanel
const intercom = window.intercom

const isOpenDataAnalyst = () => window.sphinxConfig && window.sphinxConfig.openDataAnalyst

export const regNewUser = (uid, name, email, phone) => {
  if (!isOpenDataAnalyst) return

  mixpanel.alias(uid)

  mixpanel.people.set({
    Uid: uid,
    $email: email,
    $name: name,
    $phone: phone,
    Phone: this.props.email
  })

  mixpanel.identify(uid)

  mixpanel.register({
    uid,
    email: this.props.email
  })

  intercom('boot', {
    app_id: `poh1d9m6`,
    name: this.nickname,
    email: this.props.email,
    user_id: uid,
    phone
  })

  intercom('trackEvent', 'reg')
}

export const loginUser = (uid, name, email, phone) => {
  if (!isOpenDataAnalyst) return

  mixpanel.identify(uid)

  mixpanel.register({
    uid,
    email: email
  })

  intercom('boot', {
    app_id: `poh1d9m6`,
    email,
    user_id: uid,
    phone
  })

  intercom('trackEvent', 'login')
}

export const trackEvent = (eventStr, propertyObj, isSendAll) => {
  if (!isOpenDataAnalyst) return

  const sendObj = propertyObj || {}

  mixpanel.track(eventStr, sendObj)

  if (isSendAll) {
    intercom('trackEvent', eventStr, sendObj)
  }
}

// NOTE: the tagIdStr's format is '#blog-link a'. More please search mixpanel's help center.
export const trackLink = (tagIdStr, eventStr, propertyObj) => {
  if (!isOpenDataAnalyst) return

  mixpanel.track_links(tagIdStr, eventStr, propertyObj || {})
}