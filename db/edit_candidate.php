<?php
require_once('conn.php');

// if (isset($_GET['for']) && $_GET['for'] == "get_all_data") {
//     $sql = "select * from candidate";
//     $res = mysqli_query($conn, $sql);
//     $data = array();
//     if (mysqli_num_rows($res) > 0) {
//         while ($row = mysqli_fetch_assoc($res)) {
//             $data[] = $row;
//         }
//     };
//     echo $json_data = json_encode($data);
// }
// // for all project of candidate
if (isset($_GET['for']) && $_GET['for'] == "get_all_project" && isset($_GET['cand_id']) && $_GET['cand_id'] != "") {
    $cand_id = $_GET['cand_id'];
    $sql = "select * from candidate_project where cand_id=$cand_id";
    $res = mysqli_query($conn, $sql);
    $data = array();
    if (mysqli_num_rows($res) > 0) {
        while ($row = mysqli_fetch_assoc($res)) {
            $data[] = $row;
        }
    };
    echo $json_data = json_encode($data);
}
$formdata = json_decode(file_get_contents("php://input"));

if (isset(array_keys($_POST)[0])) {
    // print_r($_POST);die;
    $project = array_keys($_POST)[0];
    $project = json_decode($project);
    $project = json_decode(json_encode($project), true);
}
// print_r($project);
// echo $project['for'];
// foreach ($_POST as $key => $value) {
//     print_r($key);
// }
// print_r($formdata);
if (isset($project['for']) && $project['for'] == "insert_project_candidate") {
    // print_r($formdata);
    // print_r($_FILES);
    // print_r( $_FILES['file']['name']);
    // if (!empty($_FILES)) {
    //     $path = 'upload/' . $_FILES['file']['name'];
    //     if (move_uploaded_file($_FILES['file']['tmp_name'], $path)) {
    //         $insertQuery = "INSERT INTO tbl_images(name) VALUES ('" . $_FILES['file']['name'] . "')";
    //         if (mysqli_query($connect, $insertQuery)) {
    //             echo 'File Uploaded';
    //         } else {
    //             echo 'File Uploaded But not Saved';
    //         }
    //     }
    // } else {
    //     echo 'Some Error';
    // }
    // die;
    $hidden_id = $project['hidden_id'];
    $cand_id = $project['cand_id'];
    $project_name = $project['project_name'];
    $website = $project['website'];
    $role = $project['role'];
    $start_date = $project['start_date'];
    $end_date = $project['end_date'];
    $still_work = $project['still_work'];
    $resume = $project['resume'];
    $project_desc = $project['project_desc'];
    $add_teammate = $project['add_teammate'];
    $skill = $project['skill'];

    if ($hidden_id > 0) {
        $sql = "UPDATE candidate_project SET cand_id='$cand_id',project_name='$project_name',website='$website',role='$role',start_date='$start_date',end_date='$end_date',still_work='$still_work',resume='$resume',project_desc='$project_desc',add_teammate='$add_teammate',skill='$skill'
        WHERE id=$hidden_id";
        $msg = "updated";
    } else {
        $sql = "INSERT into candidate_project(cand_id,project_name,website,role,start_date,end_date,still_work,resume,project_desc,add_teammate,skill) values('$cand_id','$project_name','$website','$role','$start_date','$end_date','$still_work','$resume','$project_desc','$add_teammate','$skill')";
        $msg = "insert";
    }
    $res = mysqli_query($conn, $sql);
    if ($res) {
        $status = 200;
    } else {
        $status = 202;
        $msg = "Having some issue!";
    }
    $output = array(
        'status'  => $status,
        'message' => $msg
    );
    echo json_encode($output);
}
// for delete project
if (isset($project['for']) && $project['for'] == "for_delete") {
// if (isset($formdata->for) && $formdata->for == "for_delete") {
    // print_r($formdata);
    $id = $project['proj_id'];
    $sql = "DELETE FROM candidate_project WHERE id = $id";
    $res = mysqli_query($conn, $sql);
    if ($res) {
        $status = 200;
        $msg = "Deleted";
    } else {
        $status = 202;
        $msg = "Having some issue!";
    }
    $output = array(
        'status'  => $status,
        'message' => $msg
    );
    echo json_encode($output);
}

if (isset($project['for']) && $project['for'] == "for_edit_project") {
    // print_r($formdata);
    $id = $project['proj_id'];
    $sql = "SELECT * FROM candidate_project WHERE id = $id";
    $res = mysqli_query($conn, $sql);
    $data = array();
    if (mysqli_num_rows($res) > 0) {
        while ($row = mysqli_fetch_assoc($res)) {
            $data[] = $row;
        }
    };
    echo $json_data = json_encode($data);
}
