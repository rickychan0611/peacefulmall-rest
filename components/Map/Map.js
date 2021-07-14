import { useEffect, useState } from 'react';
import {
  GoogleMap,
  LoadScript,
  DirectionsService,
  DirectionsRenderer,
  useJsApiLoader,
  Marker
} from '@react-google-maps/api';
import Loader from '../../components/Loader';

export default function Map({
  mapResponse,
  setMapResponse,
  children,
  waypoints,
  destination,
  origin,
  setShowList,
  setLoading,
  shipping,
  runDirectionsService,
  setRunDirectionsService
}) {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAP_API // ,
    // ...otherOptions
  });

  function directionsCallback(response) {
    if (response !== null) {
      if (response.status === 'OK') {
        console.log("directionsCallback", response)
        setMapResponse(response);
        setLoading(false);
      } else {
        setLoading(false);
      }
    }
  }

  const RenderMap = () => {

    // useEffect(() => {
    //   console.log("!!!!!!1", destination)
    //   if ('geolocation' in navigator) {
    //     navigator.geolocation.getCurrentPosition(function (position) {
    //       // setOrigin({ lat: position.coords.latitude, lng: position.coords.longitude });
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
            width: '100%',
            height: '300px'
          }}
          center={origin}
          zoom={11}
          // onLoad={onLoad}
        >
          {/* Child components, such as markers, info windows, etc. */}
          <>
            {runDirectionsService && destination && origin && shipping && (
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

            {!runDirectionsService && mapResponse && mapResponse.routes[0] && shipping && (
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

            {/* {shipping && <Marker position={destination} title="Your position" />} */}
            {!shipping && <Marker position={origin} title="Shop" />}
            {children}
          </>
        </GoogleMap>
      </>
    );
  };

  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>;
  }

  return isLoaded ? <RenderMap /> : <Loader />;
}
