$(document).ready(function(){
    var urlParams=new URLSearchParams(window.location.search);
    var itemId=urlParams.get('id');
    $.ajax({
        url: "/api/cartDetails/"+itemId,
        method: "get",
        dataType: "json"
      })
      .done(function(data){
          var date = new Date(data.expiryDate);
          $('#itemImg').attr("src","../resources/"+itemId+".jpg")
          $('#nameTxt').append(data.name);
          $('#costTxt').append(data.cost);
          $('#typeTxt').append(data.type);
          $('#descriptionTxt').append(data.description);
          $('#countryTxt').append(data.country);
          $('#expiryDateTxt').append(date.toISOString().slice(0,10));
      }).fail(function(err){
          console.log(err.responseText);
      })
})