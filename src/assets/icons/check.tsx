import Svg, { SvgProps, Path } from 'react-native-svg';

const CheckIcon = (props: SvgProps) => (
  <Svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    viewBox="-2.4 -2.4 28.8 28.8"
  >
    <Path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2.5}
      d="M19.5 7 9 17.5l-4-4"
    />
  </Svg>
);
export default CheckIcon;
