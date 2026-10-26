/**
 * CANONICAL RE-EXPORT: Single Source of Truth
 * apps/mobile/app/(tabs)/today.tsx delegates directly to apps/mobile/src/screens/TodayScreen.tsx
 * Eliminates Dual File Taxonomy confusion between Expo Router file-tree and src/screens.
 */
import { TodayScreen } from '../../src/screens/TodayScreen';

export default TodayScreen;
