import React, {useState} from 'react'
import LoaderContext from './LoaderContext'


const LoaderState = (props) => {
    const [loader, setLoader] = useState(false);
  return (
    <LoaderContext.Provider value={{loader, setLoader}}>
      {props.children}
    </LoaderContext.Provider>
  )
}

export default LoaderState
