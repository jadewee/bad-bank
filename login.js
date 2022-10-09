function Login() {
  let ctx = React.useContext(UserContext);

  let displayState;
  let nameState;
  ctx.users.map((element, index, array) => {
     if (element.displayed === true) {
        displayState = true;
        nameState = element.name;
     }
  });
  if (displayState === null) {
     displayState = false;
  }
  if (nameState === null) {
     nameState = '';
  }

  let {useState} = React;

  let [name, setName] = useState(nameState);
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let [button, setButton] = useState(true);
  let [display, setDisplay] = useState(displayState);
  let [error, setError] = useState('');

  function changeButtonStatus(input, field) {
     switch(field) {
        case 'email':
           email = input;
           break;
        case 'password':
           password = input;
           break;
        default:
           break;
     }
     if (email && password) {
        setButton(false);
     }
     else {
        setButton(true);
     }
  }

 function validate(input, field) {
  if (!input) {
     setError(`Error: ${field} field must not be left blank.`);
     setTimeout(() => setError(''), 3000);
     return false;
  }
  setError('');
  return true;
}

function validateField(input, field) {
  switch(field) {
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

  function logInUser() {
     let validAccount = false;
     ctx.users.map((element, index, array) => {
        if (element.loggedIn === false && element.email === email && element.password === password) {
           element.loggedIn = true;
           element.displayed = true;
           name = element.name;
           display = true;
           validAccount = true;
           console.log(`Welcome, ${name}. You are now logged in.`);
           alert(`Welcome, ${name}. You are now logged in.`);
        }
     });
     if (!validAccount) {
        ctx.users.map((element, index, array) => {
           if (element.loggedIn === false && (element.email != email || element.password != password)) {
              name = '';
              display = false;
              console.log(`An account for the email "${email}" and password "${password}" cannot be found. Please enter a valid email and password to continue.`);
              alert(`An account for the email "${email}" and password "${password}" cannot be found. Please enter a valid email and password to continue.`);
              setError(`An account for the email "${email}" and password "${password}" cannot be found. Please enter a valid email and password to continue.`);
              setTimeout(() => setError(''), 3000);
              return;
           }
        });
     }
     setName(name);
  }

  function logOutUser() {
     ctx.users.map((element, index, array) => {
        if (element.loggedIn === true) {
           element.loggedIn = false;
           element.displayed = false;
           name = element.name;
           display = element.displayed;
           console.log(`Goodbye, ${name}. You are now logged out.`);
           alert(`Goodbye ${name}. You are now logged out.`);
        }
     });
     name = '';
     setName(name);
  }

  function logIn() {
     logInUser();
     setDisplay(display);
  }

  function logOut() {
     logOutUser();
     clearForm();
     setDisplay(display);
  }

  function clearForm() {
     setName('');
     setEmail('');
     setPassword('');
     setButton(true);
     setDisplay(displayState);
     setError('');
  }

  return (
     <NewCard
        id="login"
        status={error}
        body={display ? 
         (
            <>
            <div className="col-md-10 mx-auto col-lg-5 mt-5 mb-5">
               <p className="h3 text-center mb-4">Welcome, {name}. You are currently logged in.</p>
               <button className="w-100 btn btn-lg btn-primary mt-3" type="submit" onClick={logOut}>Log Out</button>
            </div>
            </>
         ):(
            <>
            <div className="col-md-10 mx-auto col-lg-5 mt-5 mb-5">
               <p className="h3 text-center mb-4">Log in</p>
               <form className="p-4 p-md-5 border rounded-3 bg-light">
                  <div className="form-floating mb-3">
                     <input name="email" className="form-control mt-3" id="email" type="input" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" placeholder="Enter Email" value={email} onChange={(e) => {setEmail(e.currentTarget.value); validateField(e.currentTarget.value, 'email'); changeButtonStatus(e.currentTarget.value, 'email')}}/>
                     <label for="floatingInput">Email</label>
                     <div className="valid-feedback">Valid Email Address.</div>
                     <div className="invalid-feedback">Please input a valid email address.</div>
                  </div>
                  <div className="form-floating mb-3">
                     <input name="password" type="input" className="form-control" id="password" placeholder="Enter Password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" value={password} onChange={(e) => {setPassword(e.currentTarget.value); validateField(e.currentTarget.value, 'password'); changeButtonStatus(e.currentTarget.value, 'password')}}/>
                     <label for="floatingPassword">Password</label>
                     <div className="valid-feedback">Valid Password.</div>
                     <div className="invalid-feedback">Password must contain at least one number, one uppercase, one lowercase letter and at least 8 or more characters.</div>
                </div>
               </form>
               <button className="w-100 btn btn-lg btn-primary mt-3" type="submit" onClick={logIn} disabled={button}>Log In</button>
            </div>
            </>
         )}
     />
  );
}