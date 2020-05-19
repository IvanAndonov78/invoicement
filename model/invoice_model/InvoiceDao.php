<?php 

require_once './model/db.php';
require_once 'InvoiceEntity.php'; 
require_once './model/client_model/ClientDao.php'; 
require_once './model/client_model/ClientEntity.php'; 

class InvoiceDao extends Db {

    public function __construct(){
        Db::__construct(); //== parent::__construct();
    }

    public function getAllInvoices() {

        $client_dao = new ClientDao();

        $dbconn = $this->conn;
        $sql = "SELECT * FROM t_invoice AS inv INNER JOIN t_client AS cust ";
        $sql .= "ON inv.client_id = cust.client_id ORDER BY inv.invoice_num ASC";
        $stmt = $dbconn->prepare($sql);
        $stmt->execute();

        $rows = array();

        while($row = $stmt->fetch()) {
            
            $rec_id = $row['rec_id'];
            $invoice_num = $row['invoice_num'];
            $issuing_date = $row['issuing_date'];
            $client_id = $row['client_id'];

            $client_data = $client_dao->getClientDataById($client_id);

            $issuer = $row['issuer'];
            $language = $row['language'];
            $matter = $row['matter'];
            $currency = $row['currency'];
            $amount = $row['amount'];
            $discount = $row['discount'];
            $vat = $row['vat'];
            $total = $row['total'];

            $rs_doc = new InvoiceEntity();
            $rs_doc->setRecId($rec_id);
            $rs_doc->setInvoiceNum($invoice_num);
            $rs_doc->setIssuingDate($issuing_date);
            $rs_doc->setIssuer($issuer);
            $rs_doc->setLanguage($language);
            $rs_doc->setMatter($matter);
            $rs_doc->setCurrency($currency);
            $rs_doc->setAmount($amount);
            $rs_doc->setDiscount($discount);
            $rs_doc->setVat($vat);
            $rs_doc->setTotal($total);

            $rs_client = new ClientEntity();

            $rows[] = array(
                'rec_id'            => $rs_doc->getRecId(),
                'invoice_num'       => $rs_doc->getInvoiceNum(),
                'issuing_date'      => $rs_doc->getIssuingDate(),
                'client_id'         => $client_id,
                'supplier_eic'      => 222333444,
                'supplier'          => 'LT JS',
                'supplier_address'  => '14 Johny Walker Str, 1 dep, Sofia, Bulgaria',
                'client_eic'        => $client_data['client_eic'],
                'client'            => $client_data['client_name'],
                'client_address'    => $client_data['client_address'],
                'issuer'            => $rs_doc->getIssuer(),
                'language'          => $rs_doc->getLanguage(),
                'matter'            => $rs_doc->getMatter(),
                'currency'          => $rs_doc->getCurrency(),
                'amount'            => $rs_doc->getAmount(),
                'discount'          => $rs_doc->getDiscount(),
                'vat'               => $rs_doc->getVat(),
                'total'             => $rs_doc->getTotal()
            );

        }

        return $rows;
    }

    public function insertInvoice($data_arr) {

        $invoice_num = $data_arr[0];    // invlice_num 
        $issuing_date = $data_arr[1];   // issuing_date
        $client_id = $data_arr[2];      // client_id
        $issuer = $data_arr[3];         // issuer
        $language = $data_arr[4];       // language
        $matter = $data_arr[5];         // matter
        $currency = $data_arr[6];       // currency
        $amount = $data_arr[7];         // amount
        $discount = $data_arr[8];       // discount 
        $vat = $data_arr[9];            // vat
        $total = $data_arr[10];          // total

        $dbconn = $this->conn;
        
        $sql = "INSERT INTO t_invoice (";
        $sql .= "rec_id, invoice_num, issuing_date, client_id, issuer, language, matter";
        $sql .= " , currency, amount, discount, vat, total";
        $sql .= ") ";
        $sql .= "VALUES (";
        $sql .= "NULL, :invoice_num, :issuing_date, :client_id, :issuer, :language, :matter";
        $sql .= " , :currency, :amount, :discount, :vat, :total";
        $sql .= ")";
        
        $stmt = $dbconn->prepare($sql);

        $stmt->bindParam(':invoice_num', $invoice_num);
        $stmt->bindParam(':issuing_date', $issuing_date);
        $stmt->bindParam(':client_id', $client_id);
        $stmt->bindParam(':issuer', $issuer);
        $stmt->bindParam(':language', $language);
        $stmt->bindParam(':matter', $matter);
        $stmt->bindParam(':currency', $currency);
        $stmt->bindParam(':amount', $amount);
        $stmt->bindParam(':discount', $discount);
        $stmt->bindParam(':vat', $vat);
        $stmt->bindParam(':total', $total);
        
        $stmt->execute();
        
        $dbconn = null;
    } 

    public function getLastInvNum() {
        $dbconn = $this->conn;
        $sql = "SELECT invoice_num FROM t_invoice ORDER BY rec_id DESC LIMIT 1";
        $stmt = $dbconn->prepare($sql);
        $stmt->execute();
        $data = $stmt->fetchAll();
        if (count($data) < 1) {
            return 0;
        } 
        return $data[0]['invoice_num'];
    }

}

?>