<?php 

require_once './controllers/Controller.php';
require_once './model/client_model/ClientDao.php';
require_once './model/invoice_model/InvoiceDao.php';

class MainController extends Controller {

    function saveInvoice() {

        $data = json_decode(file_get_contents('php://input'), true);

        if(!empty($data['client']) && !empty($data['client_id'])
            && !empty($data['matter']) && !empty($data['issuer'])
            && !empty($data['language']) && !empty($data['currency']) 
            && !empty($data['invNum']) && !empty($data['issuingDate'])
            && !empty($data['amount']) && !empty($data['vat']) 
            && !empty($data['total'])
        )
        {
            $invoice_num = $data['invNum'];
            $this->escapeInput($invoice_num);

            $issuing_date = $data['issuingDate'];
            $this->escapeInput($issuing_date);

            $client_id = $data['client_id'];
            $this->escapeInput($client_id);

            $issuer = $data['issuer'];
            $this->escapeInput($issuer);

            $language = $data['language'];
            $this->escapeInput($language);

            $matter = $data['matter'];
            $this->escapeInput($matter);

            $currency = $data['currency'];
            $this->escapeInput($currency);

            $amount = $data['amount'];
            $this->escapeInput($amount);
            $amount = number_format($amount, 2, '.', '');

            $discount = $data['discount'];
            $this->escapeInput($discount);
            $discount = number_format($discount, 2, '.', '');

            $vat = $data['vat'];
            $this->escapeInput($vat);
            $vat = number_format($vat, 2, '.', '');

            $total = $data['total'];
            $this->escapeInput($total);
            $total = number_format($total, 2, '.', '');
        
            $data_arr = [
                $invoice_num, $issuing_date, $client_id, $issuer, $language, 
                $matter, $currency, $amount, $discount, $vat, $total
            ];

            $errArr = array();
            
            $current_month = date('m');     // 04
            //$current_day = date('d');       // 28
            $current_year = date('Y');      // 2020

            $max_date = ($current_year + 1) . "-01-31";
            $min_date = $current_year . "-" . ($current_month - 1) . "-01";

            if ($issuer === "-- Choose issuer: --") {
                $issuer_err = "You must choose an issuer from the drop-down list!";
                array_push($errArr, $issuer_err);
            }

            if ($language === "-- Choose language: --") {
                $language_err = "You must choose a language from the drop-down list!";
                array_push($errArr, $language_err);
            }

            if ($currency === "-- Choose currency: --") {
                $currency_err = "You must choose a currency from the drop-down list!";
                array_push($errArr ,$currency_err);
            }

            $invioceNumRegEx = "/^[0-9]{1,10}$/";
            if (!preg_match($invioceNumRegEx, $invoice_num)) {
                $inv_err_msg = "The invoice number should contain up to 10 digits! ";
                $inv_err_msg .= "Example: 1000000627";
                array_push($errArr, $inv_err_msg);
            }

            if ($amount < 1 || $amount > 1000000) {
                $amount_err_msg = "The amount shouild be a number between 1 and 1000000!";
                array_push($errArr, $amount_err_msg);
            }

            if ($discount > $amount) {
                $discount_err_msg = "The discount could not be greater than the amount!";
                array_push($errArr, $discount_err_msg);
            }
            
            if (strtotime($issuing_date) < strtotime($min_date)) {
                $date_error_msg = "The issuing date should be greater than " . $min_date;
                array_push($errArr, $date_error_msg);
            }

            if (strtotime($issuing_date) > strtotime($max_date)) {
                $date_err_msg = "The issuing date should be less than " . $max_date;
                array_push($errArr, $date_err_msg);
            }

            if (strlen($matter) < 2 ) {
                $matter_err_msg = "The matter should be well described!";
                array_push($errArr, $matter_err_msg);
            }

            if (count($errArr) > 0) {
                echo '<pre>';
                foreach($errArr as $err) {
                    print_r($err);
                    echo '<br>';
                }
                echo '</pre>';
                die();
            } else {
                $invoice_dao = new InvoiceDao();
                $invoice_dao->insertInvoice($data_arr);
            }

        }

    }

}

?>