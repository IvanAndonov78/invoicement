let state = {
    clients: [],
    invoices: [],
    current_inv_num: 0
};


var stateDataModule = (function() {

    let clientsProvider = function() {
    
        let url = './index.php?clients';

        let promise = new Promise(function(resolve, reject) {

            let req = new XMLHttpRequest();					
            req.responseType = 'json';
            req.open("POST", url, true);
            req.onload = function() { 
                resolve(req.response)
            }; 
            req.onerror = function() { 
                reject(req.statusText);
            }; 
            req.send();
        });

        promise.then(function(response) {
            
            state.clients = [];

            let datalist = document.getElementById("clients");
            let opts = '';
            for (let i = 0; i < response.length; i++) {
                state.clients.push({
                    client_id: response[i].client_id,
                    client_eik: response[i].client_eik,
                    client_name: response[i].client_name,
                    client_address: response[i].client_address
                });
                opts += '<option value=' + '"' + response[i].client_name + '"' + '>';                                       
            }
            datalist.innerHTML = opts;  
        });

        return promise;
    }

    let invoicesProvider = function() {
        
        let url = './index.php?invoices';

        let promise = new Promise(function(resolve, reject) {

            let req = new XMLHttpRequest();					
            req.responseType = 'json';
            req.open("POST", url, true);
            req.onload = function() { 
                resolve(req.response)
            }; 
            req.onerror = function() { 
                reject(req.statusText);
            }; 
            req.send();
        });

        promise.then(function(response) {
            
            state.invoices = [];
            
            for (let i = 0; i < response.length; i++) {
                
                state.invoices.push({
                    rec_id: response[i].rec_id,
                    invoice_num: response[i].invoice_num,
                    issuing_date: response[i].issuing_date,
                    client_id: response[i].client_id,
                    issuer: response[i].issuer,
                    language: response[i].language,
                    matter: response[i].matter,
                    currency: response[i].currency,
                    amount: response[i].amount,
                    discount: response[i].discount,
                    vat: response[i].vat,
                    total: response[i].total,

                    supplier_eic: response[i].supplier_eic,
                    supplier: response[i].supplier,
                    supplier_address: response[i].supplier_address,

                    client_eic: response[i].client_eic,
                    client: response[i].client,
                    client_address: response[i].client_address
                    
                });
            }

        });

        return promise;
    }

    let lastInvNumProvider = function() {
    
        let url = './index.php?last_inv_num';

        let prom = new Promise(function(resolve, reject) {

            let req = new XMLHttpRequest();					
            req.responseType = 'json';
            req.open("POST", url, true);
            req.onload = function() { 
                resolve(req.response)
            }; 
            req.onerror = function() { 
                reject(req.statusText);
            }; 
            req.send();
        });

        prom.then(function(response) {
            state.last_inv_num = 0;
            state.current_inv_num = parseInt(response) + 1;
            let current_inv_num = document.getElementById("invNum");
            current_inv_num.value = state.current_inv_num;

        });

        return prom;
    }

    return {

        init: function() {
            clientsProvider();
            lastInvNumProvider(); 
            invoicesProvider();
        },

        refreshInvGrid() {
            invoicesProvider();        
        },

        refreshLastInvNum() {
            lastInvNumProvider();
        }
    }
              
})();

stateDataModule.init();

var uiBindingsModule = (function() {
    
    return {

        bindClientInput() {
            let c = document.getElementById("client").value;
            document.getElementById("client-binder").innerHTML = "" + c; 
        },

        bindMatterInput() {
            let m = document.getElementById("matter").value;
            document.getElementById("matter-binder").innerHTML = "" + m;
        },

        bindCurrencyInput() {
            let index = document.getElementById("currency").selectedIndex;
            if (index === 0) {
                let euros = $('.td-3 div');
                for (let i = 0; i < euros.length; i++) {
                    $('.td-3 div').html('&euro;');
                    $('#amount-sign').html('&euro;');
                    $('.td-3 div').css("color", "blue");
                    $('#amount-sign').css("color", "blue");
                }
            } else if (index === 1) {
                let dollars = $('.td-3 div');
                for (let i = 0; i < dollars.length; i++) {
                    $('.td-3 div').html('$');
                    $('#amount-sign').html('$');
                    $('.td-3 div').css("color", "red");
                    $('#amount-sign').css("color", "red");
                }
            }
        },

        bindAmountInput() {
            let a = document.getElementById("amount").value;
            let amountBinder = document.getElementById("amount-binder");
            amountBinder.innerHTML = "" + a;
            
            let amount = amountBinder.innerText;
            let vatRate = document.getElementById("vatRate").value;
            let vatValue = parseFloat(amount) * parseFloat(vatRate) / 100;
            document.getElementById("vat-binder").innerHTML = "" + vatValue;
        },

        bindDiscountInput() {

            let amount = $('#amount').val();

            let discountRate = document.getElementById("discount").value;
            let discountValue = (parseFloat(discountRate) / 100) * amount;
            document.getElementById("discount-binder").innerHTML = "" + discountValue; 
            
            let discount = document.getElementById("discount-binder").innerText;
            let vatRate = document.getElementById("vatRate").value;
            let vatValue = 0;
            if (parseFloat(discount) > 0) {
                vatValue += (parseFloat(amount) - parseFloat(discount)) * parseFloat(vatRate) / 100;
            } else {
                vatValue += parseFloat(amount) * parseFloat(vatRate) / 100;
            }
            document.getElementById("vat-binder").innerHTML = "" + vatValue;
        }               
    }
})();
       
