import React, {useState} from 'react'
import LoaderContext from './LoaderContext'
import Loader from '../../components/loader/Loader';

const LoaderState = (props) => {
    const [loader, setLoader] = useState(false);
    // if(loader) return <Loader />
  return (
    <LoaderContext.Provider value={{loader, setLoader}}>
      {props.children}
    </LoaderContext.Provider>
  )
}

export default LoaderState
