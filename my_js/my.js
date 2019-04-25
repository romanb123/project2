var timearray = [];
var storage_array = [];
h=0;

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
<div class="col-lg-3 col-md-6 col-sm-12">
<div class="card">
    <div class="card-body" id=${i}>  
    <h1 class="card-title">${result[i].name}</h1>
        <h4 class="card-title"><span class="bold">id=</span>"<span id="identify">${result[i].id}</span>"</h4>
        <h4 class="card-title"><span class="bold">symbol"</span>=
        ${result[i].symbol}"</h4>
      
        <button type="button" class="btn btn-info moreinfo" data-toggle="collapse" data-target="#demo${i}">Simple collapsible</button>
        <div id="demo${i}" class="collapse in">  
        <div class="spinner">
        <div class="rect1"></div>
        <div class="rect2"></div>
        <div class="rect3"></div>
        <div class="rect4"></div>
        <div class="rect5"></div>
      </div>
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
        var idforstring = $(this).parent().attr("id");
        var flag= $(this).parent().find("div:first").attr("class");
        console.log(flag+"flag");
        var dataplace = $(this).attr("data-target");
        console.log(coinid);
        console.log(dataplace);
        var time = new Date();
        var timenow = time.getTime();
        // =================
        // set the condition
        // =================
     if(flag!="in collapse show"){
         console.log("show")
     }
     else{
        console.log("hide")   
     }


      
        if (timearray[idforstring] == null || timenow > timearray[idforstring]) {
            // ====================
            // get data from server
            // ====================   
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
                    // =======================================
                    // set time when ajax requet made to array
                    // ======================================= 
                    var timeclicked = new Date();

                    countstart = timeclicked.getTime() + 120000;
                    timearray[idforstring] = countstart;
                    console.log("SERVER" + "the request::" + timearray[idforstring] +
                        "timenow::" + timenow);
                    // =============================== 
                    // store the data to local storage
                    // =============================== 

                    var checker = localStorage.getItem("coinsdata");
                    if (checker == null) {
                        storage_array = [];
                    }
                    else {
                        storage_array = JSON.parse(localStorage.getItem("coinsdata"));
                    }
                    console.log(storage_array);
                    var thiscoin = {};
                    thiscoin.dollar = result.market_data.current_price.usd;
                    thiscoin.euro = result.market_data.current_price.eur;
                    thiscoin.shekels = result.market_data.current_price.ils;
                    thiscoin.pic = result.image.small;
                    console.log(thiscoin);
                    console.log(storage_array);
                    storage_array[idforstring] = thiscoin;
                    var array2storage = JSON.stringify(storage_array);
                    localStorage.setItem("coinsdata", array2storage);

                }
            });
        }
                    // =============================== 
                    // get data from local storage
                    // =============================== 
        else {
            console.log("LOCAL" + "the request::" + timearray[idforstring]
                + "timenow::" + timenow);
                fromstorage = JSON.parse(localStorage.getItem("coinsdata"));
                console.log(fromstorage);
                console.log("this data"+fromstorage[idforstring].dollar);
                $("body").find(`${dataplace}`).html(`
                <div class="row">
                <div class="col-lg-6">
                <h1>from local storage</h1>            
                <span> <span class="bold">${fromstorage[idforstring].dollar}$</span></span><br> 
                <span> <span class="bold">${fromstorage[idforstring].euro}€</span></span><br> 
                <span> <span class="bold">₪${fromstorage[idforstring].shekels}</span></span><br>    
                </div>
                <div class="col-lg-6">            
                <img src="${fromstorage[idforstring].pic}" class="rounded" alt="Cinque Terre">           
                </div>
                </div>
                `);
                
        }


  


    });
});