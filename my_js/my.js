$(document).ready(function () {
    $("button").click(function () {
        $.ajax({
            url: "https://api.coingecko.com/api/v3/coins/list", success: function (result) {
                console.log(result);
                for (var i = 0, len = 10; i < len; i++) {
                $(".row").append(`
<div class="col-lg-3">
<!-- card -->
<div class="card">
    <div class="card-body">
        <h4 class="card-title">${result[i].id}</h4>
        <h4 class="card-title">${result[i].symbol}</h4>
        <h4 class="card-title">${result[i].name}</h4>
        <a href="#" class="btn btn-primary">See Profile</a>
    </div>
</div>
</div>
`); 
                  }

            
            }
        });
    });
});