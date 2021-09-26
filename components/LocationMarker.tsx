import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Marker, Circle} from 'react-native-maps';

const ANCHOR = {x: 0.5, y: 0.5};
const colorOfmyLocationMapMarker = 'rgba(0, 112, 255, 1)';

type DefaultProps = {
  center: any;
  isCircle: boolean;
  centerMap?: boolean;
  rotateMapOnHeading?: boolean;
  enableHack?: boolean;
};

const defaultProps = {
  centerMap: true,
  rotateMapOnHeading: false,
  enableHack: false,
};

const MyLocationMapMarker: React.FC<DefaultProps> = props => {
  if (!props.center) {
    return null;
  }

  const coordinate = (({latitude, longitude}) => ({
    latitude,
    longitude,
  }))(props.center);
  const accuracy = 200;

  let heading = 5;
  const rotate = !(typeof heading === 'number' && heading >= 0)
    ? null
    : false
    ? '0deg'
    : `${heading}deg`;

  return (
    <>
      <Marker anchor={ANCHOR} style={styles.mapMarker} coordinate={coordinate}>
        <View style={styles.container}>
          <View style={styles.markerHalo} />
          {rotate && (
            <View style={[styles.headingHalo, {transform: [{rotate}]}]}>
              <View style={styles.headingPointerHalo} />
            </View>
          )}
          {rotate && (
            <View style={[styles.heading, {transform: [{rotate}]}]}>
              <View style={styles.headingPointer} />
            </View>
          )}
          <View style={styles.marker}>
            <Text style={styles.markerText}>{props.enableHack && rotate}</Text>
          </View>
        </View>
        {props.children}
      </Marker>
      {accuracy && props.isCircle && (
        <Circle
          center={coordinate}
          radius={accuracy}
          fillColor={CIRCLE_FILL_COLOR}
          strokeWidth={CIRCLE_STROKE_WIDTH}
          zIndex={20}
        />
      )}
    </>
  );
};

export default MyLocationMapMarker;

MyLocationMapMarker.defaultProps = defaultProps;

// Styling of marker
const SIZE = 15;
const HALO_RADIUS = 8;
const ARROW_SIZE = 18;
const ARROW_DISTANCE = 19;
const ARROW_HALO_SIZE_REDUCTION = 5;
const ARROW_HALO_DISTANCE = ARROW_HALO_SIZE_REDUCTION * 2;
const HALO_SIZE = SIZE + HALO_RADIUS;
const HEADING_BOX_SIZE = HALO_SIZE + ARROW_SIZE + ARROW_DISTANCE;

const CIRCLE_FILL_COLOR = 'rgba(0, 0, 255, 0.08)';
const CIRCLE_STROKE_WIDTH = 0.1;

const styles = StyleSheet.create({
  mapMarker: {
    zIndex: 1000,
  },
  // The container is necessary to protect the markerHalo shadow from clipping
  container: {
    width: HEADING_BOX_SIZE,
    height: HEADING_BOX_SIZE,
  },
  heading: {
    position: 'absolute',
    top: ARROW_HALO_DISTANCE / 2,
    left: ARROW_HALO_DISTANCE / 2,
    width: HEADING_BOX_SIZE - ARROW_HALO_DISTANCE,
    height: HEADING_BOX_SIZE - ARROW_HALO_DISTANCE,
    alignItems: 'center',
  },
  headingPointer: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderTopWidth: 0,
    borderRightWidth: (ARROW_SIZE - ARROW_HALO_SIZE_REDUCTION) * 0.75,
    borderBottomWidth: ARROW_SIZE - ARROW_HALO_SIZE_REDUCTION,
    borderLeftWidth: (ARROW_SIZE - ARROW_HALO_SIZE_REDUCTION) * 0.75,
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: colorOfmyLocationMapMarker,
    borderLeftColor: 'transparent',
  },
  headingHalo: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: HEADING_BOX_SIZE,
    height: HEADING_BOX_SIZE,
    alignItems: 'center',
  },
  headingPointerHalo: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderTopWidth: 0,
    borderRightWidth: ARROW_SIZE * 0.75,
    borderBottomWidth: ARROW_SIZE,
    borderLeftWidth: ARROW_SIZE * 0.75,
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'white',
    borderLeftColor: 'transparent',
  },
  markerHalo: {
    position: 'absolute',
    backgroundColor: 'white',
    top: 0,
    left: 0,
    width: HALO_SIZE,
    height: HALO_SIZE,
    borderRadius: Math.ceil(HALO_SIZE / 2),
    margin: (HEADING_BOX_SIZE - HALO_SIZE) / 2,
    shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowRadius: 2,
    shadowOffset: {
      height: 0,
      width: 0,
    },
  },
  marker: {
    justifyContent: 'center',
    backgroundColor: colorOfmyLocationMapMarker,
    width: SIZE,
    height: SIZE,
    borderRadius: Math.ceil(SIZE / 2),
    margin: (HEADING_BOX_SIZE - SIZE) / 2,
  },
  markerText: {width: 0, height: 0},
});
