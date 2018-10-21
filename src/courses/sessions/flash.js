export default () => (req, res, next) => {
  const flashArr = [];

  res.flash = (type, message) => {
    flashArr.push({ type, message });
    req.session.flash = flashArr;
  };
  // console.log(req.session.flash);
  res.locals.flash = req.session.flash || [];
  delete req.session.flash;
  next();
};
