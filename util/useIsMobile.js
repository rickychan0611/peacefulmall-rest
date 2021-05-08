import {useState, useEffect} from 'react';
import {
  useWindowSize,
  useWindowWidth,
  useWindowHeight,
} from '@react-hook/window-size/throttled'

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  const onlyWidth = useWindowWidth()

  useEffect(()=>{
    if (onlyWidth > 500) setIsMobile(false)
    else return  setIsMobile(true)
  },[onlyWidth])

  return isMobile
}

export default useIsMobile;