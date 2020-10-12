module.exports = {
    isAuthenticated: function(req, res, next) {
        if(req.isAuthenticated()){
            return next();
        }
        req.flash("error_msg", "Você precisa realizar login");
        req.redirect("/");
    },

    isPodutor: function(req, res, next) {
        if(req.isAuthenticated() && req.user.isPodutor){
            return next();
        }
        req.flash("error_msg", "Você precisa ser um produtor");
        req.redirect("/");
    }
}