/**
 * Created by rozer on 5/3/2018.
 */
import Reactotron, { asyncStorage } from 'reactotron-react-native'

Reactotron
    .configure()
    .use(asyncStorage()) // <--- here we go!
    .connect()
