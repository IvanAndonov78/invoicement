<?php

class Controller {
    
    public function __construct() {
    }

    function escapeInput($input) {
        if (!empty($input)) {
            $input = trim($input);
            $input = stripslashes($input);
            $input =  htmlspecialchars($input);
            return $input;
        } 
    }

    // UTILLS:
    function console_log($data) {
        echo '<script>';
        echo 'console.log('. json_encode($data) .')';
        echo '</script>'; 
    }
    
    function my_dump($data) {
        echo '<pre>';
        print_r($data);
        echo '</pre>';
        die();
    }

}

?>