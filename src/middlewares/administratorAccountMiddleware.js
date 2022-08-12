function administratorAccountMiddleware(req, res, next) {
	if (req.session.userLogged) {
        if(req.session.userLogged.rol_id != 1){
            if(req.params.id){
                return res.redirect("/productList/productDetail/" + req.params.id);  
            }else{
                return res.redirect("/productList/");
            }
               
        }
	}
	next();
}

module.exports = administratorAccountMiddleware;