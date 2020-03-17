const t = require('../translator')

module.exports = () => {
  const currentHour = (new Date()).getHours();
  if (currentHour > 5 && currentHour <= 11) {
    return t('Good morning!');
  }

  if (currentHour > 11 && currentHour <= 13) {
    return t("It's noon time!");
  }

  if (currentHour < 17 && currentHour > 13) {
    return t('Good afternoon!');
  }

  return t("Good evening! It seems that you're doing homework!");
}
