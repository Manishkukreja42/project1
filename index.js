const express=require('express');
var Cart=require('./models/cart');
const path=require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app=express();
// const csrf=require('csurf');
const exphbs =require('express-handlebars');
const mongoose= require('mongoose');
const session=require('express-session');
const passport=require('passport');
const flash=require('connect-flash');
const validator=require('express-validator');
const Mongostore=require('connect-mongo')(session);


const userroutes=require('./routes/user');

const Product=require('./models/product');

// const csrfProtection=csrf();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(validator());
app.use(cookieParser());

app.use(session({
    secret:'mysupersecret',
    resave: false,
     saveUninitialized:false,
     store: new Mongostore({ mongooseConnection: mongoose.connection}),
     cookie:{maxAge : 180 *60 * 1000 }
    }));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname,'/views/layouts/public')));

app.use((req,res,next)=>{
 res.locals.login=req.isAuthenticated();
 res.locals.session =req.session;
 next();
})
app.use('/user',userroutes);
mongoose.connect('mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false',{ useNewUrlParser :true,useUnifiedTopology:true});
require('./config/passport');
// app.use(csrfProtection);

app.get('/',(req,res) =>
{
    Product.find((err,docs) =>
    {
        var productchunks=[];
        var chunksize=3;
        for(var i=0;i<docs.length;i+=chunksize)
        {
            productchunks.push(docs.slice(i,i + chunksize));
        }

        res.render('shop/index',{ title : 'shopping cart', products:productchunks});

        // res.render('shop/index',{ title : 'shopping cart', products:productchunks},{allowProtoMethodsByDefault: true,
        //     allowProtoPropertiesByDefault: true});

    }).lean().exec(function(err, list) {
        if (err) 
        return next(err);
        // res.render('shop/index',{ title : 'shopping cart', products:list},{allowProtoMethodsByDefault: true,
        //     allowProtoPropertiesByDefault: true});
        
//    res.json(list);
     });
    
    // res.render('shop/index',{ title : 'shopping cart',products:products});
});

app.get('/add-to-cart/:id',(req,res,next) =>
{
    var productId=req.params.id;
    var cart=new Cart(req.session.cart ? req.session.cart : {});

    Product.findById(productId,(err,product) =>
    {
        if(err)
         return res.redirect('/');
         cart.add(product,product.id);
         req.session.cart=cart;
         console.log(req.session.cart);
         res.redirect('/');

    });




});

app.get('/shopping-cart',(req,res)=>
{
    if(!req.session.cart)
    {
        return res.render('shop/shopping-cart',{ products:null});
    }
    var cart=new Cart(req.session.cart);
    res.render('shop/shopping-cart',{ products: cart.generateArray(),totalprice:cart.totalprice});
});

app.get('/checkout',(req,res)=>
{
    if(!req.session.cart)
    {
        return res.redirect('/shopping-cart');
    }
    var cart=new Cart(req.session.cart);
    res.render('shop/checkout',{ total:cart.totalprice});

});


app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine','handlebars');
app.listen(5000,() =>
{
    console.log('server is running');
});


