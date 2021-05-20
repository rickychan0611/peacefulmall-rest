import { useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import useTranslation from 'next-translate/useTranslation';

const LocationInput = () => {
  const [value, setValue] = useState();
  const { t } = useTranslation('home');

  return (
    <>
      <GooglePlacesAutocomplete
        autocompletionRequest={{
          componentRestrictions: {
            country: ['ca']
          }
        }}
        selectProps={{
          placeholder: t('enterAddress'),
          value,
          onChange: setValue,
          styles: {
            input: (provided) => ({
              ...provided,
              border: 'none',
              width: '33vw',
            }),
            control: (provided) => ({
              ...provided,
              borderColor: 'white',
              boxShadow: 'none',
              maxWidth: 450
            })
          }
        }}
      />
    </>
  );
};


export default LocationInput;
