$(document).ready(function () {
    $("button").click(function () {
        $.ajax({
            url: "https://api.coingecko.com/api/v3/coins/list", success: function (result) {
                console.log(result);
                for (var i = 0, len = 10; i < len; i++) {
                    $(".row").append(`
<!-- card -->
<div class="card col-lg-3">
    <div class="card-body">
        <h4 class="card-title"><span class="bold">id=</span>"${result[i].id}"</h4>
        <h4 class="card-title"><span class="bold">symbol"</span>=
        ${result[i].symbol}"</h4>
        <h4 class="card-title"><span class="bold">"name=</span>${result[i].name}"</h4>
        <button type="button" class="btn btn-info" data-toggle="collapse" data-target="#demo${i}">Simple collapsible</button>
        <div id="demo${i}" class="collapse in">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit,
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </div>
    </div>
</div>

`);
                }


            }
        });
    });
});