const User = require('../models/user');

module.exports.profile = async function(req, res){
    try {
        if (req.cookies.user_id){
            const user = await User.findById(req.cookies.user_id);
            if (user){
                return res.render('user_profile', {
                    title: "User Profile",
                    user: user
                });
            }else{
                return res.redirect('/users/sign-in');
            }
        }else{
            return res.redirect('/users/sign-in');
        }
    } catch (err) {
        console.log('error in finding user in profile', err);
        return;
    }
}

module.exports.signUp = function(req, res){
    return res.render('user_sign_up', {
        title: "Codeial | Sign Up"
    });
}

module.exports.signIn = function(req, res){
    return res.render('user_sign_in', {
        title: "Codeial | Sign In"
    });
}

module.exports.create = async function(req, res){
    try {
        if (req.body.password != req.body.confirm_password){
            return res.redirect('back');
        }

        const user = await User.findOne({email: req.body.email});
        if (!user){
            await User.create(req.body);
            return res.redirect('/users/sign-in');
        }else{
            return res.redirect('back');
        }
    } catch (err) {
        console.log('error in signing up', err);
        return;
    }
}

module.exports.createSession = async function(req, res){
    try {
        const user = await User.findOne({email: req.body.email});
        if (user){
            if (user.password != req.body.password){
                return res.redirect('back');
            }
            res.cookie('user_id', user.id);
            return res.redirect('/users/profile');
        }else{
            return res.redirect('back');
        }
    } catch (err) {
        console.log('error in signing in', err);
        return;
    }
}