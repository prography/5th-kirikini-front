import { Platform } from 'react-native';

export const localhost = Platform.OS === 'ios' ? '127.0.0.1' : '10.0.2.2'
