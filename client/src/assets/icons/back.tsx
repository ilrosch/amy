import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const BackIcon = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} fill="none" {...props}>
    <Path
      fill="currentColor"
      d="M23.75 13.75h-12.5l4.113-4.112a1.25 1.25 0 0 0 0-1.775 1.25 1.25 0 0 0-1.763 0l-5.362 5.375A2.5 2.5 0 0 0 7.5 15a2.5 2.5 0 0 0 .738 1.75l5.362 5.375a1.25 1.25 0 1 0 1.763-1.775l-4.113-4.1h12.5a1.25 1.25 0 0 0 0-2.5"
    />
  </Svg>
);
export default BackIcon;
