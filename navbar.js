
 const { borderRadius } = require("@mui/system");
 
 function NavBar() {
   return (
      <>
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
            <div className="container-fluid">
            <img src="images/logo.png" className="rounded-circle" width="30"></img>
            <a className="navbar-brand" href="#">JW Bank</a>
            <button className="navbar-toggler collapsed" type="button" data-bs-toggle="collapse" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse">
                <ul className="navbar-nav me-auto mb-2 mb-sm-0">
                <li className="nav-item">
                    <a className="nav-link" href="#" data-bs-toggle="tooltip" data-placement="bottom" title="Bank's home pages, Existing users can Log in here">Home</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#/createaccount/" data-bs-toggle="tooltip" data-placement="bottom" title="For new users, Create Account here">Create Account</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#/deposit/" data-bs-toggle="tooltip" data-placement="bottom" title="Log in to deposit cash">Deposit</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#/withdraw/" data-bs-toggle="tooltip" data-placement="bottom" title="Log in to withdraw cash from account">Withdraw</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#/alldata/" data-bs-toggle="tooltip" data-placement="bottom" title="All Transactions">All Data</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#/login/" data-bs-toggle="tooltip" data-placement="bottom" title="For existing users to log in and transact">Login</a>
                </li>
                </ul>
            </div>
            </div>
        </nav>
    </>
   );
 }