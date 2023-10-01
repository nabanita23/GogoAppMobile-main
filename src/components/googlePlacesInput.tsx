import React, { useState } from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Colors, Spacings } from 'react-native-ui-lib';
import Input from './input';

const GooglePlacesInput = ({ cb }: { cb: (details: any) => void }) => {
  const [value, setValue] = useState('');

  const handlePlaceSelect = (data: any, details: any) => {
    setValue(details?.name);
    cb?.(details);
  };

  const handleTextChange = (inputText: string) => setValue(inputText);

  return (
    <GooglePlacesAutocomplete
      minLength={4}
      debounce={400}
      placeholder="Search for a location"
      fetchDetails={true}
      onPress={handlePlaceSelect}
      onFail={error => console.log(error)}
      onNotFound={() => console.log('no results')}
      textInputProps={{
        InputComp: Input,
        value,
        autoFocus: true,
        blurOnSubmit: false,
        placeholder: 'Enter your house/shop address or nearby places',
        onChangeText: handleTextChange,
      }}
      // predefinedPlaces={[
      //   {
      //     type: 'favorite',
      //     description: 'Dominos Pizza',
      //     geometry: { location: { lat: 48.8152937, lng: 2.4597668 } },
      //   },
      //   {
      //     type: 'favorite',
      //     description: 'Chicken Republic',
      //     geometry: { location: { lat: 48.8496818, lng: 2.2940881 } },
      //   },
      // ]}
      styles={{
        container: {
          flex: 0,
        },
        listView: {
          marginTop: Spacings.s4,
        },
        row: {
          paddingLeft: 0,
          margin: 0,
          backgroundColor: Colors.transparent,
        },
        description: {
          color: Colors.text2,
        },
        predefinedPlacesDescription: {
          color: Colors.text1,
        },
      }}
      query={{
        key: 'AIzaSyCuqwXtomyL--2QxlqluYAVIMdwjToFVdE',
        language: 'en',
        components: 'country:in',
      }}
    />
  );
};

export default GooglePlacesInput;
