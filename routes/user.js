
/*
 * GET users listing.
 */

exports.list = function(req, res){
  if (req.loggedIn) {
    res.send("user logged in");
  }
  else {
    res.send("user not logged in");
  }
};
