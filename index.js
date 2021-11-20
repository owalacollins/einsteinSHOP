
let carts =document.querySelectorAll ('.add-cart');
let products=[
    {
        name:"croptop",
        tag :"image7",
        price:1500,
        inCart:0,
    },

    {
        name:'carot',
        tag :'image1',
        price:3000,
        inCart:0,
    },

    {
        name:'shiphon',
        tag :'image2',
        price:1000,
        inCart:0
    },

    {
        name:'track',
        tag :'image3',
        price:400,
        inCart:0
    },

    {
       name:'tissue',
       tag :'image4',
       price:500,
       inCart:0
    },

    { 
      name:'chrome',
      tag :'image5',
      price:200,
      inCart:0
    },

    { 
      name:'book',
      tag :'image6',
      price:50,
      inCart:0
      },
] ;

 //to access all products

for(let i=0; i < carts.length ; i++ ){
    carts[i].addEventListener ('click',() =>{
       cartNumbers(products[i]); 
       totalCost(products[i])
    })
}

// for the span to remain the same on load

function onLoadCartNumbers(){
    let productNumbers=localStorage.getItem('cartNumbers');
    if(productNumbers){
        document.querySelector('li span').textContent = productNumbers;
    }
}

//to store values on the local storage

function cartNumbers(product){
   
    let productNumbers=localStorage.getItem('cartNumbers');
   
    productNumbers=parseInt(productNumbers); // convert into number

    if(productNumbers){
        localStorage.setItem('cartNumbers',productNumbers + 1); 
        document.querySelector(' span').textContent= productNumbers + 1;
    }
    else{
         localStorage.setItem('cartNumbers',1);
         document.querySelector(' span').textContent= 1;
    }
    
    setItems(product);
   
}
function setItems(product){
let cartItems= localStorage.getItem('productsInCart');
cartItems = JSON.parse(cartItems);
 

if(cartItems != null){
   if( cartItems[product.tag] == undefined){
       cartItems = {
           ...cartItems,
           [product.tag]:product
       }
   }
   cartItems[product.tag].inCart += 1;
}
else{
product.inCart= 1;
cartItems= {
    [product.tag]:product
}
}
localStorage.setItem('productsInCart', JSON.stringify(cartItems));
}

function totalCost(product){
    let cartCost =localStorage.getItem('totalCost');
    if(cartCost !=null){
        cartCost=parseInt(cartCost);
        localStorage.setItem('totalCost',cartCost+product.price);
    }else{
localStorage.setItem('totalCost',product.price)
    }
}
//
function displayCart(){
   let cartItems =localStorage.getItem('productsInCart');
   cartItems= JSON.parse(cartItems);
   let productContainer =document.querySelector(".products");
   let cartCost =localStorage.getItem('totalCost');

   if(cartItems && productContainer){
       productContainer.innerHTML='';
       Object.values(cartItems).map(item=>{
           productContainer.innerHTML +=`

           <div class="incart-product">
           <div class="product">
           <img class="icon"src="bag.png">
           <img class="item"src="${item.tag}.jpg">

           <div class="description">

           <div>${item.name}</div>
           <div class="info">sh.${item.price}.00</div>

           <div class="quantity">
           <img class="icon"src="add.png">
            <span class="info">${item.inCart}</span>
            <img class="icon"src="add.png">
           </div>
            
           <div class"info ">
           sh.${item.inCart * item.price}.00
           </div>
           </div>
           </div>
           </div>
           `
       });
       productContainer.innerHTML +=`
       <div class="basketTotalContiner">
       <h4 class="basketTotalTitle">
        basket Total
       <h4/>
       <h4 class="basketTotalPrice">
        sh.${cartCost},00
       <h4/>
       `
   }
}

function oderNow(){
    alert('your oder is being processed we will send you feedback soon ');
}

onLoadCartNumbers();
displayCart();
