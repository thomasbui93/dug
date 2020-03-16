const __ = require('../translator')

module.exports = () => {
  const currentHour = (new Date()).getHours();
  if (currentHour > 5 && currentHour <= 11) {
    return __("Good morning!");
  }

  if (currentHour > 11 && currentHour <= 13) {
    return __("It's noon time!");
  }

  if (currentHour < 17 && currentHour > 13) {
    return __("Good afternoon!");
  }

  return __("Good evening! It seems that you're doing homework!");
}
