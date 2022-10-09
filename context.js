// Accesses the React Router DOM.
let Route = ReactRouterDOM.Route;
let Link = ReactRouterDOM.Link;
let HashRouter = ReactRouterDOM.HashRouter;
let {Card} = ReactBootstrap;

// Creates context.
let UserContext = React.createContext(null);

// Card component.
function NewCard(props) {
   return (
         <Card id={`card-${props.id}`}>
            <Card.Header id={`card-header-${props.id}`}>
            </Card.Header>
            <Card.Body id={`card-body-${props.id}`}>
               {props.body}
               {props.status && (<div id="createStatus"><br/>{props.status}</div>)} 
            </Card.Body>
         </Card>
   );
}