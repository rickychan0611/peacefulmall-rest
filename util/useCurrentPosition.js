import { useRecoilState } from 'recoil';
import { currentPosition as currentPositionAtom } from '../data/atoms';
import { MAP_API } from '../env';

const useCurrentPosition = async () => {
  const [currentPosition, setCurrentPosition] = useRecoilState(currentPositionAtom);

  try {
    const lngLat = await new Promise((resolve, reject) => {
      if ('geolocation' in navigator) {
        console.log('!!!!!!!!!!!!!!!Available');
        console.log('Latitude is :', position.coords.latitude);
        console.log('Longitude is :', position.coords.longitude);
        setCurrentPosition({ lat: position.coords.latitude, lng: position.coords.latitude });
        resolve();
      } else {
        console.log('!!!!!!!!!!!!!Not Available');
        reject('FUCKED UP');
      }
    });
  } catch (err) {
      console.log(err);
  }
};

export default useCurrentPosition;
