import { useEffect, useState } from 'react';

import { db } from '../../firebase/config';
import { collection, deleteDoc, doc, setDoc, updateDoc, } from 'firebase/firestore';
import { useAuthContext } from '../../hooks/useAuthContext';
import Select from 'react-select'
import { useNavigate, useParams } from 'react-router-dom';
import { useDocument } from '../../hooks/useDocument';

import './Edit.css'

const categories = [
  { value: 'birthday', label: 'Birthday-party' },
  { value: 'casual', label: 'Games' },
  { value: 'special', label: 'Single-Program' },
  { value: 'day-care', label: 'Kids-day' },
]


export default function Edit() {
  
  const [partyName, setPartyName] = useState('');
  const [details, setDetails] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [category, setCategory] = useState('')
  const { user } = useAuthContext();
  const { id } = useParams()
  console.log(id);
  const { document, error } = useDocument('parties', id)
  const navigate = useNavigate();
  console.log(document);
  const userId = user?.uid;
  const canEdit = (document?.author === userId)
  const [formError, setFormError] = useState(null)

  console.log(document);


  useEffect(() => {
    if (document) {
    setPartyName(document.partyName);
    setDetails(document.details);
    setDueDate(document.dueDate);
    setCategory(document.category);
    }
    }, [document]);


  console.log('user', user);
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

    const ref = doc(db, "parties", id)
    setFormError(null)
    await updateDoc(ref, newparty
    )
    navigate('/list')
  }

  const onExit = (e) => {
    e.preventDefault();
    navigate('/list')
  }

  const deleteParty =async (e) => {
    const ref = doc(db, "parties", id)
    e.preventDefault();
    await deleteDoc(ref)
      navigate('/list')
  }


  return (
    <div className='edit-container'>
    <form className='edit-form' onSubmit={handleSubmit}>
      <label>
        <span>Add a new book title:</span>
        <input
          required
          type="text"
          onChange={(e) => setPartyName(e.target.value)}
          value={partyName}
        />
      </label>
      <label>
        <span>Project Details:</span>
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
      <label>
        <span>Project category:</span>
        <Select
          value={category}
          onChange={(option) => setCategory(option)}
          options={categories}

        />
      </label>
      <button>Save</button>
      <button onClick={onExit} >Return</button>
      {canEdit && (
          <button onClick={deleteParty} >Delete</button>
          
        )}
    </form>
    </div>
  )

}