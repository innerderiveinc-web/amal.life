/**
 * CANONICAL RE-EXPORT: Single Source of Truth
 * apps/mobile/app/family/index.tsx delegates directly to apps/mobile/src/screens/FamilyScreen.tsx
 * Eliminates Dual File Taxonomy confusion between Expo Router file-tree and src/screens.
 *
 * Invariant: [ADULT REFLECTION ISOLATION]
 * Individual journals, Muhasabah reflections, and personal Fiqh queries are strictly isolated
 * from all household and family circle members without exception.
 */
import FamilyScreen from '../../src/screens/FamilyScreen';

export default FamilyScreen;
