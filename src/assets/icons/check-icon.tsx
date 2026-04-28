import Svg, { Path } from 'react-native-svg';
import { Icon } from '../entities/icon';

const CheckIcon = ({ size = 24, ...props }: Icon) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={size} height={size} {...props}>
    <Path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m4 12 4.95 4.95L19.557 6.343"
    />
  </Svg>
);

export default CheckIcon;
