<?php 

require_once './model/db.php';
require_once 'ClientEntity.php'; // Not used! Use it if needed ..

class ClientDao extends Db {

    public function __construct(){
        Db::__construct(); //== parent::__construct();
    }

    function getAllClients() {

        $dbconn = $this->conn;
        $sql = "SELECT * FROM t_client";
        $stmt = $dbconn->prepare($sql);
        $stmt->execute();
        $data = $stmt->fetchAll();
        $rows = array();
        foreach ($data as $row) {
            $el = array(
                'client_id'         => $row['client_id'],
                'client_eic'        => $row['eic'],
                'client_name'       => $row['name'],
                'client_address'    => $row['address']
            );
            array_push($rows, $el);
        }
        return $rows;
    }

    /*
    function getClientNameById($client_id) {
        $dbconn = $this->conn;
        $sql = "SELECT `name` FROM t_client WHERE client_id=" . $client_id;
        $stmt = $dbconn->prepare($sql);
        $stmt->execute();
        $data = $stmt->fetchAll();
        return $data[0]['name'];
    }
    */
    function getClientDataById($client_id) {
        $dbconn = $this->conn;
        $sql = "SELECT * FROM t_client WHERE client_id=" . $client_id;
        $stmt = $dbconn->prepare($sql);
        $stmt->execute();
        $raw_data = $stmt->fetchAll();
        $data = array();
        foreach($raw_data as $row) {
            $el = array(
                'client_id' => $row['client_id'],
                'client_eic' => $row['eic'],
                'client_name' => $row['name'],
                'client_address' => $row['address']
            );
            array_push($data, $el);
        }
        return $data[0];
    }

}

?>