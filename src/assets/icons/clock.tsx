import Svg, { G, Path, Defs, ClipPath, SvgProps } from 'react-native-svg';

const ClockIcon = ({ ...props }: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={16} height={16} {...props}>
    <G clipPath="url(#a)">
      <Path
        fill="currentColor"
        d="M24 12a12 12 0 0 1-24 0 1 1 0 1 1 2 0A10 10 0 1 0 12 2a1 1 0 1 1 0-2 12.013 12.013 0 0 1 12 12Zm-13.723-1H8a1 1 0 0 0 0 2h2.277A1.994 1.994 0 1 0 13 10.277V7a1 1 0 0 0-2 0v3.277a2 2 0 0 0-.723.723Zm-8.45-2.216a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm2.394-3.577a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm3.558-2.366a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h24v24H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);

export default ClockIcon;
