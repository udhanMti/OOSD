<?php
/**
 * Created by PhpStorm.
 * User: Udhan
 * Date: 7/6/2018
 * Time: 1:22 PM
 */

session_start();
require "u_connection.php";

//$user_id=$_SESSION['user_id'];
//$student_query=$mysqli->query("SELECT * FROM student_data WHERE user_id='$user_id' ");
//$student=$student_query->fetch_assoc();
//
//$reg_no=$student['registration_number'];
//$_SESSION['reg_no']=$reg_no;
//
$first_name = $_SESSION['first_name'];
$last_name = $_SESSION['last_name'];
//
//$course_query=$mysqli->query("SELECT * FROM course_registration WHERE registration_number='$reg_no' AND is_approved=1");
//$no_of_courses=$courrse_query->num_rows;
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="Vocational training center">
    <meta name="author" content="G27">
    <title>My Home : <?= $first_name.' '.$last_name ?></title>
    <?php include 'css/css.html'; ?>
</head>

<body id="page-top">


<!-- Navigation -->
<nav class="navbar navbar-expand-lg bg-secondary fixed-top text-uppercase" id="mainNav">
    <div class="container">
        <a class="navbar-brand js-scroll-trigger" href="#page-top">Emplup<i class="fa fa-user"></i></a>
        <button class="navbar-toggler navbar-toggler-right text-uppercase bg-primary text-white rounded" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
            Menu
            <i class="fa fa-bars"></i>
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
            <ul class="navbar-nav ml-auto">

                <li class="nav-item mx-0 mx-lg-1">
                    <a class="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger" href="#about"><?php echo $first_name.' '.$last_name?></a>
                </li>

                <li class="nav-item mx-0 mx-lg-1">
                    <a class="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger" href="logout.php">Logout</a>
                </li>


            </ul>
        </div>
    </div>
</nav>

<!-- Header -->
<header class="masthead bg-primary text-white text-center ">

    <div>
        <h1 class="text-uppercase mb-0">Emplup <i class="fa fa-user"></i></h1>
        <h2 style="font-size:50px" class="text-dark mb-2">Student</h2>
        <h4 class=" font-weight-light mb-0">Vocational Trainings - Student Management - Employee Management</h4>
    </div>

</header>

<!-- Dashboard Section -->
<section class="" id="portfolio">
    <div class="">
        <h2 class="text-center text-uppercase text-secondary mb-0">My Courses</h2 class="text-center text-uppercase text-secondary mb-0">
        <hr class="star-dark mb-5">
        <div class="container">
            <table class="table table-condensed">
                <thead>
                <tr>
                    <th>Course Title</th>
                    <th>Course Id</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>



                <?php require "u_search_courses.php";
                while ($course = mysqli_fetch_array($course_query_teacher,MYSQLI_NUM)) {
                    $course_id=$course[0];
                    //    $result5=$mysqli->query("SELECT * FROM courses WHERE course_id='$course_id'");
                    //    $my_course=$result5->fetch_assoc();//course2
                    ?>
                    <td class="text-success font-weight-bold"><?php echo $course[1];?></td>
                    <td class="text-success font-weight-bold"><?php echo $course_id;?></td>
                    <!--                         <tr><td><a class="text-dark" href=><li class="btn">--><?php //echo $my_course['title'];?><!--</li></a><br></td>-->
                    <td>
                        <a class="text-dark" href="u_course_session_setup.php?course_id=<?php echo $course_id;?>&course_title=<?php echo $course[1];?>"> <input class="btn btn-dark btn-lg-0" type="submit" value="View Course"></a>
                    </td>
                    </tr>
                    <?php
                }

                ?>


                </tbody>
            </table>
        </div>
    </div>
</section>

<!-- About Section -->
<section class="bg-primary text-white mb-0" id="about">
    <div class="container">
        <h2 class="text-center text-uppercase text-white">About EMPLUP</h2>
        <hr class="star-light mb-5">
        <div class="row">
            <div class="col-lg-4 ml-auto">
                <p class="lead">Basic introduction about the web site goes here! {description left]</p>
            </div>
            <div class="col-lg-4 mr-auto">
                <p class="lead">Basic introduction about the web site goes here! {description right</p>
            </div>
        </div>
        <div class="text-center mt-4">
            <a class="btn btn-xl btn-outline-light" href="#">
                <i class="fa fa-info mr-2"></i>
                Read More
            </a>
        </div>
    </div>
</section>

<!--Model-->
<!-- Footer -->
<footer class="footer text-center">
    <div class="container">
        <div class="row">
            <div class="col-md-4 mb-5 mb-lg-0">
                <h4 class="text-uppercase mb-4">Location</h4>
                <p class="lead mb-0">University of Moratuwa, <strong>Sri Lanka</strong></p>
            </div>
            <div class="col-md-4 mb-5 mb-lg-0">
                <h4 class="text-uppercase mb-4">Around the EMPLUP</h4>
                <ul class="list-inline mb-0">
                    <li class="list-inline-item">
                        <a class="btn btn-outline-light btn-social text-center rounded-circle" href="#">
                            <i class="fa fa-fw fa-facebook"></i>
                        </a>
                    </li>
                    <li class="list-inline-item">
                        <a class="btn btn-outline-light btn-social text-center rounded-circle" href="#">
                            <i class="fa fa-fw fa-google-plus"></i>
                        </a>
                    </li>
                    <li class="list-inline-item">
                        <a class="btn btn-outline-light btn-social text-center rounded-circle" href="#">
                            <i class="fa fa-fw fa-twitter"></i>
                        </a>
                    </li>
                    <li class="list-inline-item">
                        <a class="btn btn-outline-light btn-social text-center rounded-circle" href="#">
                            <i class="fa fa-fw fa-linkedin"></i>
                        </a>
                    </li>
                    <li class="list-inline-item">
                        <a class="btn btn-outline-light btn-social text-center rounded-circle" href="#">
                            <i class="fa fa-fw fa-dribbble"></i>
                        </a>
                    </li>
                </ul>
            </div>
            <div class="col-md-4">
                <h4 class="text-uppercase mb-4">Footer Note</h4>
                <p class="lead mb-0">This is the description of the footer note </p>
            </div>
        </div>
    </div>
</footer>

<div class="copyright py-4 text-center text-white">
    <div class="container">
        <small>Copyright &copy; EMPLUP 2018</small>
    </div>
</div>

<!-- Scroll to Top Button (Only visible on small and extra-small screen sizes) -->
<div class="scroll-to-top d-lg-none position-fixed ">
    <a class="js-scroll-trigger d-block text-center text-white rounded" href="#page-top">
        <i class="fa fa-chevron-up"></i>
    </a>
</div>
<script type="text/javascript" src="//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-5aa8ad68cc6156e6"></script>

<!-- Bootstrap core JavaScript -->
<script src="js/jquery.min.js"></script>
<script src="js/bootstrap.bundle.min.js"></script>

<!-- Plugin JavaScript -->
<script src="js/jquery.easing.min.js"></script>
<script src="js/jquery.magnific-popup.min.js"></script>

<!-- Contact Form JavaScript -->
<script src="js/jqBootstrapValidation.min.js"></script>
<script src="js/contact_me.js"></script>
<!-- Custom scripts for this template -->
<script src="js/freelancer.js"></script>


<?php if($_SESSION['two_step'] == 0) { ?>
    <script >
        $( document ).ready(function() {
            $('#completeProfile').modal('show');
        });

    </script>

<?php } ?>

</body>

</html>