var insInvController = (function(stateDataModule, uiBindingsModule) {

    function save_invoice(input) {

        let data = JSON.stringify(input);

        var url = './index.php?create_invoice';

        let promise = new Promise(function(resolve, reject) {

            let req = new XMLHttpRequest();					
            req.responseType = 'json';
            req.open("POST", url, true);
            req.onload = function() { 
                resolve(req.response)
            }; 
            req.onerror = function() { 
                reject(req.statusText);
            }; 
            req.send(data);
        });

        promise.then(function(){
            stateDataModule.refreshInvGrid();
        });

        return promise;
    }        
    
    function getClientIdByClientName(clientName) {

        let client_id;
        
        for (let i = 0; i < state.clients.length; i++) {
            if (state.clients[i].client_name === clientName) {
                client_id = state.clients[i].client_id;
                break;
            }
        }
        return client_id;
    }

    function displayInvoicesData() {

        let tholder = $('#table-holder');
        let out = '<h3> Resumed inovoicement data: </h4>';
        out += '<table>';
        out += '<tr>';
        out += '<th> Inv N </th>';
        out += '<th> Date </th>';
        out += '<th> Client EIC </th>';
        out += '<th> Client </th>';
        out += '<th> Currency </th>';
        out += '<th> Amount </th>';
        out += '<th> Discount </th>';
        out += '<th> VAT </th>';
        out += '<th> Total </th>';
        out += '</tr>';
        for (let i = 0; i < state.invoices.length; i++) {
            out += '<tr>';
            out += '<td>';
            out += state.invoices[i].invoice_num;
            out += '</td>';                            
            out += '<td>';
            out += state.invoices[i].issuing_date;
            out += '</td>';
            out += '<td>';
            out += state.invoices[i].client_eic;
            out += '</td>';
            out += '<td>';
            out += state.invoices[i].client;
            out += '</td>';
            out += '<td>';
            out += state.invoices[i].currency;
            out += '</td>';
            out += '<td class="floatval">';
            out += parseFloat(state.invoices[i].amount).toFixed(2);
            out += '</td>';
            out += '<td class="floatval">';
            out += parseFloat(state.invoices[i].discount).toFixed(2);
            out += '</td>';
            out += '<td class="floatval">';
            out += parseFloat(state.invoices[i].vat).toFixed(2);
            out += '</td>';
            out += '<td class="floatval">';
            out += parseFloat(state.invoices[i].total).toFixed(2);
            out += '</td>';
            out += '</tr>';
        }
        out += '</table>';
        tholder.html(out);
        $('#table-holder').show(200);
    }
    
    function isValidInput(input) {

        let procedureArr = [];

        if (input.issuer === "-- Choose issuer: --") {
            let issuer_err = "You must choose an issuer from the drop-down list!";
            procedureArr.push(issuer_err);
        }

        if (input.language === "-- Choose language: --") {
            let language_err = "You must choose a language from the drop-down list!";
            procedureArr.push(language_err);
        }

        if (input.currency === "-- Choose currency: --") {
            let currency_err = "You must choose a currency from the drop-down list!";
            procedureArr.push(currency_err);
        }

        let invioceNumRegEx = /^[0-9]{1,10}$/;
        if (!invioceNumRegEx.test(String(input.invNum))) { 
            let inv_num_err = "The invoice number should contain up to 10 digits!";
            procedureArr.push(inv_num_err);                       
        }

        if (input.amount < 1 || input.amount > 1000000) {
            let amount_err_msg = "The amount shouild be a number between 1 and 1000000!";
            procedureArr.push(amount_err_msg);
        }

        if (parseFloat(input.discount) > parseFloat(input.amount)) {
            let discount_err_msg = "The discount could not be greater than the amount!";
            procedureArr.push(discount_err_msg);
        }

        let d = new Date();
        let current_month = '' + (d.getMonth() + 1); // 04
        //day = '' + d.getDate();                    // 28
        let current_year = d.getFullYear();          // 2020

        let max_date = (current_year + 1) + "-01-31";
        let min_date = current_year + "-" + (current_month - 1) + "-01";

        if (new Date(input.issuingDate).getTime() < new Date(min_date).getTime()) {
            let date_error_msg = "The issuing date should be greater than " + min_date;
            procedureArr.push(date_error_msg);
        } 

        if (new Date(input.issuingDate).getTime() > new Date(max_date).getTime()) {
            let date_err_msg = "The issuing date should be less than " + max_date;
            procedureArr.push(date_err_msg);
        }

        if (input.matter.length < 2) {
            let matter_err_msg = "The matter should be well described!";
            procedureArr.push(matter_err_msg);
        }

        if (procedureArr.length > 0) {
            let msg = '<h2 style="color:red;"> Note the errors: </h2>';
            for (let i = 0; i < procedureArr.length; i++) {
                msg += '<p>' + procedureArr[i] + '</p>';
            }

            $('#infoMsg').html(msg);
            $('#infoModal').modal('toggle');

            $('#closeInfoModalBtn').click(function(){
                $('#infoModal').modal('toggle');
            });
            return false;
            
        } else {
            return true;
        }

        
    }

    function clear() {
        $('#client').val(null);
        uiBindingsModule.bindClientInput();
        $('#matter').val(null);
        uiBindingsModule.bindMatterInput();
        
        $('#issuer').val("-- Choose issuer: --");
        $('#language').val("-- Choose language: --");
        $('#currency').val("-- Choose currency: --");

        $('#invNum').val(null);
        stateDataModule.refreshLastInvNum();

        $('#issuingDate').val(null);
        $('#amount').val(null);
        $('#discount').val(0.00);
    }

    function html_2_doc(selector, filename = '') {
        
        var tpl_header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' ";
        tpl_header += "xmlns:w='urn:schemas-microsoft-com:office:word'>";
        tpl_header +="<head><meta charset='utf-8'><title></title></head><body>";
        
        var tpl_footer = "</body></html>";
        
        var html = tpl_header + document.getElementById(selector).innerHTML + tpl_footer;

        var blob = new Blob(['\ufeff', html], {
            type: 'application/msword'
        });
        
        var url = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(html);
        
        filename = filename?filename+'.doc':'document.doc';
        
        var downloadLink = document.createElement("a");

        document.body.appendChild(downloadLink);
        
        if (navigator.msSaveOrOpenBlob ){
            navigator.msSaveOrOpenBlob(blob, filename);
        } else {
            downloadLink.href = url;
            downloadLink.download = filename;
            downloadLink.click();
        }
        
        document.body.removeChild(downloadLink);
    }

    function getBeautifiedDate(str_date) {
        
        let iss_date = new Date(str_date);
        let current_month = '' + (iss_date.getMonth() + 1); // 04
        let current_day = '' + iss_date.getDate();          // 28
        let current_year = '' + iss_date.getFullYear();     // 2020

        let m = '';

        switch(current_month) {
            case '1':
                m += 'Jan';
                break;
            case '2':
                m += 'Feb';
                break;
            case '3':
                m += 'Mar';
                break;
            case '4':
                m += 'Apr';
                break;
            case '5':
                m += 'May';
                break;
            case '6':
                m += 'Jun';
                break;
            case '7':
                m += 'Jul';
                break;
            case '8':
                m += 'Aug';
                break;
            case '9':
                m += 'Sep';
                break;
            case '10':
                m += 'Oct';
                break;
            case '11':
                m += 'Nov';
                break;
            case '12':
                m += 'Dec';
                break;  
        }

        return current_day + ' ' + m + ' ' + current_year;
    }

    function escapeHtml(str) {
        let escaped_str = str.toString();
        escaped_str.replace("&", "&amp;");
        escaped_str.replace("<", "&lt;");
        escaped_str.replace(">", "&gt;");
        escaped_str.replace('"', "&quot;");
        escaped_str.replace("'", "&#039;"); 
        return escaped_str.trim();                 
    }

    return {

        init: function() {

            $('#dd ul').hide();
            $('#invoice-blank').hide();

            $("#menu").click(function(){
                $("#dd ul").toggle();
            });
            
            $('#insert-invoice-form').on('submit', function(event) {
                event.preventDefault();   
                
                var clientVal = $("#client").val();
                clientVal = escapeHtml(clientVal);

                var clientId = getClientIdByClientName(clientVal);
                clientId = escapeHtml(clientId);

                var matterVal = $("#matter").val();
                matterVal = escapeHtml(matterVal);

                var i = document.getElementById("issuer").selectedIndex;
                var issuerVal = document.getElementById("issuer")[i].innerText;
                issuerVal = escapeHtml(issuerVal);

                var idx = document.getElementById("language").selectedIndex;
                var languageVal = document.getElementById("language")[idx].innerText;
                languageVal = escapeHtml(languageVal);

                var index = document.getElementById("currency").selectedIndex;
                var currencyVal = document.getElementById("currency")[index].innerText;
                currencyVal = escapeHtml(currencyVal);

                var invNumVal = $('#invNum').val();
                invNumVal = escapeHtml(invNumVal);

                var issuingDateVal = $('#issuingDate').val();
                issuingDateVal = escapeHtml(issuingDateVal);

                var amountVal = $('#amount').val();
                amountVal = escapeHtml(amountVal);

                var discountVal = $('#discount').val();
                discountVal = escapeHtml(discountVal);
                
                var vatVal = ($('#amount').val() - $('#discount').val()) * 20 / 100;
                document.getElementById("vat-binder").innerHTML = vatVal;

                vatVal = escapeHtml(vatVal);

                let totalVal = parseFloat(amountVal) - parseFloat(discountVal) + parseFloat(vatVal);
                totalVal = escapeHtml(totalVal);
                
                var input = {
                    client: clientVal,
                    client_id: clientId,
                    matter: matterVal,
                    issuer: issuerVal,
                    language: languageVal,
                    currency: currencyVal,
                    invNum: invNumVal,
                    issuingDate: issuingDateVal,
                    amount: amountVal,
                    discount: discountVal,
                    vat: vatVal,
                    total: totalVal
                };

                $('.inv-elem')[0].innerHTML = input.client;

                let inv_num_printed = input.invNum.toString() + "/2020";
                $('.inv-elem')[1].innerHTML = inv_num_printed;
                $('.inv-elem')[2].innerHTML = input.matter;
                
                $('.inv-elem')[3].innerHTML = getBeautifiedDate(input.issuingDate);

                $('.inv-elem')[4].innerHTML = input.matter.toString() + " case";
                $('.inv-elem')[5].innerHTML = "" + parseFloat(input.amount).toFixed(2).toString();
                $('.inv-elem')[6].innerHTML = input.currency;
                $('.inv-elem')[7].innerHTML = "" + parseFloat(input.amount).toFixed(2).toString();
                $('.inv-elem')[8].innerHTML = input.currency;
                $('.inv-elem')[9].innerHTML = "VAT: " + parseFloat(input.amount).toFixed(2).toString() + " " + input.currency;
                $('.inv-elem')[10].innerHTML = "Total (with VAT): " + parseFloat(input.total).toFixed(2).toString() + " " + input.currency;
                $('.inv-elem')[11].innerHTML = input.issuer;

                if(isValidInput(input)) {
                    
                    save_invoice(input);

                    let docName = 'Invoice_' + input.invNum + '_' + input.issuingDate;
                    html_2_doc('invoice-blank', docName);
                    
                    $('#infoMsg').html('<h2 style="color:green;"> Invoice is created! </h2>');
                    $('#infoModal').modal('toggle');
                    $('#invoice-blank').show(300);                             
                }
                
            });

            $('#clear').click(function(){
                clear();
            });
            
            $('#issue-inv').click(function(){
                $("#dd ul").toggle();
                $('#insert-invoice-form').show(200);
                $('#table-holder').hide();
                $('#invoice-blank').hide();
            });

            $('#invoices').click(function() { 
                $("#dd ul").toggle();
                $('#insert-invoice-form').hide();
                displayInvoicesData(); 
                $('#invoice-blank').hide();
            });

            $('#closeInfoModalBtn').click(function() {
                clear();
                stateDataModule.refreshLastInvNum();
            });
            
        }
    };
    
})(stateDataModule, uiBindingsModule);

insInvController.init();
