var Product=require('../product');

var mongoose= require('mongoose');
mongoose.connect('mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false',{ useNewUrlParser :true,useUnifiedTopology:false});
// mongoose.createConnection('mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false/shopping',{ useNewUrlParser :true});
var products =[new Product({
    imagePath: 'https://beardoc.s3.ap-south-1.amazonaws.com/uploads/x700-beardo-hair-fall-control-shampoo-for-men-product-images-5-771.jpg',
    title: 'beardoshampoo',
    price: 120

}),
new Product({
    imagePath: 'https://image.shutterstock.com/image-photo/beard-oil-barbershop-product-photography-600w-1165640719.jpg',
    title: 'beard oil',
    price: 145

}),
new Product({
    imagePath: 'https://media.istockphoto.com/photos/hair-machine-for-trimming-hair-isolated-on-white-picture-id673114698',
    title: 'beardtrimmer',
    price: 2500

}),
new Product({
    imagePath: 'https://images.unsplash.com/photo-1560880550-bd38f18453cd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    title: 'beardoshampoo',
    price: 120

}),
new Product({
    imagePath: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    title: 'beard oil',
    price: 145

}),
new Product({
    imagePath: 'https://images.unsplash.com/photo-1508380702597-707c1b00695c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    title: 'beardtrimmer',
    price: 2500

})

];
var done=0;
for(var i=0;i<products.length;i++)
    {
        products[i].save(function(req,result)
        {
            done++;
            if(done===products.length)
            {
                exit();
            }
        });
    }
    function exit()
    {
        mongoose.disconnect();
    }

