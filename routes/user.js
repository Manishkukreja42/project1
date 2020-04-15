const express=require('express');
const app=express();
const csrf=require('csurf');
const passport=require('passport');

const csrfProtection=csrf();
app.use(csrfProtection);
app.get('/profile',isloggedin,(req,res,next) =>
{
 res.render('user/profile');
});
app.get('/logout',isloggedin,(req,res,next)=>
{
    req.logout();
    res.redirect('/');
});

module.exports=app;

app.use('/',notloggedin,(req,res,next)=>
{
    next();
});

app.get('/signup',(req,res,next) =>
{
    var messages=req.flash('error');
    res.render('user/signup',{ csrfToken: req.csrfToken(),messages:messages,haserrors: messages.length>0});
});

app.post('/signup',passport.authenticate('local.signup',{
    successRedirect:'/user/profile',failureRedirect:'/user/signup',
    failureFlash:true

}));
app.get('/signin',(req,res,next)=>
{
    var messages=req.flash('error');
    res.render('user/signin',{ csrfToken: req.csrfToken(),messages:messages,haserrors: messages.length>0});
});
app.post('/signin',passport.authenticate('local.signin',{
    successRedirect:'/user/profile',failureRedirect:'/user/signin',
    failureFlash:true
}));






function isloggedin(req,res,next)
{
    if(req.isAuthenticated())
    {
        return next();
    }
    res.redirect('/');

}
function notloggedin(req,res,next)
{
    if(!req.isAuthenticated())
    {
        return next();
    }
    res.redirect('/');

}
