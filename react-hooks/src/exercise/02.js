// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

function Greeting({initialName = ''}) {
  // 🐨 initialize the state to the value from localStorage
  // 💰 window.localStorage.getItem('name') ?? initialName
  const [name, setName] = useLocalStorageState("name", "initial set name")


  // 🐨 Here's where you'll use `React.useEffect`.
  // The callback should set the `name` in localStorage.
  // 💰 window.localStorage.setItem('name', name)

  function handleChange(event) {
    setName(event.target.value)
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting />
}

// if this was named without "use" and was a normal function it would still work
// we should use custome hooks for wrapping other hooks, custome or react hooks
const useLocalStorageState = (lsLabel, initialState = "", {
  serialize = JSON.stringify, // optional options for serializing and deserializing
  deserialize = JSON.parse
} = {}) => {

  const [value, setValue] = React.useState(()=> {
    const localStorageValue = window.localStorage.getItem(lsLabel)
    if(localStorageValue){
      return deserialize(localStorageValue)
    }

    return typeof initialState === "function" ? initialState() : initialState // just like with the lazy load on useSetate we may want to pass computational heavy calc here, so we may want to use a funcztion
  }); 

  const prevLabelRef = React.useRef(lsLabel) // we use this to keep track of previous key in prevous render


  React.useEffect(()=> {
    const prevLabel = prevLabelRef.current

    if(prevLabel !== lsLabel){
      window.localStorage.removeItem(prevLabel) // if the label we used for localstorage value changed we want to remove it
    }

    prevLabel.current = lsLabel

    window.localStorage.setItem(lsLabel, serialize(value))
  },[value, lsLabel, serialize]) // dependency array on useEffect is a shallow comparison. If we put a object here like a {name: value} we are going to get a re-render each time

  return [value, setValue]
}

export default App
