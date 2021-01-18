function startOver() {
    document.getElementById("loanAmt").value="";
    document.getElementById("months").value="";
    document.getElementById("rate").value="";
    document.getElementById("extra").value="0";

    document.getElementById("loanInfo").innerHTML="";
    document.getElementById("table").innerHTML="";

    
};

function validate() {
    let loanAmt = document.getElementById("loanAmt").value;
    let months = document.getElementById("months").value;
    let rate = document.getElementById("rate").value;
    let extra = document.getElementById("extra").value;

    




                        //isNaN(number()) checks to see if the user entered a float
    if(loanAmt <= 0 || isNaN(Number(loanAmt)) ) {
        alert("Please enter a valid loan amount.");
        document.getElementById("loanAmt").value="";
    }                   
    else if(months <= 0 || isNaN(Number(months)) ) {
        alert("Please enter a valid number of months.");
        document.getElementById("months").value="";
    }
    else if(rate <=0 || isNaN(Number(rate)) ) {
        alert("Please enter a valid interest rate. (e.g. 4.5%)");
        document.getElementById("rate").value="";
    }
    else if(extra < 0 || isNaN(Number(extra)) ) {
        alert("Please enter a valid extra payment.");
        document.getElementById("extra").value="0";
    }
    else{ //all info has been validated
       
        calculate(parseFloat(loanAmt), parseInt(months), parseFloat(rate), parseFloat(extra));
    }

};
   

function calculate(loanAmt, months, rate, extra) {

    i = rate/100
    let monthPay =loanAmt*(i/12)*Math.pow((1+i/12),months)/ (Math.pow((1+i/12),months)-1);

    let info="";
    info += "<table width='250'>";
    info += "<tr><td>Loan Amount:</td>";
    info += "<td align='right'>$"+loanAmt+"</td></tr>";

    
    info += "<tr><td>Number of Months:</td>";
    info += "<td align='right'>"+months+"</td></tr>";

    info += "<tr><td>Interest Rate:</td>";
    info += "<td align='right'>"+rate+"%</td></tr>";

    info += "<tr><td>Monthly Payment</td>";
    info += "<td align='right'>$"+round(monthPay,2)+"</td></tr>";

    info += "<tr><td>Extra:</td>";
    info += "<td align='right'>$"+extra+"</td></tr>";

    info += "<tr><td>Total Payment:</td>";
    info += "<td align='right'>$"+round(monthPay+extra,2)+"</td></tr>";

    info += "</table>";
    

    document.getElementById("loanInfo").innerHTML = info; //info is a string containing all the HTML table code


    //

    let table="";

    table +="";
    
        table += "<tr>";
            table += "<td width='30'>0</td>";
            table += "<td width='60'></td>";
            table += "<td width='60'></td>";
            table += "<td width='60'></td>";
            table += "<td width='85'></td>";
            table += "<td width='70'>"+round(loanAmt,2)+"</td>";
        table += "</tr>";
        
        let currentBalance = loanAmt;
        let paymentCount = 1;
        let totalInt = 0;
        monthPay = monthPay + extra;
        while(currentBalance > 0) {
            //create rows

            
            
            towardsInt = (i/12)*currentBalance;  //this calcs the portion of your monthly payment that goes towards interest

            if (monthPay > currentBalance) {
                monthPay = currentBalance + towardsInt;
            }    
        
            towardsBal = monthPay - towardsInt;
            totalInt = totalInt + towardsInt;
            currentBalance = currentBalance - towardsBal;

            //display row
            table += "<tr>";
                table += "<td>"+paymentCount+"</td>";
                table += "<td>"+round(monthPay,2)+"</td>";
                table += "<td>"+round(towardsBal,2)+"</td>";
                table += "<td>"+round(towardsInt,2)+"</td>";
                table += "<td>"+round(totalInt,2)+"</td>";
                table += "<td>"+round(currentBalance,2)+"</td>";
            table += "</tr>";





            paymentCount++;
        }







    table += "</table>";

    document.getElementById("table").innerHTML = table;


}


function round(num, dec) {

    return (Math.round(num*Math.pow(10,dec))/ Math.pow(10,dec)).toFixed(dec);

}



