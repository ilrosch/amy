import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const AmyLogo = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={58} height={112} fill="none" {...props}>
    <Path
      fill="#fff"
      d="M31.672 29.078 17.805 74H3.078l20.899-56.875h9.336zM43.156 74 29.25 29.078l-1.797-11.953h9.453L57.922 74zm-.547-21.21v10.585H13.43V52.789zM6.425 76.695h5.167l5.872 18.302 5.871-18.302h5.167L19.56 103h-4.192zm-3.143 0h5.347l.994 20.162V103H3.282zm23.016 0h5.366V103h-6.36v-6.143zm14.86 0L46 88.113l4.86-11.418h6.829l-8.455 16.856V103h-6.45v-9.449l-8.473-16.856z"
    />
  </Svg>
);
export default AmyLogo;
