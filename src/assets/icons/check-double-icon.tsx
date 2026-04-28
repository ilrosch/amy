import Svg, { Path } from 'react-native-svg';
import { Icon } from '../entities/icon';

const CheckDoubleIcon = ({ size = 24, ...props }: Icon) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={size} height={size} {...props}>
    <Path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m7 12 4.95 4.95L22.557 6.343M2.05 12.05 7 17M17.606 6.394l-5.303 5.303"
    />
  </Svg>
);

export default CheckDoubleIcon;
