// https://www.quirksmode.org/js/cookies.html

const supportsSameSiteNone = ua => {
  return !(
    ua.includes("iPhone OS 12_") || ua.includes("iPad; CPU OS 12_") || //iOS 12
    ua.includes("Chrome/5") || ua.includes("Chrome/6") || //Chrome
    (
      ua.includes(" OS X 10_14_") &&
      ua.includes("Version/") &&
      ua.includes("Safari")
    ) //Safari on MacOS 10.14
  ); 
};

export default {
  set: function (name, value, ttl, domain) {
    let expires = "";
    let cookieDomain = "";
    if (ttl) {
      let date = new Date();
      date.setTime(date.getTime() + (ttl * 60 * 1000));
      expires = "; expires=" + date.toGMTString();
    }
    if (domain) {
      cookieDomain = "; domain=" + domain;
    }

    cookie = name + "=" + escape(value) + expires + cookieDomain + "; path=/";

    if (document.location.protocol) cookie = cookie + "; secure";
    if (supportsSameSiteNone(navigator.userAgent))
      cookie = cookie + "; SameSite=None";

    document.cookie = cookie;
  },
  get: function (name) {
    let i, c;
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for (i = 0; i < ca.length; i++) {
      c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1, c.length);
      }
      if (c.indexOf(nameEQ) === 0) {
        return unescape(c.substring(nameEQ.length, c.length));
      }
    }
    return null;
  }
};
