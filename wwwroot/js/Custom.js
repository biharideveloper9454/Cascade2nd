$(function () {
    $("#Submit").click(function () {Submit
    
        var isactive = true;
        var Name = $("#Name").val();
        var State = $("#State").val();
        var City = $("#City").val();
        if (Name == "") {
            $("#Nameerr").html('Name can not be blank');
            isactive = false   
        }
        else {
            $("#Nameerr").html('');
            isactive = true
        }
        if (State == "") {
            $("#Stateerr").html('State can not be blank');
            isactive = false  
        }
        else {
            $("#Stateerr").html('');
            isactive = true
        }
        if (City == "") {
            $("#Cityerr").html('Ctiy can not be blank');
            isactive = false  
        }
        else {
            $("#Cityerr").html('');
            isactive = true
        }
        if (isactive == false) {
            return false;
        }
        else {
            name = $("#Name").val();
            state = $("#State").val();
            city = $("#City").val();
            $.ajax({
                type: "post",
                url: "/drop/create/",
                data: {
                    "name": Name,
                    "state": State,
                    "city": City,
                },
                success: function (response) {
                    alert('ok');
                }
            });
        }
        
        //var ddstate = $("#state");
        //if (ddstate.val() == "") {
        //    alert("please select a state !");
        //    return false;
        //}
        //return true;
    });
});