import Main from './src/Main'
import { YellowBox } from 'react-native'

/**
 * reference: https://github.com/facebook/metro/issues/287
 * currently (as of 2018.12.15), Require cycle warning is not an opt in for node_modules
 * so in order to fix that, you should ignore them
 */
YellowBox.ignoreWarnings(['Require cycle:', 'Remote debugger'])

export default Main
