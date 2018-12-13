import React from 'react'
import './App.css'

const fileHandler = file => {
  const reader = new FileReader()
  reader.onloadend = e => {
    if (e.target.readyState === FileReader.DONE)
      console.log(e.target.result)
  }
  reader.readAsText(file)
}

export default class App extends React.Component {
  render() {
    return (
        <>
          <span className='logo'>Whatalytics</span>
          <input type={'file'} accept={'.txt'} onChange={e => fileHandler(e.target.files[0])}/>
        </>
    )
  }
}