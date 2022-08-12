function anotherUserAccountMiddleware(req, res, next) {
	if(req.session.userLogged && req.session.userLogged.rol_id != 1){
		if (req.session.userLogged.user_id != req.params.user_id) {
			return res.redirect("/user/" + req.session.userLogged.user_id); 
		}
	}

	next();
}

module.exports = anotherUserAccountMiddleware;