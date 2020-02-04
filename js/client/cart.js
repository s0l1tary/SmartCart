$(document).ready(function(){
    $.ajax({
        url:'/api/cart',
        method:'get',

    })
    .done(
        function(data){
            for(var i = 0; i < data.length; i++){
                $('#items').append(data.item);
                $('#quantity').append(data.quantity);
                $('#price').append(data.cost);
            }
        }
    )
})