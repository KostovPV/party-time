import { Link, useParams } from "react-router-dom"
import { useDocument } from "../../hooks/useDocument"
import { useAuthContext } from "../../hooks/useAuthContext";
import './Details.css'
import Card from "../../components/Card/Card";

export default function Details() {
  const { id } = useParams()
  const { user } = useAuthContext();
  const userId = user?.uid;

  const { document, error } = useDocument('parties', id)
  console.log(document);
  const canEdit = (document?.author === userId)
  console.log('canEdit', canEdit);
  if (error) {
    return <div className="error">{error}</div>
  }
  if (!document) {
    return <div className="loading">Loading...</div>
  }
// console.log(document.dueDate);
// console.log(new Date(Number(document.dueDate)));
// console.log(new Date(Number(document.dueDate)).toDateString());
  return (document && (
    <div className="details-container">
    <Card className="party-item">
      <div key={document.id} className="party-item-description">

        <h3>Party name: {document.partyName}</h3>
        <p>Party details: {document.details}</p>
        <p>Created by: {document.createdBy} </p>
        <p>Party type: {document.category.label} </p>
        <div>Party's date: {document.dueDate}</div>
        {/* <div>{new Date(Number(document.dueDate)).toDateString()}</div> */}
        {canEdit && (
          <div><Link to={`/list/${id}/edit`} party={document} >Edit</Link></div>
          
        )}
      </div>
    </Card>
    </div>
  )
  )
}