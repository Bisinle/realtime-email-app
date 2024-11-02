import React from 'react'
import { useStateContext } from '../../contexts/ContextProvider';

function NewEmails() {
    const { newEmails, setNewEmails,isNotificationOpen,setIsNotificationOpen } = useStateContext();

  return (
    <div>new emails</div>
  )
}

export default NewEmails