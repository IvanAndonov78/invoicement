<?php

class InvoiceEntity {

    private $rec_id;
    private $invoice_num;
    private $issuing_date;
    private $client_id;
    private $issuer;
    private $language;
    private $matter;
    private $currency;
    private $amount;
    private $discount;
    private $vat;
    private $total;

    public function __construct($rec_id = null, $invoice_num = null, $issuing_date = null,
            $client_id = null, $issuer = null, $language = null, $matter = null, 
            $currency = null, $amount = null, $discount = null, $vat = null, $total = null) {

        $this->rec_id = $rec_id;
        $this->invoice_num = $invoice_num;
        $this->issuing_date = $issuing_date;
        $this->client_id = $client_id;
        $this->issuer = $issuer;
        $this->language = $language;
        $this->matter = $matter;
        $this->currency = $currency;
        $this->amount = $amount;
        $this->discount = $discount;
        $this->vat = $vat;
        $this->total = $total;
    }

    public function getRecId() {
        return $this->rec_id;
    }

    public function setRecId($rec_id) {
        $this->rec_id = $rec_id;
    }

    public function getInvoiceNum() {
        return $this->invoice_num;
    }

    public function setInvoiceNum($invoice_num) {
        $this->invoice_num = $invoice_num;
    }
    
    public function getIssuingDate() {
        return $this->issuing_date;
    }

    public function setIssuingDate($issuing_date) {
        $this->issuing_date = $issuing_date;
    }

    public function getClientId() {
        return $this->client_id;
    }

    public function setClientId($client_id) {
        $this->client_id = $client_id;
    }

    public function getIssuer() {
        return $this->issuer;
    }

    public function setIssuer($issuer) {
        $this->issuer = $issuer;
    }

    public function getLanguage() {
        return $this->language;
    }

    public function setLanguage($language) {
        $this->language = $language;
    }

    public function getMatter() {
        return $this->matter;
    } 

    public function setMatter($matter) {
        $this->matter = $matter;
    }
    
    public function getCurrency() {
        return $this->currency;
    }

    public function setCurrency($currency) {
        $this->currency = $currency;
    }

    public function getAmount() {
        return $this->amount;
    }

    public function setAmount($amount) {
        $this->amount = $amount;
    }

    public function getDiscount() {
        return $this->discount;
    }

    public function setDiscount($discount) {
        $this->discount = $discount;
    }

    public function getVat() {
        return $this->vat; 
    }

    public function setVat($vat) {
        $this->vat = $vat;
    }

    public function getTotal() {
        return $this->total;
    }

    public function setTotal($total) {
        $this->total = $total;
    }

}

?>