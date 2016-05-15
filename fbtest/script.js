var r; //stores the response of the API call for interaction in browser console
var callAPI = function(request, type, callback){
    $.ajax({
        url: "http://bootcamp-api.transferwise.com/" + request + "?token=ca7cde5f93cd045c8390856b3e18c0ef2150aeed",
        success: function(response) {
            //console.log("it worked");
            //console.log(response);
            r = response;
            if(callback != null) return callback(response);
            else console.log(response);
        },
        error: function(response) {
            console.log("didn't work");
            return console.log(response);
        },
        complete: function(){
            
        },
        type: (type != null ? type : "GET")
    });
}

//Challenge One
var challengeOne = function(){
    callAPI("name/Yash Nevatia", "POST");
}

//Challenge Two
var challengeTwo = function(){
    var a = [];
    for (var i = 0; i < 100; i++) {
        a[i] = i + 1;
    }

    j = 1;
    i = 0;

    while(a.length != 1){
        console.log("removing " + a[i]);
        a.splice(i,1);
        i = ((i + j) % a.length);
        j++;
    }

    console.log(a);            
}

//Challenge Three
var challengeThree = function(){
    var banks;
    var bankAccounts;
    var payments;

    callAPI("bank", "GET", function(bank){
        banks = bank;
        callAPI("bankAccount", "GET", function(bankAccount){
            bankAccounts = bankAccount;
            callAPI("payment", "GET", function(payment){
                payments = payment;

                for(var p in payments){
                    var bankName = (function(curr){
                        for(var a in bankAccounts)
                            if(bankAccounts[a].accountName === "TransferWise Ltd" && bankAccounts[a].currency === curr)
                                for(var b in banks)
                                    if(banks[b].id === bankAccounts[a].bankId)
                                        return banks[b].name;
                    })(payments[p].sourceCurrency);

                    var acctNum = (function(curr){
                        for(var a in bankAccounts)
                            if(bankAccounts[a].accountName === "TransferWise Ltd" && bankAccounts[a].currency === curr)
                                return bankAccounts[a].accountNumber;
                    })(payments[p].sourceCurrency);                   
                    
                    var tarBankName = (function(bankId){
                        for(var b in banks)
                            if(banks[b].id === bankId)
                                return banks[b].name;
                    })(payments[p].recipientBankId);

                    var tarAcctNum = payments[p].iban;

                    var postString = "bank/" + bankName + "/transfer/" + acctNum + "/" + tarBankName + "/" + tarAcctNum + "/" + payments[p].amount;
                    
                    //console.log(postString);

                    callAPI(postString, "POST");
                    console.log("challenge three is complete");
                }
            });
        });
    });
}

var currencies;
var companies;
var quotes = [[],[],[]];
var commision = [[],[],[]];

