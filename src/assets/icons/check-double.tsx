import Svg, { SvgProps, Path } from 'react-native-svg';

const CheckDoubleIcon = (props: SvgProps) => (
  <Svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    viewBox="0 0 24 24"
  >
    <Path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M22 7 11.5 17.5l-4-4m-1.5 4-4-4M16.5 7l-5 5"
    />
  </Svg>
);
export default CheckDoubleIcon;
