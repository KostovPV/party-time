import { useState } from 'react';

import { db } from '../../firebase/config';
import { collection, addDoc } from 'firebase/firestore';
import { useAuthContext} from '../../hooks/useAuthContext';
import Select from 'react-select'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'

import './Create.css'
import { useNavigate } from 'react-router-dom';


const categories = [
    { value: 'birthday', label: 'Birthday-party' },
    { value: 'casual', label: 'Games' },
    { value: 'special', label: 'Single-Program' },
    { value: 'day-care', label: 'Kids-day' },
  ]
  

export default function Create() {
  const [partyName, setPartyName] = useState('');
  const { user} = useAuthContext();
  const [details, setDetails] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [category, setCategory] = useState('')
  const navigate = useNavigate()
  const [formError, setFormError] = useState(null)
  console.log('user' ,user);
  const newparty = {
    partyName,
    details,
    dueDate,
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
    setDueDate('')
    setCategory('')
    navigate('/list')
  }

  return (
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
          <input
            required 
            type="date" 
            onChange={(e) => setDueDate(e.target.value)} 
            value={dueDate}
          />
        </label>
        {/* <div>
          <span>Set date</span>
          <DatePicker
            required 
            selected={dueDate}
            onChange={date => setDueDate(date)}
            dateFormat='dd/MM/yyyy' 
            minDate={new Date()}
            value={dueDate}
          />
        </div> */}
        <label>
          <span>Party category:</span>
          <Select
            onChange={(option) => setCategory(option)}
            options={categories}
          />
        </label>
      <button>Add</button>

    </form>
    </div>
  )
}