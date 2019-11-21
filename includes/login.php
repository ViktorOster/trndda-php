<?php
   if (isset($_POST['login_user'])) {
      // username and password sent from form 
      
      $myusername = mysqli_real_escape_string($db,$_POST['userName']);
      $mypassword = mysqli_real_escape_string($db,$_POST['password']); 
      
      $sql = "SELECT * FROM users WHERE name = '$myusername' and password = '$mypassword'";
      $result = mysqli_query($db,$sql) or die("Could not connect database " .mysqli_error($db));
  
      $count = mysqli_num_rows($result);
      
      // If result matched $myusername and $mypassword, table row must be 1 row
		
      if($count == 1) {
         $_SESSION['username'] = $myusername;
         $_SESSION['logged'] = true;
         
         //header("location: welcome.php");
      } else {
         $error = "Your Login Name or Password is invalid";
         //error message that disappears after time
         echo '<div class="notification notification--error">'.$error.'.</div>';
      }
   }
?>