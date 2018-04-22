<?php
require '../db.php';
/* Displays user information and some useful messages */
session_start();

// Check if user is logged in using the session variable
if ( $_SESSION['logged_in'] != 1 ) {
    $_SESSION['message'] = "You must log in before viewing your profile page!";
    header("location: ../error.php");
}
else {
    // Makes it easier to read
    $first_name = $_SESSION['first_name'];
    $last_name = $_SESSION['last_name'];
    $email = $_SESSION['email'];
    $active = $_SESSION['active'];
    $types = $_SESSION['types'];
    $two_step = $_SESSION['two_step'];

}
if($types == 1)
    {
        $_SESSION['message'] = "Only students can apply for scholarships !";
        header("location: ../error.php");
        die();


}

//content

function test_input($data)
{
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}
// define variables and set to empty values

$nameErr;
$regErr;
$fileErr;
$first_name1 = $registration_number1 ='';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (empty($_POST["first_name"])) {
        $nameErr = "Name is required";
    } else {
        $first_name1 = test_input($_POST["first_name"]);
        // check if name only contains letters and whitespace
        if (!preg_match("/^[a-zA-Z ]*$/", $first_name1)) {
            $nameErr = "Only letters and white space allowed for name";
        }
    }

    if (empty($_POST["registration_number"])) {
        $regErr = "Registration Number is required.";
    } else {
        $registration_number1 = test_input($_POST["registration_number"]);

    }

    if (empty($_POST["scholarship_application"])) {
        $fileErr = "Please select a pdf file to upload.";}

    if (!empty($nameErr) or !empty($regErr) or !empty($fileErr)) {
        $_SESSION['message'] = $nameErr . '<br>' . $regErr.'<br>'.$fileErr;
        header("location: ../error.php");
        die();
    }

    $result = $mysqli->query("SELECT id FROM users WHERE email='$email'");

    if ($result->num_rows == 0) // User doesn't exist
    {
        $_SESSION['message'] = "User doesn't exist!";
        header("location: ../error.php");
        die();
    } else { // User exists (num_rows != 0)

        $user = $result->fetch_assoc(); // $user becomes array with user data

        $id = $user['id'];

        // write here code to identyfy this registration number has season email


        $target_dir = "scholarship_application_uploads/";
        $target_file = $target_dir . basename($_FILES["scholarship_application"]["name"]);
        $uploadOk = 1;
        $FileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));


        // Check if pdf file is a actual or not

        //if(isset($_POST["submit"])) {
        //    $check = getimagesize($_FILES["fileToUpload"]["tmp_name"]);
        //    if($check !== false) {
        //        echo "File is an image - " . $check["mime"] . ".";
        //        $uploadOk = 1;
        //    } else {
        //        echo "File is not an image.";
        //        $uploadOk = 0;
        //    }
        //}


        // Check if file already exists
        if (file_exists($target_file)) {
            $_SESSION['message'] = "The file already exists!";
            $uploadOk = 0;
            header("location: ../error.php");
            die();

        } // Check file size
        else if ($_FILES["scholarship_application"]["size"] > 10000000) {
            $_SESSION['message'] = "Maximum size exceeds. Maximum size is 10 MB";
            $uploadOk = 0;
            header("location: ../error.php");
            die();

        } // Allow certain file formats
        else if ($FileType != "pdf") {

            $_SESSION['message'] = "Sorry, only pdf files are allowed.";
            $uploadOk = 0;
            header("location: ../error.php");
            die();
        } // Check if $uploadOk is set to 0 by an error
        else if ($uploadOk == 0) {
            $_SESSION['message'] = "Sorry your file was not uploaded";
            header("location: ../error.php");
            die();
        } // if everything is ok, try to upload file

        else {
            if (move_uploaded_file($_FILES["scholarship_application"]["tmp_name"], $target_file)) {
                $_SESSION['message'] = "You have successfully uploaded the file. We will inform you the status soon !";
                $uploadOk = 1;
                header("location: ../success.php");
                die();

            } else {
                $_SESSION['message'] = "Sorry. Error occoured during upload";
                header("location: ../error.php");
                die();
            }
        }

    }
}
    ?>









