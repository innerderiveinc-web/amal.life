/**
 * CANONICAL RE-EXPORT: Single Source of Truth
 * apps/mobile/app/journeys/[id].tsx delegates directly to apps/mobile/src/screens/JourneyScreen.tsx
 * Eliminates Dual File Taxonomy confusion between Expo Router file-tree and src/screens.
 */
import JourneyScreen from '../../src/screens/JourneyScreen';

export default JourneyScreen;
