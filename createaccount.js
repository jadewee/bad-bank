function CreateAccount() {
  // Destructure useState
  let {useState} = React;

  // Declare states
  let [name, setName] = useState('');
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let [button, setButton] = useState(true);
  let [display, setDisplay] = useState(true);
  let [error, setError] = useState('');

  // Accesses context.
  let ctx = React.useContext(UserContext);

  // Set button status.
  function changeButtonStatus(input, field) {
     // This section makes the button status very responsive to the last input the user typed.
     switch(field) {
        case 'name':
           name = input;
           break;
        case 'email':
           email = input;
           break;
        case 'password':
           password = input;
           break;
        default:
           break;
     }
     // Enable the Create Account button if all forms has inputs
     if (name && email && password.length > 7) {
        setButton(false);
     }
     // Otherwise disable button
     else {
        setButton(true);
     }
  }

  function validate(input, field) {
    if (!input) {
      return false;
    }
    if (input) {
      let length = input.length;
      
      let pattern = new RegExp('/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/');
      if (field === 'Password' && pattern.test(input)===true){
        console.log('hello');
        return false;
      }
    }
    if (input) {
      let length = input.length;
      var pattern= new RegExp('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$');
      console.log(input);
      console.log(pattern.test(input));
      if (field === 'Email' && pattern.test(input)===true) {
        console.log('tes');
        return false;
      }
    }
    setError('');
    return true;
  }

  function validateField(input, field) {
     switch(field) {
        case 'name':
           name = input;
           if (!validate(name, 'Name')) return;
           break;
        case 'email':
           email = input;
           if (!validate(email, 'Email')) return;
           break;
        case 'password':
           password = input;
           if (!validate(password, 'Password')) return;
           break;
        default:
           break;
     }
  }

  function promptCreate() {
     ctx.users.push({name, email, password, balance: 0, loggedIn: false, displayed: false});
     console.log(`Success! Dear ${name}, Your new account has been created.`);
     alert(`Success! Dear ${name}, Your new account has been created.`);
     setDisplay(false);
  }

  function clearForm() {
     setName('');
     setEmail('');
     setPassword('');
     setButton(true);
     setDisplay(true);
     setError('');
  }

  return (
    <NewCard 
      id="create-account"
      status={error}
      body={display ? (
        <>
          <div>
            <div className="col-md-10 mx-auto col-lg-5 mt-5 mb-5">
            <p className="h3 text-center mb-4">Create New Account</p>
              <form className="p-4 p-md-5 border rounded-3 bg-light was-validated">
                <div className="form-floating mb-3">
                  <input name="name" type="input" className="form-control" id="name" placeholder="Name" value={name} onChange={(e) => {setName(e.currentTarget.value); validateField(e.currentTarget.value, 'name'); changeButtonStatus(e.currentTarget.value, 'name')}} required/>
                  <label for="floatingInput">Name</label>
                  <div className="valid-feedback">Valid.</div>
                  <div className="invalid-feedback">Please fill out this field.</div>
                </div>
                <div className="form-floating mb-3">
                  <input name="email" type="input" className="form-control" id="email" placeholder="Email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" value={email} onChange={(e) => {setEmail(e.currentTarget.value); validateField(e.currentTarget.value, 'email'); changeButtonStatus(e.currentTarget.value, 'email')}} required/>
                  <label for="floatingInput">Email</label>
                  <div className="valid-feedback">Valid Email Address.</div>
                  <div className="invalid-feedback">Please input a valid email address.</div>
                </div>
                <div className="form-floating mb-3">
                  <input name="password" type="input" className="form-control" id="password" placeholder="Password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" onChange={(e) => {setPassword(e.currentTarget.value); validateField(e.currentTarget.value, 'password'); changeButtonStatus(e.currentTarget.value, 'password')}} required/>
                  <label for="floatingPassword">Password</label>
                  <div className="valid-feedback">Valid Password.</div>
                  <div className="invalid-feedback">Password must contain at least one number, one uppercase, one lowercase letter and at least 8 or more characters.</div>
                </div>
                <div className="checkbox mb-3">
                  <label>
                    <input type="checkbox" value="remember-me"/> Remember me
                  </label>
                </div>
                <button id="create-account-button" className="w-100 btn btn-lg btn-primary" type="submit" onClick={promptCreate} disabled={button}>Create Account</button>
                <hr className="my-4"/>
                <p className="text-muted">Existing User? Log in <a href="#/home/">here</a></p>
              </form>
            </div>
          </div>
        </>):
        (
        <>
        <div>
            <div className="col-md-10 mx-auto col-lg-5 mt-5 mb-5">
              <p className="h3 text-center mb-4">Account is successfully created!</p>
              <button id="create-account-button" className="w-100 btn btn-lg btn-primary" type="submit" onClick={clearForm}>Create Another Account</button>
            </div>
        </div>
        </>
         )}
      />
   );
}