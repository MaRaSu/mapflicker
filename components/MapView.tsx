/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useRef, useState} from 'react';
import {Button, StyleProp, View, ViewStyle} from 'react-native';
import MapView, {LatLng, UrlTile} from 'react-native-maps';
import MyAccuracyCircle from './AccuracyCircle';
import MyLocationMapMarker from './LocationMarker';

type Props = {
  style: StyleProp<ViewStyle>;
};

const AppMapView: React.FC<Props> = props => {
  const [locMarkerOn, setLocMarkerOn] = useState(false);
  const [locMarkerWithCircle, setLocMarkerWithCircle] = useState(false);
  const [circleOn, setCircleOn] = useState(false);
  const [center, setCenter] = useState<LatLng | null>(null);
  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      if (mapRef.current) {
        //console.log(mapRef);
        mapRef.current.getCamera().then(camera => {
          console.log(camera);
          const position = camera.center;
          position.latitude = position.latitude + 0.0003;
          position.longitude = position.longitude + 0.001;
          setCenter(position);
          if (mapRef && mapRef.current) {
            mapRef.current.setCamera({...camera, ...position});
          }
        });
      }
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  console.log('Rendering Mapview');

  return (
    <>
      <View
        style={{
          position: 'absolute',
          left: 10,
          top: 80,
          zIndex: 100,
          backgroundColor: 'red',
        }}>
        <Button
          title={'LocationMarker'}
          onPress={() => setLocMarkerOn(!locMarkerOn)}
        />
      </View>
      <View
        style={{
          position: 'absolute',
          left: 10,
          top: 140,
          zIndex: 100,
          backgroundColor: 'red',
        }}>
        <Button
          title={'Marker with circle'}
          onPress={() => setLocMarkerWithCircle(!locMarkerWithCircle)}
        />
      </View>
      <View
        style={{
          position: 'absolute',
          left: 10,
          top: 200,
          zIndex: 100,
          backgroundColor: 'red',
        }}>
        <Button title={'Circle'} onPress={() => setCircleOn(!circleOn)} />
      </View>
      <MapView
        mapType={'standard'}
        style={props.style}
        rotateEnabled={false}
        showsCompass={true}
        showsScale={true}
        compassOffset={{x: -22, y: 22}}
        ref={mapRef}
        initialRegion={{
          latitude: 61.444837953240864,
          latitudeDelta: 0.03135218456578815,
          longitude: 23.75642916473913,
          longitudeDelta: 0.029074913466511816,
        }}>
        <UrlTile
          urlTemplate={
            'https://tilestrata.trailmap.fi/d3-mtbmap-cache/3dv2/{z}/{x}/{y}@2x.webp'
          }
          maximumZ={17}
          tileSize={512}
          shouldReplaceMapContent={false}
          zIndex={1}
          flipY={false}
        />
        {locMarkerOn && (
          <MyLocationMapMarker center={center} isCircle={locMarkerWithCircle} />
        )}
        {circleOn && <MyAccuracyCircle center={center} />}
      </MapView>
    </>
  );
};

export default AppMapView;
