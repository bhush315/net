const restrictAccess = async (req, res, next) => {
  if (!req.session.memberId) {
    return res.json({ success: false, message: "You need to login" });
  }
  next();
};

export default restrictAccess;
