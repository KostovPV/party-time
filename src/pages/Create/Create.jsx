// import { useState } from 'react';

// import { db } from '../../firebase/config';
// import { collection, addDoc } from 'firebase/firestore';
// import { useAuthContext} from '../../hooks/useAuthContext';
// import Select from 'react-select'
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css'

// import './Create.css'
// import { useNavigate } from 'react-router-dom';


// const categories = [
//     { value: 'birthday', label: 'Birthday-party' },
//     { value: 'casual', label: 'Games' },
//     { value: 'special', label: 'Single-Program' },
//     { value: 'day-care', label: 'Kids-day' },
//   ]


// export default function Create() {
//   const [partyName, setPartyName] = useState('');
//   const { user} = useAuthContext();
//   const [details, setDetails] = useState('')
//   const [dueDate, setDueDate] = useState('')
//   const [category, setCategory] = useState('')
//   const navigate = useNavigate()
//   const [formError, setFormError] = useState(null)
//   console.log('user' ,user);
//   const newparty = {
//     partyName,
//     details,
//     dueDate,
//     category,
//     author: user.uid, 
//     createdBy: user.email
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()

//     const ref = collection(db, "parties")
//     setFormError(null)
//     await addDoc(ref, newparty
//     )
//     setPartyName('')
//     setDetails('')
//     setDueDate('')
//     setCategory('')
//     navigate('/list')
//   }

//   const onExit = (e) => {
//     e.preventDefault();
//     navigate('/list')
//   }
//   return (
//     <div className='create-container'>
//     <form className='create-form' onSubmit={handleSubmit}>
//       <label>
//         <span>Add a new party:</span>
//         <input 
//           required
//           type="text"
//           onChange={(e) => setPartyName(e.target.value)}
//           value={partyName}
//         />
//       </label>
//       <label>
//           <span>Party Details:</span>
//           <textarea 
//             required
//             onChange={(e) => setDetails(e.target.value)}
//             value={details} 
//           ></textarea>
//         </label>
//         <label>
//           <span>Set due date:</span>
//           <input
//             required 
//             type="date" 
//             onChange={(e) => setDueDate(e.target.value)} 
//             value={dueDate}
//           />
//         </label>

//         <label>
//           <span>Party category:</span>
//           <Select
//             onChange={(option) => setCategory(option)}
//             options={categories}
//           />
//         </label>
//       <button>Add</button>
//       <button onClick={onExit} >Return to Party's list</button>
//     </form>
//     </div>
//   )
// }


import { useEffect, useState } from 'react';

import { db } from '../../firebase/config';
import { collection, addDoc } from 'firebase/firestore';
import { useAuthContext } from '../../hooks/useAuthContext';
import Select from 'react-select'
import { useNavigate } from 'react-router';

import { useDocument } from '../../hooks/useDocument';

import DatePicker from "react-datepicker";
import addDays from 'date-fns/addDays';
import "react-datepicker/dist/react-datepicker.css";



import './Create.css'
import { useCollection } from '../../hooks/useCollection';


const categories = [
  { value: 'birthday', label: 'Birthday-party' },
  { value: 'casual', label: 'Games' },
  { value: 'special', label: 'Single-Program' },
  { value: 'day-care', label: 'Kids-day' },
]


export default function Create() {
  const { documents: parties } = useCollection('parties');
  const [excludedDates, setExcludedDates] = useState('')

  useEffect(() => {
    if (parties) {
      console.log('parties', parties);
      const forbidenDates = parties.map(d => d.date)
      console.log(forbidenDates);


      let formattedDates = forbidenDates.map((forbidenDate) => {
        const milliseconds = forbidenDate.seconds * 1000;
        const dateS = new Date(milliseconds);

        const day = dateS.getDate();
        const month = dateS.getMonth() + 1;
        const year = dateS.getFullYear();

        return `${month}/${day}/${year}`;
      });
      setExcludedDates(formattedDates)
      console.log(formattedDates);
    }
  }, [parties]);

  const [partyName, setPartyName] = useState('');
  const { user } = useAuthContext();
  const [details, setDetails] = useState('')
  // const [dueDate, setDueDate] = useState('')
  const [category, setCategory] = useState('')
  const navigate = useNavigate()
  const [formError, setFormError] = useState(null)
  const [date, setDate] = useState(new Date());
  console.log('user', user);
  const newparty = {
    partyName,
    details,
    date,
    category,
    author: user.uid,
    createdBy: user.email
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const ref = collection(db, "parties")
    setFormError(null)
    await addDoc(ref, newparty
    )
    setPartyName('')
    setDetails('')
    setDate('')
    setCategory('')
    navigate('/list')
  }
  const onExit = (e) => {
         e.preventDefault();
       navigate('/list')
      }

  return (excludedDates &&
    // <form className='create-form' onSubmit={handleSubmit}>
    //   <label>
    //     <span>Add a new party:</span>
    //     <input 
    //       required
    //       type="text"
    //       onChange={(e) => setPartyName(e.target.value)}
    //       value={partyName}
    //     />
    //   </label>
    //   <label>
    //       <span>Party Details:</span>
    //       <textarea 
    //         required
    //         onChange={(e) => setDetails(e.target.value)}
    //         value={details} 
    //       ></textarea>
    //     </label>
    //     <label>
    //       <span>Set due date:</span>
    //       {/* <input
    //         required 
    //         type="date" 
    //         onChange={(e) => setDueDate(e.target.value)} 
    //         value={dueDate}
    //       /> */}
    //      <div>
    //   <DatePicker 
    //   excludeDates={excludedDates.map(d=>new Date(d))}
    //   minDate={new Date()}
    //   maxDate={addDays(new Date(), 30)}
    //   selected={date} 
    //   onChange={(date) => setDate(date)} 
    //   />
    // </div>
    //     </label>
    //     <label>
    //       <span>Party category:</span>
    //       <Select
    //         onChange={(option) => setCategory(option)}
    //         options={categories}
    //       />
    //     </label>
    //   <button>Add</button>

    // </form>

    <div className='create-container'>
      <form className='create-form' onSubmit={handleSubmit}>
        <label>
          <span>Add a new party:</span>
          <input
            required
            type="text"
            onChange={(e) => setPartyName(e.target.value)}
            value={partyName}
          />
        </label>
        <label>
          <span>Party Details:</span>
          <textarea
            required
            onChange={(e) => setDetails(e.target.value)}
            value={details}
          ></textarea>
        </label>
        <label>
          <span>Set due date:</span>
          <DatePicker
            excludeDates={excludedDates.map(d => new Date(d))}
            minDate={new Date()}
            maxDate={addDays(new Date(), 30)}
            selected={date}
            onChange={(date) => setDate(date)}
          />
        </label>

        <label>
          <span>Party category:</span>
          <Select
            onChange={(option) => setCategory(option)}
            options={categories}
          />
        </label>
        <button>Add</button>
        <button onClick={onExit} >Return to Party's list</button>
      </form>
    </div>
  )
}