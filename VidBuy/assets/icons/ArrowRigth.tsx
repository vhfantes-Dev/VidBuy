import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const SvgIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24">
    <Path
      fill="#fff"
      d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2m0 15v-4H7v-2h5V7l5 5z"
    />
  </Svg>
);

export default SvgIcon;
