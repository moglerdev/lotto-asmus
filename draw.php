<?php
/// 2019 (c) Copyrights by Asmus, Bartsch, Pauli

    $_POST = json_decode(file_get_contents('php://input'), true);

    function getDraw($country){
        $result = [];

        for($i = 0; $i < $country["max"]; $i++){
            $result[$i] = rand(1, $country["count"]);

            for($e = 0; $e < $i; ++$e){
                if($result[$i] == $result[$e]){
                    --$i;
                    break;
                }
            }
        }
        return $result;
    }


    function getEquals($row, $draw, &$equals){
        // (Schein) row = [1, 20, 12, 38, 90]
        $count = -1;
        foreach($row as $key => $col){
            //col = 20
            //draw = [1, 2, 8, 19, 23],
            foreach($draw as $dKey => $num){
                //draw = 1,
                if($col == $num){
                    ++$count;
                }
            }
            if(!isset($equals[$key])){
                $equals[$key] = 0;
            }
        }
        if($count != -1){
            $equals[$count]++;
        }
    }

    $columns = $_POST["columns"];
    $country = $_POST["country"];
    $rowCounter = $_POST["rowCounter"];

    if($rowCounter > 100000){
       $rowCounter = 100000;
    }

    if($country["count"] > 1000){
        $country["count"] = 1000;
    }

    if($country["max"] > 200){
        $country["max"] = 200;
    }

    if($country["columns"] > 20){
        $country["columns"] = 20;
    }

    $draws = [];
    $rowEquals = [];

    // (Schein) row = [1, 20, 12, 38, 90]
    // (Ziehungen) draws = [  [1, 2, 8, 19, 23],    [2, 34, 23, 32, 9]    ]
    for($i = 0; $i < $rowCounter; ++$i){
        $draw = getDraw($country);
        $draws[$i] = $draw;

        foreach($columns as $key => $col){
            $eq = [];
            if(isset($rowEquals[$key])){
                $eq = $rowEquals[$key];
            }
            getEquals($col, $draw, $eq );
            $rowEquals[$key] = $eq;
        }
    }

    //$_POST['']

    header('Content-type: application/json');
    echo json_encode(["equals" => $rowEquals, "draws" => $draws]);
?>
