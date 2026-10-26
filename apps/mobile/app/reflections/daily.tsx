/**
 * CANONICAL RE-EXPORT: Single Source of Truth
 * apps/mobile/app/reflections/daily.tsx delegates directly to apps/mobile/src/screens/ReflectionScreen.tsx
 * Eliminates Dual File Taxonomy confusion between Expo Router file-tree and src/screens.
 */
import ReflectionScreen from '../../src/screens/ReflectionScreen';

export default ReflectionScreen;
