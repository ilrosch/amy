import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const SendIcon = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" {...props}>
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M12 18.582V12.5m.798 6.254 3.012 1.008c1.641.55 2.461.824 2.967.627a1.5 1.5 0 0 0 .9-.992c.147-.523-.207-1.313-.915-2.892L14.22 6.367c-.692-1.544-1.038-2.316-1.52-2.555a1.5 1.5 0 0 0-1.33-.002c-.482.237-.83 1.008-1.527 2.55L5.256 16.508c-.713 1.578-1.07 2.367-.924 2.89a1.5 1.5 0 0 0 .897.996c.505.199 1.327-.074 2.97-.62l3.08-1.022c.282-.093.423-.14.567-.159q.193-.024.385 0c.144.02.285.067.567.161"
    />
  </Svg>
);

export default SendIcon;
