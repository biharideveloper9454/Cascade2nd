$(document).ready(function () {
    ShowData();
});
function ShowData() {
    $.ajax({
        url: 'UploadFile/ShowData',
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json;charset=utf=8',
        success: function (result) {
            var data = '';
            $.each(result, function (key, item) {
                data += '<tr>';
                data += '<td>' + item.id + '</td>';
                data += '<td>' + item.name + '</td>';
                data += '<td>' + item.gender + '</td>';
                data += '<td>' + item.country + '</td>';
                data += '<td>' + item.state + '</td>';
                data += '<td>' + item.city + '</td>';
                data += '<td><img src=' + item.image +' width="50px;" height="50px;"></td>';
                data += '<td><a href="#" onclick="Delete(' + item.id + ')" class="btn btn-sm btn-danger">Delete</a><span class="text-success"> || </span><a href="#" return="Edit(' + item.id + ')" class="btn btn-sm btn-primary">Edit</a></td>';
                data += '</tr>';
            });
            $('.tbody').html(data);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function Add() {
    var obj = {
        name:$('#Name').val(),
        gender:$('#Gender').val(),
        country:$('#Country').val(),
        state:$('#State').val(),
        city:$('#City').val(),
        image:$('#Image').val()
    }
    $.ajax({
        url: 'UploadFile/Create',
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json;charset=utf=8',
        data: JSON.stringify(obj),
        success: function () {
            blank();
            $('#myModal').hide();
            ShowData();
            alert('Data Saved!');
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
function blank() {
    debugger;
    name: $('#Name').val('');
    gender: $('#Gender').val('');
    country: $('#Country').val('');
    state: $('#State').val('');
    city: $('#City').val('');
    image: $('#Image').val('');
}
function Delete(Id) {
    $.ajax({
        url: "UploadFile/Delete?id=" + Id,
        type: "POST",
        dataType: "json",
        contentType: "application/json;charset=utf=8",
        success: function (result) {
            alert("Record Deleted");
            ShowData();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }

    });
}
function HideKey() {
    $('#myModalLabel').text('Add User');
    $('#Id').parent().hide();
}