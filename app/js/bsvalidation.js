$(document).ready(function() {
$('#signupbtn').click(function() {
  $('#signupbtn').html('<span class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>Loading...').addClass('enabled');
});
	});


$(document).ready(function() {
$('#submitref').click(function() {
  $('#submitref').html('<span class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>Loading...').addClass('enabled');
});
	});


$(document).ready(function() {
$('#pwdreset').click(function() {
  $('#pwdreset').html('<span class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>Loading...').addClass('enabled');
});
	});


//referral email
$(document).ready(function() {
    $('#referralForm').bootstrapValidator({
        // To use feedback icons, ensure that you use Bootstrap v3.1.0 or later
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            fName: {
                message: 'The first name is not valid',
                validators: {
                    notEmpty: {
                        message: 'The first name is required'
                    },
                    stringLength: {
                        max: 20,
                        message: 'The username cannot be more than 20 characters long'
                    },
                    regexp: {
                        regexp: /^[a-zA-Z-' ]+$/,
                        message: 'The first name can only consist of alphabets'
                    },
                }
            },
            lName: {
                message: 'The last name is not valid',
                validators: {
                    notEmpty: {
                        message: 'The last name is required'
                    },
                    stringLength: {
                        max: 20,
                        message: 'The username cannot be more than 20 characters long'
                    },
                    regexp: {
                        regexp: /^[a-zA-Z-' ]+$/,
                        message: 'The last name can only consist of alphabets'
                    },
                }
            },
            email: {
                validators: {
                    notEmpty: {
                        message: 'The email address is required and cannot be empty'
                    },
                    emailAddress: {
                        message: 'The email address is not valid',
                    },
                    remote: {
						message: 'The email address already exists.',
						url: "checkrefemail.php"
                    }
                }
            }
        }
    });
});


//forgotpassword
$(document).ready(function() {
    $('#forgotpasswordForm').bootstrapValidator({
        // To use feedback icons, ensure that you use Bootstrap v3.1.0 or later
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            email: {
                validators: {
                    notEmpty: {
                        message: 'The email address is required and cannot be empty'
                    },
                    emailAddress: {
                        message: 'The email address is not valid'
                     },
                    remote: {
						message: 'The email address is already taken',
						url: "checkforgotpwd.php"
                    }
                }
            }
        }
    });
});


//createpassword
$(document).ready(function() {
    $('#resetpasswordForm').bootstrapValidator({
        // To use feedback icons, ensure that you use Bootstrap v3.1.0 or later
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            email: {
                validators: {
                    notEmpty: {
                        message: 'The email address is required and cannot be empty'
                    },
                    emailAddress: {
                        message: 'The email address is not valid'
                     },
                    remote: {
						message: 'The email address is already taken',
						url: "checkforgotpwd.php"
                    }
                }
            },
            password: {
                validators: {
                    notEmpty: {
                        message: 'The password is required'
                    },
                    stringLength: {
                        min: 8,
                        message: 'The password must have at least 8 characters'
                    }
                }
            },	
            confirmpassword: {
                validators: {
                    notEmpty: {
                        message: 'The password is required'
                    },
                    identical: {
                        field: 'password',
                        message: 'The password should be the same as password the above'
                    },
                    stringLength: {
                        min: 8,
                        message: 'The password must have at least 8 characters'
                    }
                }
            }
        }
    });
});



//registration
$(document).ready(function() {
    $('#registrationForm').bootstrapValidator({
        // To use feedback icons, ensure that you use Bootstrap v3.1.0 or later
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            fName: {
                message: 'The first name is not valid',
                validators: {
                    notEmpty: {
                        message: 'The first name is required'
                    },
                    stringLength: {
                        max: 20,
                        message: 'The username cannot be more than 20 characters long'
                    },
                    regexp: {
                        regexp: /^[a-zA-Z-' ]+$/,
                        message: 'The first name can only consist of alphabets'
                    },
                }
            },
            lName: {
                message: 'The last name is not valid',
                validators: {
                    notEmpty: {
                        message: 'The last name is required'
                    },
                    stringLength: {
                        max: 20,
                        message: 'The username cannot be more than 20 characters long'
                    },
                    regexp: {
                        regexp: /^[a-zA-Z-' ]+$/,
                        message: 'The last name can only consist of alphabets'
                    },
                }
            },
            userName: {
                message: 'The username is not valid',
                validators: {
                    remote: {
						message: 'The username is already taken',
						url: "checkusername.php"
                    },
                    notEmpty: {
                        message: 'The username is required'
                    },
                    stringLength: {
                        max: 20,
                        message: 'The username cannot be more than 20 characters long'
                    },
                    regexp: {
                        regexp: /^[a-zA-Z-' ]+$/,
                        message: 'The username can only consist of alphabets'
                    },
                    different: {
                        field: 'password',
                        message: 'The username and password cannot be the same'
                    }
                }
            },
            organization: {
                validators: {
                    notEmpty: {
                        message: 'The organization is required'
                    }
                }
            },
            email: {
                validators: {
                    notEmpty: {
                        message: 'The email address is required'
                    },
                    emailAddress: {
                        message: 'The email address is not valid'
                    },
                    remote: {
						message: 'The email address is already taken',
						url: "checkform.php"
                    }
                }
            },
            password: {
                validators: {
                    notEmpty: {
                        message: 'The password is required'
                    },
                    different: {
                        field: 'userName',
                        message: 'The password cannot be the same as username'
                    },
                    stringLength: {
                        min: 8,
                        message: 'The password must have at least 8 characters'
                    }
                }
            },
			
            confirmpassword: {
                validators: {
                    notEmpty: {
                        message: 'The password is required'
                    },
                    identical: {
                        field: 'password',
                        message: 'The password should be the same as password the above'
                    },
                    stringLength: {
                        min: 8,
                        message: 'The password must have at least 8 characters'
                    }
                }
            }			
        }
    });
});
	

//sign in
$(document).ready(function() {
    $('#loginForm').bootstrapValidator({
        // To use feedback icons, ensure that you use Bootstrap v3.1.0 or later
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            userName: {
                message: 'The username is not valid',
                validators: {
                    notEmpty: {
                        message: 'The username is required'
                    },
                    stringLength: {
                        max: 20,
                        message: 'The username cannot be more than 20 characters long'
                    },
                    regexp: {
                        regexp: /^[a-zA-Z-' ]+$/,
                        message: 'The username can only consist of alphabets'
                    },
                    different: {
                        field: 'password',
                        message: 'The username and password cannot be the same'
                    }
                }
            },
            password: {
                validators: {
                    notEmpty: {
                        message: 'The password is required'
                    },
                    different: {
                        field: 'userName',
                        message: 'The password cannot be the same as username'
                    },
                    stringLength: {
                        min: 8,
                        message: 'The password must have at least 8 characters'
                    }
                }
            }			
        }
    });
});


//contact-form
$(document).ready(function() {
    $('#contact-form').bootstrapValidator({
        // To use feedback icons, ensure that you use Bootstrap v3.1.0 or later
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            email: {
                validators: {
                    notEmpty: {
                        message: 'The email address is required and cannot be empty'
                    },
                    emailAddress: {
                        message: 'The email address is not valid'
                    }
                }
            },
            message: {
                validators: {
                    notEmpty: {
                        message: 'This field is required and cannot be empty'
                    }
                }
            }
        }
    });
});


//$(document).ready(function() {
    //$("#signupbtn").click(function() {
          //$("#loading").show();
    //});
//});
