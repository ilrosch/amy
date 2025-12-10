import * as React from 'react';
import Svg, { SvgProps, G, Path, Defs, ClipPath } from 'react-native-svg';

const ChatIcon = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" {...props}>
    <G fill="currentColor" clipPath="url(#a)">
      <Path d="M24 11.247A12.011 12.011 0 1 0 12.017 24H19a5.005 5.005 0 0 0 5-5zM22 19a3 3 0 0 1-3 3h-6.983a10.04 10.04 0 0 1-9.56-6.982 9.9 9.9 0 0 1-.392-4.175 10.04 10.04 0 0 1 8.656-8.76Q11.368 2 12.02 2a9.92 9.92 0 0 1 6.38 2.3 10.04 10.04 0 0 1 3.6 7.042z" />
      <Path d="M8 9h4a1 1 0 1 0 0-2H8a1 1 0 1 0 0 2m8 2H8a1 1 0 0 0 0 2h8a1 1 0 0 0 0-2m0 4H8a1 1 0 0 0 0 2h8a1 1 0 1 0 0-2" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h24v24H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default ChatIcon;
