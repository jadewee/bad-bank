function Deposit() {
   let {useState} = React;
  
   let ctx = React.useContext(UserContext);

   let accountBalance;
   ctx.users.map((element, index, array) => {
      if (element.loggedIn === true) {
         accountBalance = element.balance;
      }
   });

  let [balance, setBalance] = useState(accountBalance);
  let [transaction, setTransaction] = useState(0);
  let [button, setButton] = useState(true);
  let [error, setError] = useState('');

  let handleChange = (e) => {
     let validAccount = false;
     ctx.users.map((element, index, array) => {
        if (element.loggedIn === true && e.target.value > 0) {
           validAccount = true;
           setTransaction(Number(e.target.value));
           setButton(false);
        }
     });
     ctx.users.map((element, index, array) => {
        let value = e.target.value;
        if (element.loggedIn === true) {
           let userInput = document.getElementById('deposit-amount');
           validAccount = true;
            if (value < 0) {
               setTransaction(0);
               console.log('Error: Deposit amount must be greater than 0');
               alert('Error: Deposit amount must be greater than 0');
               userInput.value = '';
               setError(`Invalid Input. Deposit amount must be greater than 0. Please enter a valid deposit amount to complete transaction.`);
               setButton(false);
               setTimeout(() => {setError(''), setButton(false)}, 3000);
            }
            else if (value.toUpperCase() != value.toLowerCase()) {
               setTransaction(0);
               console.log('Error: Deposit amount must be a numerical value');
               alert('Error: Deposit amount must be a postive numerical value');
               setError(`Invalid Input. Deposit amount must be a positive numerical value. Please enter a valid deposit amount to complete transaction.`);
               setButton(false);
               userInput.value = '';
               setTimeout(() => {setError(''), setButton(false)}, 3000);
               console.log(userInput);
         }
        }
     });
     
     
     if (!validAccount) {
        let userInput = document.getElementById('deposit-amount');
        userInput.value = '';
        alert('Please login to your account in order to utilize deposit function');
        setError(`Please login to your account in order to utilize deposit function`);
        setTimeout(() => {setError(''), setButton(false)}, 3000);
     }
  };

  let handleSubmit = (e) => {
     let updatedBalance = balance + transaction;
     ctx.users.map((element, index, array) => {
        if (element.loggedIn === true) {
           element.balance = updatedBalance;
        }
     });
     setBalance(updatedBalance);
     e.preventDefault();
     setError(`Successful Transaction! Deposit of $${transaction} is complete. Updated balance: $${updatedBalance}.`);
     setButton(true);
     setTimeout(() => {setError(''), setButton(false)}, 3000);
     let userInput = document.getElementById('deposit-amount');
     userInput.value = '';
  }

  return (
     <NewCard
        id="deposit"
        body={(
            <div>
               <div className="col-md-10 mx-auto col-lg-5 mt-5 mb-5 needs-validation">
                  <p className="h3 text-center mb-4">Deposit</p>
                  <form onSubmit={handleSubmit} className="p-4 p-md-5 border rounded-3 bg-light">
                     <div className="form-floating mb-3">
                        <h5>Account Balance: ${accountBalance}</h5>
                        <input name="deposit" className="form-control mt-3" id="deposit-amount" type="input" pattern="[0-9]+" onChange={handleChange} placeholder="Enter Deposit Amount"/>
                        <div className="valid-feedback">Valid Deposit Amount</div>
                        <div className="invalid-feedback">Please input a positive numerical value for deposit amount.</div>
                        <button className="w-100 btn btn-lg btn-primary mt-3" type="submit" disabled={button}>Deposit</button>
                        <p className="font-weight-bold">{error}</p>
                        <hr className="my-4"/>
                        <p className="text-muted">Log in <a href="#/home/">here</a> to deposit into Account</p>
                        
                     </div>
                  </form>
               </div>
            </div>
        )}
        
     />
  );
}