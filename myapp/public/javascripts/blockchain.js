function initialise() {
    populateAddresses();
   
    document.getElementById('w-bal').innerHTML = web3.fromWei(web3.eth.getBalance(clientAddress), 'ether');

    var addressSelector = document.getElementById('sendAddressSelect');
    var maxBalance = document.getElementById('maxBalance');
    var weiBalance = web3.eth.getBalance(addressSelector.value);
    maxBalance.innerHTML = "Max: " + web3.fromWei(weiBalance, 'ether') + " ether";

    addressSelector.addEventListener("change", function() {
        var currentAddress = addressSelector.value;
        var weiBalance = web3.eth.getBalance(currentAddress);
        maxBalance.innerHTML = "Max: " + web3.fromWei(weiBalance, 'ether') + " ether";
    })

    var sendBtn = document.getElementById('send-btn');
    sendBtn.addEventListener("click", function() {
        var wallet = addressSelector.value;
        console.log(wallet);
        var sendField = document.getElementById('sendAmount');
        var inputAmount = sendField.value;

        send(wallet, inputAmount);
    });

    // var regBtn = document.getElementById('register-btn');
    // regBtn.addEventListener("click", function() {
    //     var fn = document.getElementById('registerFirstName').value;
    //     var ln = document.getElementById('registerLastName').value;
    //     var data = fn + ln;
    //     registerClaim(data);
    // })

    // var claimBtn = document.getElementById('claim-btn');
    // claimBtn.addEventListener("click", function() {
    //     var fn = document.getElementById('claimFirstName').value;
    //     var ln = document.getElementById('claimLastName').value;
    //     var data = fn + ln;

    // })
}


function populateAddresses() {
    var addressSelect = document.getElementById('sendAddressSelect');

    for (var i=0; i < 1; i++) {
        var elem = "<option>";
        elem += web3.eth.accounts[i];
        elem += "</option>";
        addressSelect.innerHTML += elem;
    }
}

function send(wallet, inputAmount) {
    console.log(wallet, inputAmount);

    var amount = web3.toWei(inputAmount, 'ether');
    try {
        web3.eth.sendTransaction({from: wallet, to: clientAddress, value: amount}, function() {
            console.log("sent txn");
            web3.eth.getBalance(clientAddress, function(err, val) {
                console.log(val);
                document.getElementById('w-bal').innerHTML = web3.fromWei(val, 'ether');
            })
            document.getElementById('sendAmount').value = "";
            document.getElementById('maxBalance').innerHTML = "Max: " + web3.fromWei(web3.eth.getBalance(wallet), 'ether') + " ether";
        });
    } catch (err) {
        console.log(err);
    }
}

initialise();