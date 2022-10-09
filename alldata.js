function AllData() {
  let ctx = React.useContext(UserContext);

  return (
     <NewCard
        id="all-data"
        body={(
           <>
            <div className="mx-auto mt-5 mb-5 row justify-content-center">
               <p className="h3 text-center mb-4">All Data</p>
               <div className="mb-5 col-auto p-2">
                  <table className="table table-striped w-auto table-responsive">
                     <thead className="thead-light">
                        <tr>
                           <th scope="col" key='name-header'>Name</th>
                           <th scope="col" key='email-header'>Email</th>
                           <th scope="col" key='password-header'>Password</th>
                           <th scope="col" key='balance-header'>Account Balance</th>
                           <th scope="col" key='loggedIn-header'>Login Status</th>
                        </tr>
                     </thead>
                     <tbody>
                        {ctx.users.map((element, index, array) => {
                        return (
                           <tr key={`${index}`}>
                              <td key={`Name#${index}`}>{element.name}</td>
                              <td key={`Email#${index}`}>{element.email}</td>
                              <td key={`Password#${index}`}>{element.password}</td>
                              <td key={`Balance#${index}`}>{element.balance}</td>
                              <td key={`LoggedIn#${index}`}>{JSON.stringify(element.loggedIn)}</td>
                           </tr>
                        )
                        })}
                     </tbody>
                  </table>
               </div>
            </div>
           </>
        )}
     />
  );
}