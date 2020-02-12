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

function addItem() {
    var urlParams=new URLSearchParams(window.location.search);
    var itemId=urlParams.get('id');
    alert("Add");
    $.ajax({
        url: "/api/cartDetails/"+itemId,
        method: "get",
        dataType: "json"
      }).done(
          function(data) {
            window.location.href="http://192.168.240.1/arduino/add/"+data.cost
          }
      )
}

function removeItem() {
    var urlParams=new URLSearchParams(window.location.search);
    var itemId=urlParams.get('id');
    alert("Remove");
    $.ajax({
        url: "/api/cartDetails/"+itemId,
        method: "get",
        dataType: "json"
      }).done(
          function(data) {
            $.ajax({
                url: "/api/remove/"+data.cost,
                method: "get",
                dataType: "json"
            }).done(
                alert("hello world")
            ).fail(
                alert("ERROR")
            )
          }
      )
}

function clearAll() {
    var urlParams=new URLSearchParams(window.location.search);
    var itemId=urlParams.get('id');
    alert("Clear");
    $.ajax({
        url: "/api/cartDetails/"+itemId,
        method: "get",
        dataType: "json"
      }).done(
          function(data) {
            $.ajax({
                url: "/api/delete/"+data.cost,
                method: "get",
                dataType: "json"
            }).done(
                alert("hello world")
            ).fail(
                alert("ERROR")
            )
          }
      )
}