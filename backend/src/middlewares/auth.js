const isAuth = (req, res, next) => {
  console.log("admin is authenticated");
  const admin = "xyz";
  const isAuth = admin === "xyz";
  if (!isAuth) {
    return res.status(401).send("User is not authorized");
  } else {
    next();
  }
};

const userAuth = (req, res, next) => {
  console.log("User is authenticated");
  const admin = "xyz";
  const isAuth = admin === "xyz";
  if (!isAuth) {
    return res.status(401).send("User is not authorized");
  } else {
    next();
  }
};


module.exports = { isAuth, userAuth };