$(document).ready(function(){
    var params = new URLSearchParams(window.location.search);
    var cartId = params.get('id');
    $.ajax({
        url:'/api/cart/' + cartId,
        method:'get',

    })
    .done(
        function(data){
            for(i=0; i<data.cart.length; i++) {
                $('#cartItems').after("<tr><td><a href='/cartDetails?id="+data.cart[i].item.itemId+"'>"+data.cart[i].item.name+"</td><td>"+data.cart[i].quantity+"</td><td>"+data.cart[i].item.cost+"</td></tr>");
                // $('#items').append(data.cart[i].item.name);
                // $('#quantity').append(data.cart[i].quantity);
                // $('#price').append(data.cart[i].item.cost);
            }
        }
    )
})