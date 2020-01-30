$(document).ready(function(){
    var urlParams=new URLSearchParams(window.location.search);
    var itemId=urlParams.get('id');
    $.ajax({
        url: "api/cartDetails/"+itemId,
        method: "get",
        dataType: "json"
      })
      .done(function(data){
          $('#itemImg').attr("src","../resources/"+itemId+".jpg")
          $('#nameTxt').append();
          $('costTxt').append();
          $('typeTxt').append();
          $('descriptionTxt').append();
          $('countryTxt').append();
          $('expiryDateTxt').append();
      }).fail(function(err){
          console.log(err.responseText);
      })
})