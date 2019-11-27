<!-- sign up, login modal -->
<!-- include on all pages where user can login/logout -->
<?php 
    include("config.php");
    session_start();
    include 'login.php';
    include 'logout.php'; 
    include 'signup.php'; 
    include 'forgotPassword.php'; 
?>

<div class="modal-container">
    <div class="modal-container-2">
        <div class="modal-custom modal-signIn-signUp">

            <div class="modal__top-content-mobile">
                <div class="text-right">
                    <button class="modal__close">
                        X
                    </button>
                </div>

                <img class="modal__logo" src="./assets/trndda_logo.svg" alt="">
                <div class="text-center">
                    <button class="modal__signIn-tab">Login</button>
                    <button class="modal__signUp-tab is-active">Sign Up</button>
                </div>

            </div>

            <div class="modal__signIn">
                <div class="modal__left-content modal__left-content-signIn">
                    <img src="./assets/trndda_logo.svg" alt="">
                    <p class="text-bigger">Auto-detect, edit and export tables in 3 clicks.</p>
                    <p>
                        Ready to get going?
                        <br>
                        Sign in or sign up now!
                    </p>
                </div>
                <div class="modal__right-content">
                    <div class="modal__top-content-desktop">
                        <div class="text-right">
                            <button class="modal__close">
                                X
                            </button>
                        </div>

                        <div class="text-center">
                            <button class="modal__signIn-tab">Login</button>
                            <button class="modal__signUp-tab is-active">Sign Up</button>
                        </div>
                    </div>
                    <form action="" method="POST">
                        <div class="form-group">
                            <label hidden for="">Username</label>
                            <input class="form-control" required="true" type="text" name="userName" maxlength="100"
                                placeholder="Username">
                        </div>
                        <div class="form-group">
                            <label hidden for="">Password</label>
                            <input class="form-control" required="" type="password" name="password"
                                placeholder="Password">
                        </div>
                        <div class="text-center">
                            <input class="button" type="submit" name="login_user" value="Log In">
                        </div>
                        <div class="text-center mt-3 text-small">
                            <a data-js="forgot-password-link" href="#">Forgot password?</a>
                        </div>
                    </form>
                </div>
            </div>

            <div class="modal__forgot-password">
                <div class="modal__left-content modal__left-content-signUp">
                    <img src="./assets/trndda_logo.svg" alt="">
                    <p class="text-bigger">Auto-detect, edit and export tables in 3 clicks.</p>
                    <p>
                        Ready to get going?
                        <br>
                        Sign in or sign up now!
                    </p>
                </div>
                <div class="modal__right-content">
                    <div class="modal__top-content-desktop">
                        <button class="modal-forgot-password__back">
                            <img height="30px" src="./assets/icons/back-button-filled.svg" alt="">
                        </button>
                        <div class="text-right">
                            <button class="modal__close">
                                X
                            </button>
                        </div>

                        <div class="text-center">
                            <p class="reset-password-text">Reset your password</p>
                        </div>
                    </div>

                    <form method="POST" action="" novalidate="novalidate">
                        <p class="reset-password-text-mobile text-center mb-3">Reset your password</p>
                        <div class="form-group">
                            <label hidden for="">Email</label>
                            <input class="form-control" required="true" type="text" name="email" maxlength="100"
                                placeholder="Email">
                        </div>
                        <div class="text-center">
                            <input class="button" name="pwdreset" type="submit" value="Send Email">
                        </div>

                    </form>
                </div>
            </div>

            <div class="modal__signUp is-showing">
                <div class="modal__left-content modal__left-content-signUp">
                    <img src="./assets/trndda_logo.svg" alt="">
                    <p class="text-bigger">Auto-detect, edit and export tables in 3 clicks.</p>
                    <p>Sign up for free to start detecting, editing and exporting tables</p>
                    <p class="text-small">You accept our <a href="/terms.php">Terms and Conditions</a> by creating your
                        account.</p>
                </div>
                <div class="modal__right-content">
                    <div class="modal__top-content-desktop">
                        <div class="text-right">
                            <button class="modal__close">
                                X
                            </button>
                        </div>

                        <div class="text-center">
                            <button class="modal__signIn-tab">Login</button>
                            <button class="modal__signUp-tab is-active">Sign Up</button>
                        </div>
                    </div>

                    <form method="POST" action="">
                        <div class="form-group">
                            <label hidden for="">First Name</label>
                            <input class="form-control" required="true" type="text" name="firstName" maxlength="100"
                                placeholder="First Name">
                        </div>
                        <div class="form-group">
                            <label hidden for="">Last Name</label>
                            <input class="form-control" required="true" type="text" name="lastName" maxlength="100"
                                placeholder="Last Name">
                        </div>
                        <div class="form-group">
                            <label hidden for="">Username</label>
                            <input class="form-control" required="true" type="text" name="userName" maxlength="100"
                                placeholder="Username">
                        </div>
                        <div class="form-group">
                            <label hidden for="">Organization</label>
                            <input class="form-control" required="true" type="text" name="organization"
                                maxlength="100" placeholder="Organization">
                        </div>
                        <div class="form-group">
                            <label hidden for="">Email</label>
                            <input class="form-control" required="true" type="text" name="email" maxlength="100"
                                placeholder="Email">
                        </div>
                        <div class="form-group">
                            <label hidden for="">Password</label>
                            <input class="form-control" required="true" type="password" name="password"
                                maxlength="100" placeholder="Password">
                        </div>
                        <div class="form-group">
                            <label hidden for="">Confirm Password</label>
                            <input class="form-control" required="true" type="password" name="confirmPassword"
                                maxlength="100" placeholder="Confirm Password">
                        </div>
                        <div class="text-center">
                            <input class="button" name="signup_user" type="submit" value="Sign Up">
                        </div>

                    </form>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- dark overlay on site when modal is active -->
<div class="dark-overlay">
</div>