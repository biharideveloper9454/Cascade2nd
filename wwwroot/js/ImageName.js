
$(document).ready(function () {
    $('#btnEdit').click(function () {
        ('#myModal').modal("show");
    });
    ShowDataAll();
    Countries();
    States();
    Cities();
    $('#ddlState').append("<option>--Select State--</option>");
    $('#ddlCity').append("<option>--Select City--</option>");
    $('#ImageShow').hide();
});
function ShowDataAll() {
    $('#Image').parent().hide();
    $('#Id').parent().hide();
    $.ajax({
        url: '/ImageName/ShowAllData',
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json;charset=utf-8',
        success: function (result) {
            var obj = '';
            $.each(result, function (key, item) {
                obj += '<tr>';
                obj += '<td>' + item.id + '</td>';
                obj += '<td>' + item.name + '</td>';
                obj += '<td>' + item.gender + '</td>';
                obj += '<td>' + item.country + '</td>';
                obj += '<td>' + item.state + '</td>';
                obj += '<td>' + item.city + '</td>';
                obj += '<td> <img src="../' + item.image + '" width="70" height="70"></td>';
                obj += '<td><a href="#"class="btn btn-sm btn-primary" onclick="Edit(' + item.id + ')">Edit</a> || <a href="#"class="btn btn-sm btn-danger" onclick="Delete(' + item.id + ')" >Delete</a></td>';
                obj += '</tr>';
            });
            $('.tbody').html(obj);
        },
        error: function (error) {
            alert(error.responseText);
        }
    });
}
function DisplayImage(result) {
    $('#ImageShow').show();
    if (result.files && result.files[0]) {
        var filereader = new FileReader();
        filereader.onload = function (e) {
            $("#ImageShow").attr('src', e.target.result);
        }
        filereader.readAsDataURL(result.files[0]);
    }
}
function UploadFile() {
    var name = $('#Name').val();
    var gender = $('#Gender').val();
    var country = $('#ddlCountry').val();
    var state = $('#ddlState').val();
    var city = $('#ddlCity').val();
    var fileUpload = $("#files").get(0);
    var files = fileUpload.files;
    var formData = new FormData();
    formData.append('Image', files[0]);
    formData.append('Name', name);
    formData.append('Gender', gender);
    formData.append('Country', country);
    formData.append('State', state);
    formData.append('City', city);
    $.ajax({
        type: "POST",
        url: "/ImageName/UploadFile",
        contentType: false,
        processData: false,
        data: formData,
        async: false,
        success: function () {
            alert('Data Saved!');
            $('#myModal').modal('hide');
        },
        error: function () {
            alert("Error!");
        }
    });
}
function Delete(Id) {
    if (confirm("Are you sure, You want to delete this record")) {
        $.ajax({
            url: '/ImageName/Delete?id=' + Id,
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json;charset=utf-8',
            success: function () {
                alert('Deleted Record!');
                ShowDataAll();
            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
    }
}
function Edit(Id) {
    $('#myModal').modal('show');
    $('#Image').parent().show();
    $('#btnSave').hide();
    $('#btnUpdate').show();
    $('#Id').parent().show();
    $('#Id').css('border-color', 'red');
    $('#btnUpdate').css('border-color', 'Tomato');
    $.ajax({
        url: '/ImageName/Edit?id=' + Id,
        type: 'GET',
        dataType: 'json',
        processData: false,
        contentType: false,
        data: {Id:$('#Id').val()},
        success: function (data) {
            if (data != null) {
                $('#Id').val(data.id);
                $('#Name').val(data.name);
                $('#Gender').val(data.gender);
                $('#Image').attr('src', data.image);   
            }
            else {
                alert('Something Wrong!');
            }
        },
        failure: function (response) {
            alert(response.responseText);
        },
        error: function (response) {
            alert(response.responseText);
        }
    });
}
function Update() {
    var id = $('#Id').val();
    var name = $('#Name').val();
    var gender = $('#Gender').val();
    var country = $('#Country').val();
    var state = $('#State').val();
    var city = $('#City').val();
    var fileUpload = $("#files").get(0);
    var files = fileUpload.files;
    var formData = new FormData();
    formData.append('Image', files[0]);
    formData.append('Name', name);
    formData.append('Id', id);
    formData.append('Gender', gender);
    formData.append('Country', country);
    formData.append('State', state);
    formData.append('City', city);
    $.ajax({
        type: "POST",
        url: "/ImageName/Update",
        contentType: false,
        processData: false,
        data: formData,
        async: false,
        success: function (response) {
            debugger;
            alert('Data Updated!');
        },
        error: function () {
            alert("Error!");
        }

    });
}
function Countries() {
    $.ajax({
        url: "/ImageName/Countries",
        type: "GET",
        cache: false,
        success: function (response) {
            $.each(response, function (key, item) {
                $("#ddlCountry").append("<option value=" + item.id + ">" + item.name + "</option>");
            });
        }
    });
}
function States() {
    $("#ddlCountry").change(function () {
        var id = $(this).val();
        $("#ddlState").empty('');
        $("#ddlState").append("<option value='Select'>--Select State--</option>")
            $.ajax({
                url: '/ImageName/States?id=' + id,
                type: "GET",
                cache: false,
                success: function (result) {
                    $.each(result, function (key, item) {
                        $('#ddlState').append("<option value=" + item.id + ">" + item.name + "</option>");
                    });
                },
                error: function (errormessage) {
                    alert(errormessage.responseText);
                }
            });
    });
}
function Cities() {
    $("#ddlState").change(function () {
        var id = $(this).val();
        $("#ddlCity").empty();
        $("#ddlCity").append("<option>--Select City--</option>")
        $.ajax({
            url: '/ImageName/Cities?id=' + id,
            type: "GET",
            cache: false,
            success: function (result) {
                $.each(result, function (key, item) {
                    $('#ddlCity').append("<option value=" + item.id + ">" + item.name + "</option>");
                });
            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
    });
}




