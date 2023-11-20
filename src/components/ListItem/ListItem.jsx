import { db } from "../../firebase/config";
import { doc, deleteDoc } from "firebase/firestore";

import './ListItem.css';
import { Link } from "react-router-dom";
import SingleListItem from "../SingleItem/SingleItem";
export default function ListItem({ parties }) {
console.log(parties);
  // const handleClick = async (id) => {
  //   const ref = doc(db, 'patry', id);
  //   await deleteDoc(ref);

  // }

  return (parties && (
    <div className="listItem">
      <>
        <ul>
          {parties.map(party => (
            <div key={party.id} className="card">
              <h3>{party.partyName}</h3>
              <p>{party.details} to make.</p>
               {/* <div>{new Date(Number(document.dueDate)).toDateString()}</div> */}
              <div>{party.category.label}</div>
              <div><Link to={`/list/${party.id}`} >Details</Link></div>
              {/* <SingleListItem party={party} /> */}
            </div>
          ))}
        </ul>
      </>
    </div>

  )
  )
}