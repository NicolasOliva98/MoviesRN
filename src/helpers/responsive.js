import { Dimensions } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
const HEIGHT = Dimensions.get('window').height


const rv = (value) => {
  if (HEIGHT >= 0 && HEIGHT < 600) {
    return value;
  }
  if (HEIGHT > 600 && HEIGHT < 800) {
    return value - 3;
  }
  if (HEIGHT > 800 && HEIGHT < 900) {
    return value - 7;
  }
  if (HEIGHT > 900) {
    return value - 11;
  }
}

export {rv,wp,hp}