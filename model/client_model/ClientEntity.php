<?php

class ClientEntity {

    private $client_id;
    private $eic;
    private $name;
    private $address;

    public function __construct($client_id = null, $eic = null,
        $name = null, $address = null) {

        $this->client_id = $client_id;
        $this->eic = $eic;
        $this->name = $name;
        $this->address = $address;
    }

    public function getClientId() {
        return $this->client_id;
    }

    public function setClientId($client_id) {
        $this->client_id = $client_id;
    }

    public function getEic() {
        return $this->eic;
    }

    public function setEic($eic) {
        $this->eic = $eic;
    }

    public function getName() {
        return $this->name;
    }

    public function setName($name) {
        $this->name = $name;
    }

    public function getAddress() {
        return $this->address;
    }

    public function setAddress($address) {
        $this->address = $address;
    }
    

}

?>