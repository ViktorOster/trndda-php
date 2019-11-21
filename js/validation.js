Shiny.addCustomMessageHandler("myCallbackHandler",
              function(index) {
              document.getElementById("tbselector").style.display = "block";
              });
              
              
Shiny.addCustomMessageHandler("myCallbackHandler",
              function(login_check) {
              document.getElementById("headwrapper_div").style.display = "block";
              document.getElementById("login_div").style.display = "none";
              });
              

function fileValidation() {
    var fileInput = document.getElementById('file');
    var filePath = fileInput.value;
    var allowedExtensions = /(\.txt|\.csv|\.xls|\.xlsx|\.dta|\.sas7bdat|\.sav|\.htm|\.html|\.asp|\.aspx|\.php|\.docx|\.pdf)$/i;
    if(!allowedExtensions.exec(filePath)){
        alert('Please upload file having extensions .txt, .csv, .xls, .xlsx, .dta, .sas7bdat, .sav, .htm, .html, .asp, .aspx, .php, .docx or .pdf only.');
        fileInput.value = '';
        return false;
}
return true;
}


$(document).ready(function() {
  $('#file').change(function() {
    var fileInput = document.getElementById('file').value;
    var fileExt = fileInput.split('.').pop();
    if(fileExt=='xls' || fileExt=='xlsx' || fileExt=='htm' || fileExt=='html' || fileExt=='asp' || fileExt=='aspx' || fileExt=='php' || fileExt=='docx' || fileExt=='pdf'){
      $("#txt_no").show();
    } else {
      $("#txt_no").hide();
    }
  });
});


$(document).ready(function() {
  $('#Go').click(function() {
    var urlInput = document.getElementById('url_link').value;
    var fileExt = urlInput.split('.').pop();
    if(fileExt=='xls' || fileExt=='xlsx' || fileExt=='htm' || fileExt=='html' || fileExt=='asp' || fileExt=='aspx' || fileExt=='php' || fileExt=='docx' || fileExt=='pdf'){
      $("#txt_no").show();
    } else if(fileExt=='txt' || fileExt=='csv' || fileExt=='xls' || fileExt=='sas' || fileExt=='dta' || fileExt=='sas7bdat' || fileExt=='sav'){
      $("#txt_no").hide();
    }
  });
});


$(document).ready(function() {
    $('#url_link').click(function() {
          $("#file").attr("disabled", "disabled");
    });
});


$(document).ready(function() {
    $('#file').click(function() {
          $("#url_link").attr("disabled", "disabled");
          $("#Go").attr("disabled", "disabled");
    });
});


$(document).ready(function() {
    $('#resetInputs').click(function() {
          $("#url_link").removeAttr('disabled');
          $("#url_link").val("");
          $("#txt_no").val(0);
          $("#Go").removeAttr('disabled');
          $("#file").removeAttr('disabled');
    });
});


$(document).ready(function() {
  $('#logout').click(function() {
  window.history.go(0);
  });
});