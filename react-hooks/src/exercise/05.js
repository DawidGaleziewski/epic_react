// useRef and useEffect: DOM interaction
// http://localhost:3000/isolated/exercise/05.js

import * as React from 'react'
// eslint-disable-next-line no-unused-vars
import VanillaTilt from 'vanilla-tilt'

function Tilt({children}) {
  // 🐨 create a ref here with React.useRef()




  // 🐨 add the `ref` prop to the `tilt-root` div here:

  const myDivRef = React.useRef()
  console.log("in component body", myDivRef)

  React.useEffect(()=> {
    // after the mponent has been rendered, it's considered mounted. So we can safely interact with it in use effect
    const myDiv = myDivRef.current

      // 🐨 add a `React.useEffect` callback here and use VanillaTilt to make your
  // div look fancy.
  // 💰 like this:
  VanillaTilt.init(myDiv, {
    max: 25,
    speed: 400,
    glare: true,
    'max-glare': 0.5,
  })

    console.log("inside useEffect hook", myDivRef)

      //
  // 💰 Don't forget to return a cleanup function. VanillaTilt.init will add an
  // object to your DOM node to cleanup:
  // `return () => tiltNode.vanillaTilt.destroy()`
  //
  // 💰 Don't forget to specify your effect's dependencies array! In our case
  // we know that the tilt node will never change, so make it `[]`. Ask me about
  // this for a more in depth explanation.

  return function cleanup() {
    myDiv.vanillaTilt.destroy() // we need to clean up as the dom node wont be destroyed on its own. Due to the fact the library has event handlers hanging on the dom node still it wont be garbage collected
  }
  },[])
  return (
    <div ref={myDivRef} className="tilt-root">
      <div className="tilt-child">{children}</div>
    </div>
  )
}

function App() {


  return (
    <Tilt>
      <div className="totally-centered">vanilla-tilt.js</div>
    </Tilt>
  )
}

export default App
