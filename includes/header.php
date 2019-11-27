<?php include 'loginModal.php' ?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta name="Description"
        content="Automatically detect, edit and extract tables from txt, csv, xlsx, docx, pdf, sas, spss, stata, htm, html, php and asp online and offline data sources">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="./css/bootstrap.min.css">
    <link rel="stylesheet" href="./css/bootstrapValidator.min.css">
    <link rel="stylesheet" href="./css/main.css">
    <title>Trndda - Auto-detect, edit and extract tables</title>
</head>

<body>
    
    <nav class="navbar">
        <div class="container">
            <div class="navbar__logo">
                <a href="/"><img height="55px" src="assets/trndda_logo.svg" alt=""></a>
            </div>
            <ul>
                <?php
                if(isset($_SESSION['logged']) && $_SESSION['logged']==true) { 
                    echo '<span class="nav__login-name">Welcome ' .$_SESSION["username"]. '</span>';
                } 
                ?>
                <li class="nav-link" data-js="tutorial-link">Tutorial</li>
                <li class="nav-link" data-js="about-link">About</li>
                <li class="nav-link" data-js="contact-link">Contact</li>
                <?php 
                
                if(isset($_SESSION['logged']) && $_SESSION['logged']==true) { 
                    echo "
                        <li class='nav-form-link'>
                            <form method='POST' action=''>
                                <button name='logout_user' class='nav-link button button-secondary link-login' type='submit'>Logout</button>
                            </form>
                        </li>
                    ";
                    echo '
                        <li class="nav-form-link"><a href="dataExtraction.php"><button class="button button-main link-signup">Extract Tables</button></a></li>
                    ';
                } 
                elseif(!isset($_SESSION['logged']) || $_SESSION['logged']==false) {
                    echo '
                    <li class="nav-link button button-secondary link-login show-signIn-signUp-modal show-signIn">Login</li>
                    <li class="nav-link button button-main link-signup show-signIn-signUp-modal show-signUp">Sign up free</li>
                    ';
                }
                ?>
            </ul>
        </div>
    </nav>

    <nav class="navbar-mobile">
        <div class="container">
            <div class="navbar__logo">
                <a href="/">
                    <img height="55px" src="assets/trndda_logo.svg" alt="">
                </a>
            </div>

            <div class="text-right">
                <div id="hamburger">
                    <div id="hamburger__line-1"></div>
                    <div id="hamburger__line-2"></div>
                    <div id="hamburger__line-3"></div>
                </div>
            </div>
        </div>

        <ul id="navbar-mobile__links" class="ml-auto mr-auto">
            <?php
                if(isset($_SESSION['logged']) && $_SESSION['logged']==true) { 
                    echo '<li class="nav__login-name">Welcome ' .$_SESSION["username"]. '</li>';
                } 
            ?>

            <li data-js="tutorial-link">Tutorial</li>
            <li data-js="about-link">About</li>
            <li data-js="contact-link">Contact</li>
            <?php 
            if($_SESSION['logged']==true) { 
                echo "<li class='link-login'><a href='logout.php'>Logout</a></li>";
            } 
            elseif($_SESSION['logged']==false) {
                echo '
                <li class="link-login show-signIn-signUp-modal show-signIn">Login</li>
                <li class="link-signup show-signIn-signUp-modal show-signUp">Sign up free</li>
                ';
            }
            ?>
        </ul>
    </nav>

    <script type="text/javascript" src="./js/jquery-3.3.1.min.js"></script>
    <script type="text/javascript" src="./js/bsvalidation.js"></script>
    <script type="text/javascript" src="./js/bootstrapValidator.min.js"></script>