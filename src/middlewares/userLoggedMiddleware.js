const User = require('../models/users');

function userLoggedMiddleware(req, res, next) {
	res.locals.isLogged = false;

	let emailINtCookie = req.cookies.userEmail; //remember user
	let userFromCookie = User.findByField("email", emailINtCookie);//
	
	if (userFromCookie) {//
		req.session.userLogged = userFromCookie;//
	}
    
	if (req.session.userLogged) {
		res.locals.isLogged = true;
		res.locals.userLogged = req.session.userLogged;
	}

	

	next();
}

module.exports = userLoggedMiddleware;