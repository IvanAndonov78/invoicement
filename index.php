<?php 

require_once './controllers/Controller.php';
require_once __DIR__ . '/controllers/main_controller.php';  
require_once __DIR__ . '/model/client_model/ClientDao.php';
require_once __DIR__ . '/model/invoice_model/InvoiceDao.php';

$qs = $_SERVER['QUERY_STRING'];

function frontController($qs) {

    $inv_dao = new InvoiceDao();
    $client_dao = new ClientDao();
    $controller = new MainController();

    switch ($qs) {
        case '/':
            require_once __DIR__ . '/views/index.html';
            break;
        case '':
            require_once __DIR__ . '/views/index.html';
            break;
        case 'index.html':
            require_once __DIR__ . '/views/index.html';
            break;
        case 'invoices':  
            // http://localhost/inv/index.php?invoices         
            $invoices_data = $inv_dao->getAllInvoices();
            echo json_encode($invoices_data);
            break; 
        case 'clients':   
            // http://localhost/inv/index.php?clients               
            $clients_data = $client_dao->getAllClients();
            echo json_encode($clients_data);
            break;
        case 'last_inv_num':
            $last_inv_num = $inv_dao->getLastInvNum();
            echo json_encode($last_inv_num);
            break;
        case 'create_invoice':
            $controller->saveInvoice();
            break;
        case 'test':
            $inv_dao->getLastInvNum();
            break; 
        default:
            http_response_code(404);
            require __DIR__ . '/views/404.php';
            break;
    }
    
}

frontController($qs);

?>