import * as React from 'react';
import Svg, { SvgProps, G, Path, Defs, ClipPath } from 'react-native-svg';

const AddUserIcon = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" {...props}>
    <G fill="currentColor" clipPath="url(#a)">
      <Path d="M23 11h-2V9a1 1 0 0 0-2 0v2h-2a1 1 0 1 0 0 2h2v2a1 1 0 1 0 2 0v-2h2a1 1 0 0 0 0-2M9 12A6 6 0 1 0 9 0a6 6 0 0 0 0 12M9 2a4 4 0 1 1 0 8 4 4 0 0 1 0-8m0 12a9.01 9.01 0 0 0-9 9 1 1 0 1 0 2 0 7 7 0 0 1 14 0 1 1 0 0 0 2 0 9.01 9.01 0 0 0-9-9" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h24v24H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);

export default AddUserIcon;
