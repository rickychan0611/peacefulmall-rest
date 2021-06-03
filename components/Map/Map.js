import { useEffect } from 'react';
import {
  GoogleMap,
  LoadScript,
  DirectionsService,
  DirectionsRenderer,
  useJsApiLoader,
  Marker
} from '@react-google-maps/api';
import Loader from '../../components/Loader';
import { MAP_API } from '../../env';

export default function Map({
  mapResponse,
  setMapResponse,
  children,
  runDirectionsService,
  setRunDirectionsService,
  waypoints,
  destination,
  origin,
  setShowList,
  setLoading
}) {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: MAP_API // ,
    // ...otherOptions
  });

  function directionsCallback(response) {
    if (response !== null) {
      if (response.status === 'OK') {
        setMapResponse(response);
        setShowList(true);
        setLoading(false);
      } else {
        setLoading(false);
      }
    }
  }

  const renderMap = () => {
    // wrapping to a function is useful in case you want to access `window.google`
    // to eg. setup options or create latLng object, it won't be available otherwise
    // feel free to render directly if you don't need that
    // const onLoad = React.useCallback(
    //   function onLoad(mapInstance) {
    //     // do something with map Instance
    //   }
    // )

    // useEffect(() => {
    //   if ('geolocation' in navigator) {
    //     navigator.geolocation.getCurrentPosition(function (position) {
    //       setOrigin({ lat: position.coords.latitude, lng: position.coords.longitude });
    //     });
    //   } else {
    //     console.log('Not Available');
    //   }

      
    // }, []);

    return (
      <>
        <GoogleMap
          mapContainerStyle={{
            id: 'direction',
            // position: 'absolute',
            width: '100%',
            height: '300px'
          }}
          center={{
            lat: 0,
            lng: -180
          }}
          zoom={12}
          // onLoad={onLoad}
        >
          {/* Child components, such as markers, info windows, etc. */}
          <>
            {runDirectionsService && waypoints && waypoints[0] && (
              <DirectionsService
                // required
                options={{
                  // eslint-disable-line react-perf/jsx-no-new-object-as-prop
                  destination,
                  origin,
                  waypoints,
                  travelMode: 'DRIVING',
                  optimizeWaypoints: true,
                  provideRouteAlternatives: true
                }}
                // required
                callback={directionsCallback}
                // optional
                onLoad={(directionsService) => {
                  setRunDirectionsService(false);
                  // console.log('DirectionsService onLoad directionsService: ', directionsService)
                }}
                // // optional
                // onUnmount={directionsService => {
                //   console.log('DirectionsService onUnmount directionsService: ', directionsService)
                // }}
              />
            )}

            {!runDirectionsService && mapResponse && mapResponse.routes[0] && (
              <DirectionsRenderer
                // required
                options={{
                  // eslint-disable-line react-perf/jsx-no-new-object-as-prop
                  directions: mapResponse
                }}
                // optional
                // onLoad={directionsRenderer => {
                //   console.log('DirectionsRenderer onLoad directionsRenderer: ', directionsRenderer)
                // }}
                // // optional
                // onUnmount={directionsRenderer => {
                //   console.log('DirectionsRenderer onUnmount directionsRenderer: ', directionsRenderer)
                // }}
              />
            )}
            {children}
          </>
        </GoogleMap>
      </>
    );
  };

  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>;
  }

  return isLoaded ? renderMap() : <Loader />;
}
