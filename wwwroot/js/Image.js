function UploadFile() {
    debugger;
    var fileUpload = $("#files").get(0);
    debugger;
    var files = fileUpload.files;
    var data = new FormData();
    debugger;
    data.append(files[0].name, files[0]);
    debugger;
    $.ajax({
        type: "POST",
        url: "/Image/Upload_File",
        contentType: false,
        processData: false,
        data: data,
        async: false,
        success: function () {
            alert('File Uploaded!');
        },
        error: function () {
            alert("Error!");
        }
    });

}