<?php
require_once('conn.php');

if (isset($_GET['for']) && $_GET['for'] == "get_all_data") {
    $sql = "select * from candidate";
    $res = mysqli_query($conn, $sql);
    $data = array();
    if (mysqli_num_rows($res) > 0) {
        while ($row = mysqli_fetch_assoc($res)) {
            $data[] = $row;
        }
    };
    echo $json_data = json_encode($data);
}
// for candidate detail
if (isset($_GET['for']) && $_GET['for'] == "get_cand_detail" && isset($_GET['cand_id']) && $_GET['cand_id']!="") {
    $cand_id= $_GET['cand_id'];
    $sql = "select * from candidate where id=$cand_id";
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
if (isset($formdata->for) && $formdata->for == "insert_candid") {
    // print_r($formdata);
    $hidden_id = $formdata->hidden_id;
    $name = $formdata->name == "" ? "" : $formdata->name;
    $email = $formdata->email;
    $contact = $formdata->contact;
    $pass = base64_encode($formdata->pass);
    $address1 = $formdata->address1;
    $address2 = $formdata->address2;
    $city = $formdata->city;
    $state = $formdata->state;
    $pincode = $formdata->pincode;

    if ($hidden_id > 0) {
        $sql = "UPDATE candidate SET name='$name',email='$email',contact='$contact',pass='$pass',address1='$address1',address2='$address2',city='$city',state='$state',pincode='$pincode' WHERE id=$hidden_id";
        $msg = "updated";
    } else {
        $sql = "INSERT into candidate(name,email,contact,pass,address1,address2,city,state,pincode) values('$name','$email','$contact','$pass','$address1','$address2','$city','$state','$pincode')";
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
if (isset($formdata->for) && $formdata->for == "for_delete") {
    // print_r($formdata);
    $id = $formdata->id;
    $sql = "DELETE FROM candidate WHERE id = $id";
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

if (isset($formdata->for) && $formdata->for == "for_edit") {
    // print_r($formdata);
    $id = $formdata->id;
    $sql = "SELECT * FROM candidate WHERE id = $id";
    $res = mysqli_query($conn, $sql);
    $data = array();
    if (mysqli_num_rows($res) > 0) {
        while ($row = mysqli_fetch_assoc($res)) {
            $data[] = $row;
        }
    };
    echo $json_data = json_encode($data);
}
