Shiny.addCustomMessageHandler("myCallbackHandler",
              function(index) {
              document.getElementById("fltxt_no").style.display = "block";
              });
              
            
Shiny.addCustomMessageHandler("myCallbackHandler",
              function(login_check) {
              document.getElementById("headwrapper_div").style.display = "block";
              document.getElementById("login_div").style.display = "none";
              });
              
              
//File Upload Validation
$(document).ready(function() {
  $('#file').change(function() {
    var fileInput = document.getElementById('file').value;
    var fileExt = fileInput.split('.').pop();
    if(fileExt=='txt' || fileExt=='csv' || fileExt=='xls' || fileExt=='sas' || fileExt=='dta' || fileExt=='sas7bdat' || fileExt=='sav' || fileExt=='xls' || fileExt=='xlsx' || fileExt=='htm' || fileExt=='html' || fileExt=='asp' || fileExt=='aspx' || fileExt=='php' || fileExt=='docx' || fileExt=='pdf'){
      $("#ferrmsg").text('');
    } else {
      $("#ferrmsg").text('Invalid file. Accepted files are txt, csv, xls, xlsx, sas, spss, stata, htm, html, php, asp, docx and pdf');
      return false;
    }
  });
});


//File Upload Numeric Toggle
$(document).ready(function() {
  $('#file').change(function() {
    var fileInput = document.getElementById('file').value;
    var fileExt = fileInput.split('.').pop();
    if(fileExt=='xls' || fileExt=='xlsx' || fileExt=='htm' || fileExt=='html' || fileExt=='asp' || fileExt=='aspx' || fileExt=='php' || fileExt=='docx' || fileExt=='pdf'){
      $("#fltxt_no").show();
    } else {
      $("#fltxt_no").hide();
    }
  });
});


//Url Validation
$(document).ready(function() {
  $('#url_link_search').click(function() {
    var fileInput = document.getElementById('url_link_text').value;
    var fileExt = fileInput.split('.').pop();
    if(fileExt=='txt' || fileExt=='csv' || fileExt=='xls' || fileExt=='sas' || fileExt=='dta' || fileExt=='sas7bdat' || fileExt=='sav' || fileExt=='xls' || fileExt=='xlsx' || fileExt=='htm' || fileExt=='html' || fileExt=='asp' || fileExt=='aspx' || fileExt=='php' || fileExt=='docx' || fileExt=='pdf'){
      $("#uerrmsg").text('');
    } else {
      $("#uerrmsg").text('Invalid file. Accepted files are txt, csv, xls, xlsx, sas, spss, stata, htm, html, php, asp, docx and pdf');
      return false;
    }
  });
});


//Url Validation Numeric Toggle
$(document).ready(function() {
  $('#url_link_search').click(function() {
    var urlInput = document.getElementById('url_link_text').value;
    var fileExt = urlInput.split('.').pop();
    if(fileExt=='xls' || fileExt=='xlsx' || fileExt=='htm' || fileExt=='html' || fileExt=='asp' || fileExt=='aspx' || fileExt=='php' || fileExt=='docx' || fileExt=='pdf'){
      $("#wbtxt_no").show();
    } else{
      $("#wbtxt_no").hide();
    }
  });
});


//Toggle Table Information
$(document).ready(function() {
    $("#fltxt_no").change(function() {
        if (this.value >= 1) {
            $("#togEdit_div").css("display", "block");
        }
        else {
            $("#togEdit_div").css("display", "none");
        }
    });
});

$(document).ready(function() {
    $("#wbtxt_no").change(function() {
        if (this.value >= 1) {
            $("#togEdit_div").css("display", "block");
        }
        else {
            $("#togEdit_div").css("display", "none");
        }
    });
});


//Reset Tabs
$(document).ready(function() {
  $('#flextractor').click(function() {
  });
});

$(document).ready(function() {
  $('#wbextractor').click(function() {
  });
});



//Numeric Input 
$('#url_link_reset').click(function() {
$('txt_no').on('input', function() {
});
});


//Disable Search Button
$(document).ready(function() {
    $("#url_link_search").prop('disabled',true);
    $('#selcat').change(function() {
        if ($('#selcat').val() === "") {
          $("#url_link_search").prop('disabled',true);
        } else {
          $("#url_link_search").prop('disabled',false);
        }
    });
});


$(document).ready(function() {
  setTimeout(function() {
    shinyBS.addTooltip('selcat', 'tooltip', {'placement': 'bottom', 'trigger': 'hover', 'title': 'Select a category that best describes the data'})}, 500)});


//Reset Url Input Field
$(document).ready(function() {
  $('#url_link_reset').click(function() {
  $('#url_link_text').val('');  
  });
});


//Logout
$(document).ready(function() {
  $('#logout').click(function() {
  window.history.go(0);
  });
});