var challengeFour = function(){

    var postHiddenFees = function(srcCurr, tarCurr, cb){
        //currencies in question: 0 & 1
        var mmGetStr = "rate/midMarket/" + srcCurr + "/" + tarCurr;
        var getQuoteStr = function(amount){
            return "/quote/" + amount + "/" + srcCurr + "/" + tarCurr;
        }

        callAPI(mmGetStr, "GET", function(mmR){
        	mmR = mmR.rate;
        	callAPI(getQuoteStr(100), "GET", function(quote_one){
        		for(var c in companies) quotes[0][c] = quote_one[companies[c]].targetValue, commision[0][c] = quote_one[companies[c]].commissionPercentage;
        		callAPI(getQuoteStr(1000), "GET", function(quote_two){
        			for(var c in companies) quotes[1][c] = quote_two[companies[c]].targetValue, commision[1][c] = quote_two[companies[c]].commissionPercentage;
        			callAPI(getQuoteStr(10000), "GET", function(quote_three){
        				for(var c in companies) quotes[2][c] = quote_three[companies[c]].targetValue, commision[2][c] = quote_three[companies[c]].commissionPercentage;


        				for(var q in quotes[0]){
        					var hFP = (((mmR * 100 - quotes[0][q]) / mmR));
        					//hFP -= commision[0][q];
        					var pS = "hiddenFee/forCompany/" + companies[q] + "/100/" + srcCurr + "/" + tarCurr + "/" + Math.round(hFP);
        					console.log(pS);
        					callAPI(pS, "POST");
        				}

        				for(var q in quotes[1]){
        					var hFP = (((mmR * 1000 - quotes[1][q]) / mmR))/10;
        					//hFP -= commision[1][q];
        					var pS = "hiddenFee/forCompany/" + companies[q] + "/1000/" + srcCurr + "/" + tarCurr + "/" + Math.round(hFP);
        					console.log(pS);
        					callAPI(pS, "POST");
        				}

        				for(var q in quotes[2]){
        					var hFP = (((mmR * 10000 - quotes[2][q]) / mmR))/100;
        					//hFP -= commision[2][q];
        					var pS = "hiddenFee/forCompany/" + companies[q] + "/10000/" + srcCurr + "/" + tarCurr + "/" + Math.round(hFP);
        					console.log(pS);
        					callAPI(pS, "POST");
        				}

        				if (cb != null) cb();
        			});
        		});
        	});
        });
    }
    
    callAPI("currency", "GET", function(currency){
        currencies = currency;
        callAPI("company", "GET", function(company){
            companies = (((company.companies).replace("[","")).replace("]","")).split(", ");

            postHiddenFees("EUR", "USD", function(){
            	postHiddenFees("EUR", "MXN", function(){
            		postHiddenFees("EUR", "INR", function(){
            			postHiddenFees("EUR", "GBP", function(){
		            		postHiddenFees("USD", "EUR", function(){
	            				postHiddenFees("USD", "MXN", function(){
	            					postHiddenFees("USD", "INR", function(){
	            						postHiddenFees("USD", "GBP", function(){
	            							postHiddenFees("MXN", "USD", function(){
	            								postHiddenFees("MXN", "EUR", function(){
	            									postHiddenFees("MXN", "INR", function(){
	            										postHiddenFees("MXN", "GBP", function(){
	            											postHiddenFees("INR", "USD", function(){
					            								postHiddenFees("INR", "EUR", function(){
					            									postHiddenFees("INR", "MXN", function(){
					            										postHiddenFees("INR", "GBP", function(){
					            											postHiddenFees("GBP", "USD", function(){
									            								postHiddenFees("GBP", "EUR", function(){
									            									postHiddenFees("GBP", "MXN", function(){
									            										postHiddenFees("GBP", "INR", function(){
									            											//my program was failing bc when I looped
									            											//through all these currencies, they would over
									            											//lap values, so i needed callbacks and went ham
									            											console.log("challenge four is complete")
									            										});
									            									});
									            								});
									            							});
					            										});
					            									});
					            								});
					            							});
	            										});
	            									});
	            								});
	            							});
	            						});
	            					});	
	            				});
		            		});
		            	});
            		});	
            	});
            });            
        });
    });
}

var challengeFive = function(){
	 var peps = ["Angela Merkel - Germany", "Barack Obama - USA", "Helmut Kohl - Germany", "Elizabeth Alexandra Mary - United Kingdom", "Julius Caesar - Italy", "Toomas Hendrik Ilves - Estonia", "Taavi Rõivas - Estonia", "Reuven Rivlin - Israel", "Bill Clinton - USA", "David Johnston - Canada", "Peter Cosgrove - Australia", "Dalia Grybauskaitė - Lithuania", "Raimonds Vējonis - Latvia", "Andrzej Duda - Poland", "Borut Pahor - Slovenia", "Mariano Rajoy - Spain", "Marcelo Sousa - Portugal", "Heinz Fischer - Austria", "Mikheil Saakashvili - Ukraine", "Tony Blair - United Kingdom"];
	 callAPI("payment", "GET", function(payment){
	 	payments = payment;
	 	for(var p in payments){
	 		var recipientStr = payments[p].recipientName + " - " + payments[p].recipientCountry;
	 		if(peps.indexOf(recipientStr) > -1) callAPI("payment/" + payments[p].id + "/aml","PUT");
	 		else 								callAPI("payment/" + payments[p].id + "/aml","DELETE");
	 	}
	 });
}

var challengeSix = function(){
	callAPI("payment/history", "GET", function(history){
		var fraudIP = [];
		var fraudEmail = [];
		for(var h in history){
			if(history[h].fraud){
				fraudIP.push(history[h].ip);
				fraudEmail.push(history[h].email);
			}
		}
		callAPI("payment", "GET", function(payment){
			payments = payment;
			for(var p in payments){
				// not sure what else to look for than emails and IDs, didnt notice many patterns from sifting through data
				if(fraudEmail.indexOf((payments[p].email)) > -1 || fraudIP.indexOf((payments[p].ip)) > -1) 
						callAPI("payment/" + payments[p].id + "/fraud", "PUT");
				else	callAPI("payment/" + payments[p].id + "/fraud", "DELETE");
			}
		});
	});
}