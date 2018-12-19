// Enter JavaScript for the exercise here...
// add the dom load event
// read in both them plates
window.onload = function(){
    const transactionForm = document.forms['frm-transactions'];
    const creditTemplate = document.querySelector('template').content.children[0];
    const debitTemplate = document.querySelector('template').content.children[1];
    const recordContainer = document.querySelector('.transactions thead');
    // console.log(recordContainer)

    // add and event listener to the form
     transactionForm.addEventListener('submit', function(e){
         // stop the default behaviour
         e.preventDefault();
         //create a validation object.
         const newTransaction = getValidationObject(e.currentTarget);

        //  console.log(newTransaction.type);

         // check the value of the type if its a credit or debit
         // request the format 
         if(newTransaction.type !== 'empty'){
            transactionFormatter(newTransaction);
            window.clearTimeout(timeoutHandle);
            timeoutHandle = window.setTimeout(newCallBack, 120000);

         }
        
       
     })

    function transactionFormatter(aTransaction) {

        let template = null;
        if(aTransaction.type === "credit"){
            template = creditTemplate;
        }else{
            template = debitTemplate;
        }

        // console.log(template);       
        // create a new transaction node
        const newTemplate = template.cloneNode(true);
        const descriptionField = newTemplate.querySelector('tr :nth-child(1)');
        const typeField = newTemplate.querySelector('tr :nth-child(2)');
        const amountField = newTemplate.querySelector('tr :nth-child(3)');
        const removeButton = newTemplate.querySelector('tr :nth-child(4)');
        descriptionField.textContent = aTransaction.description;
        typeField.textContent = aTransaction.type
        amountField.textContent = aTransaction.amount;
        removeButton.addEventListener('click', function (e) {
            recordContainer.removeChild(e.currentTarget.parentNode);
            updateTotals();
            window.clearTimeout(timeoutHandle);
            timeoutHandle = window.setTimeout(newCallBack, 120000);
        })
        
        recordContainer.appendChild(newTemplate);
        updateTotals()


    }

   
    function updateTotals(){
        let creditTotal = 0;
        let debitTotal = 0;
        const records = Array.from(recordContainer.children);
        // console.log(records)
        records.forEach(function(elm){          
            let type = elm.classList.value;           
            if(type === "credit"){
                creditTotal = creditTotal + Number(elm.querySelector('.amounts').textContent);             
            }else if(type === "debit"){
                debitTotal = debitTotal + Number(elm.querySelector('.amounts').textContent);
            }else{
                console.log("null")
            }
            
            
        })

        recordContainer.querySelector('.debits').innerHTML = "$" + debitTotal.toFixed(2)
        recordContainer.querySelector('.credits').innerHTML = "$" + creditTotal.toFixed(2)

    }

    function getValidationObject(formData) {
        const description = document.getElementById('description').value;
        const type = document.getElementById('type').value;
        const amount = document.getElementById('amount').value;
        const newTransactionObject = {
            description,
            type,
            amount
        }
        return newTransactionObject

    }


    var timeoutHandle = window.setTimeout(newCallBack, 120000);  

    function newCallBack(){
        alert("Your Session Time End");
        const records = Array.from(recordContainer.children);
        records.forEach(function(elm){
            let type = elm.classList.value; 
            if(type === "credit" || type === "debit"){
                elm.remove();
                
                recordContainer.querySelector('.credits').innerHTML = "$0.00"
                recordContainer.querySelector('.debits').innerHTML = "$0.00"

            }
        })
    }
}