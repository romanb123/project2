$(document).ready(function () {
    // ========================
    // function for all coins
    // ========================
    $(".allcoins").click(function () {
        $.ajax({
            url: "https://api.coingecko.com/api/v3/coins/list", success: function (result) {
                console.log(result);
                for (var i = 0, len = 10; i < len; i++) {
                    $(".row").append(`
<!-- card -->
<div class="col-lg-3 col-md-6 col-sm-12" >
<div class="card">
    <div class="card-body">  
    <h1 class="card-title">${result[i].name}</h1>
        <h4 class="card-title"><span class="bold">id=</span>"<span id="identify">${result[i].id}</span>"</h4>
        <h4 class="card-title"><span class="bold">symbol"</span>=
        ${result[i].symbol}"</h4>
      
        <button type="button" class="btn btn-info moreinfo" data-toggle="collapse" data-target="#demo${i}">Simple collapsible</button>
        <div id="demo${i}" class="collapse in">     
        </div>
    </div>
 </div>
</div>
`);
                }
            }
        });
    });
    // ========================
    // function fo more info
    // ========================
    $("body").on('click', '.moreinfo', function () {
        var coinid = $(this).parent().find("#identify").text();
        var dataplace=$(this).attr("data-target");
        console.log(coinid);
        console.log(dataplace);
        $.ajax({
            url: `https://api.coingecko.com/api/v3/coins/` + coinid, success: function (result) {
                $("body").find(`${dataplace}`).html(`
                <div class="row">
                <div class="col-lg-6">            
                <span>${result.market_data.current_price.usd}<span class="bold">$</span></span><br> 
                <span>${result.market_data.current_price.eur}<span class="bold">€</span></span><br> 
                <span>${result.market_data.current_price.ils}<span class="bold">₪</span></span><br>    
                </div>
                <div class="col-lg-6">            
                <img src="${result.image.small}" class="rounded" alt="Cinque Terre">           
                </div>
                </div>
                `);
                console.log(result);
            }
        });
    });
});