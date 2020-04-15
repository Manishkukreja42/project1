module.exports= function Cart(oldcart)
{
    this.items =oldcart.items || {};
    this.totalqty=oldcart.totalqty||0;
    this.totalprice=oldcart.totalprice||0;
    this.add=function(item,id) {
        var storeditem = this.items[id];
        if(!storeditem){
            storeditem=this.items[id]={ item:item,qty:0,price:0};

        }
        var we=storeditem.qty;
        storeditem.qty++;
        storeditem.price=storeditem.item.price*(storeditem.qty-we);
        this.totalqty++;
        this.totalprice+= storeditem.price;

    }
    this.generateArray= function() {
        var arr=[];
        for( var id in this.items)
        {
            arr.push(this.items[id]);
        }
        return arr;
    }
        
    
};