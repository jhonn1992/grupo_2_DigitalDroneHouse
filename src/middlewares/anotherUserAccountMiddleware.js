function anotherUserAccountMiddleware(req, res, next) {
	if (req.session.userLogged && req.session.userLogged.id != req.params.id) {
		return res.redirect("/user/" + req.session.userLogged.id); 
	}
	next();
}

module.exports = anotherUserAccountMiddleware;