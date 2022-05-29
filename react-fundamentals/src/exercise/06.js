// Basic Forms
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'

function UsernameForm({onSubmitUsername}) {
  // 🐨 add a submit event handler here (`handleSubmit`).
  // 💰 Make sure to accept the `event` as an argument and call
  // `event.preventDefault()` to prevent the default behavior of form submit
  // events (which refreshes the page).
  // 📜 https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault
  //
  // 🐨 get the value from the username input (using whichever method
  // you prefer from the options mentioned in the instructions)
  // 💰 For example: event.target.elements[0].value
  // 🐨 Call `onSubmitUsername` with the value of the input

  // 🐨 add the onSubmit handler to the <form> below

  // 🐨 make sure to associate the label to the input.
  // to do so, set the value of 'htmlFor' prop of the label to the id of input

  const passwordInputRef = React.useRef(null)

  const [title, setTitle] = React.useState('')

  const onTitleInputChangeHandler = event => {
    if (!isTitleValid) {
      console.log('wrong title!')
    }
    setTitle(event.target.value)
  }

  const onFormSubmit = event => {
    event.preventDefault()
    const usernameValue = event.target[0].value
    console.log(usernameValue, passwordInputRef.current.value, title)
  }

  const isTitleValid = title.toUpperCase() === title

  return (
    <form onSubmit={onFormSubmit}>
      <div>
        {isTitleValid ? null : (
          <div role="alert">Invalid title! use uppercase</div>
        )}
        {/* 1st method: just let it be */}
        <label htmlFor="input-username">Username:</label>
        <input id="input-username" type="text" />

        {/* 2nd method: ref */}
        <label htmlFor="input-password">Password</label>
        <input ref={passwordInputRef} id="input-password" type="text" />

        {/* 3rd method: state*/}
        <label htmlFor="royal-title">Your royal title</label>
        <input
          id="royal-titile"
          value={title}
          onChange={onTitleInputChangeHandler}
        />
      </div>
      <button disabled={!isTitleValid} type="submit">
        Submit
      </button>
    </form>
  )
}

function App() {
  const onSubmitUsername = username => alert(`You entered: ${username}`)
  return <UsernameForm onSubmitUsername={onSubmitUsername} />
}

export default App
