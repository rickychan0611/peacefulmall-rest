import {useState, useEffect} from 'react';
import {
  useWindowSize,
  useWindowWidth,
  useWindowHeight,
} from '@react-hook/window-size/throttled'

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  const onlyWidth = useWindowWidth()

  useEffect(()=>{
    if (onlyWidth < 500) setIsMobile(true)
    else return  setIsMobile(false)
  },[onlyWidth])

  return isMobile
}

export const useIsTablet = () => {
  const [isTablet, setIsTablet] = useState(false);
  const onlyWidth = useWindowWidth()

  useEffect(()=>{
    if (onlyWidth >= 500 && onlyWidth <= 990) setIsTablet(true)
    else return  setIsTablet(false)
  },[onlyWidth])

  return isTablet
}

export const useIsDesktop = () => {
  const [isDesktop, setIsDesktop] = useState(false);
  const onlyWidth = useWindowWidth()

  useEffect(()=>{
    if (onlyWidth > 990) setIsDesktop(true)
    else return  setIsDesktop(false)
  },[onlyWidth])

  return isDesktop
}