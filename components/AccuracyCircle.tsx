import React from 'react';
import {Circle} from 'react-native-maps';

type DefaultProps = {
  center: any;
  centerMap?: boolean;
  rotateMapOnHeading?: boolean;
  enableHack?: boolean;
};

const defaultProps = {
  centerMap: true,
  rotateMapOnHeading: false,
  enableHack: false,
};

const MyAccuracyCircle: React.FC<DefaultProps> = props => {
  if (!props.center) {
    return null;
  }

  const coordinate = (({latitude, longitude}) => ({
    latitude,
    longitude,
  }))(props.center);
  const accuracy = 100;

  return (
    <>
      {accuracy && true && (
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

export default MyAccuracyCircle;

MyAccuracyCircle.defaultProps = defaultProps;

const CIRCLE_FILL_COLOR = 'rgba(0, 0, 255, 0.08)';
const CIRCLE_STROKE_WIDTH = 0.1;
