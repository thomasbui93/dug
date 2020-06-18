module.exports = (req, res, next) => {
  const { secret } = req.query
  if (secret !== process.env.SECRET_TOKEN) {
    next(new Error('Internal URL require token'))
  } else {
    next()
  }
}
