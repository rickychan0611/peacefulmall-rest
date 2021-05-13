import {useState, useEffect} from 'react';
import {
  useWindowSize,
  useWindowWidth,
  useWindowHeight,
} from '@react-hook/window-size/throttled'

export const isMobile = () => {
  const [check, setCheck] = useState(false);
  const onlyWidth = useWindowWidth()

  useEffect(()=>{
    if (onlyWidth > 500) setCheck(false)
    else return  setCheck(true)
  },[onlyWidth])

  return check
}

export const isTablet = () => {
  const [check, setCheck] = useState(false);
  const onlyWidth = useWindowWidth()

  useEffect(()=>{
    if (onlyWidth < 900 && onlyWidth > 501) setCheck(false)
    else return  setCheck(true)
  },[onlyWidth])

  return check
}