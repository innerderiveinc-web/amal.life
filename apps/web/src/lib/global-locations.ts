/**
 * AMAL OS — Global Location Registry
 * 
 * Comprehensive database of global cities with verified coordinates
 * (Latitude & Longitude) for deterministic astronomical prayer times
 * and precise Qibla azimuth calculation.
 */

export interface GlobalCity {
  name: string;
  country: string;
  region: string;
  lat: number;
  lon: number;
  defaultMethod?: 'KARACHI' | 'MWL' | 'UMM_AL_QURA' | 'EGYPTIAN' | 'ISNA' | 'TEHRAN';
}

export const GLOBAL_CITIES: GlobalCity[] = [
  // ==========================================
  // INDIA (Major Cities & Islamic Centers)
  // ==========================================
  { name: 'Delhi / New Delhi', country: 'India', region: 'South Asia', lat: 28.6139, lon: 77.2090, defaultMethod: 'KARACHI' },
  { name: 'Mumbai (Bombay)', country: 'India', region: 'South Asia', lat: 19.0760, lon: 72.8777, defaultMethod: 'KARACHI' },
  { name: 'Hyderabad (Deccan)', country: 'India', region: 'South Asia', lat: 17.3850, lon: 78.4867, defaultMethod: 'KARACHI' },
  { name: 'Lucknow', country: 'India', region: 'South Asia', lat: 26.8467, lon: 80.9462, defaultMethod: 'KARACHI' },
  { name: 'Kolkata (Calcutta)', country: 'India', region: 'South Asia', lat: 22.5726, lon: 88.3639, defaultMethod: 'KARACHI' },
  { name: 'Bengaluru (Bangalore)', country: 'India', region: 'South Asia', lat: 12.9716, lon: 77.5946, defaultMethod: 'KARACHI' },
  { name: 'Chennai (Madras)', country: 'India', region: 'South Asia', lat: 13.0827, lon: 80.2707, defaultMethod: 'KARACHI' },
  { name: 'Ahmedabad', country: 'India', region: 'South Asia', lat: 23.0225, lon: 72.5714, defaultMethod: 'KARACHI' },
  { name: 'Srinagar (Kashmir)', country: 'India', region: 'South Asia', lat: 34.0837, lon: 74.7973, defaultMethod: 'KARACHI' },
  { name: 'Patna', country: 'India', region: 'South Asia', lat: 25.5941, lon: 85.1376, defaultMethod: 'KARACHI' },
  { name: 'Bhopal', country: 'India', region: 'South Asia', lat: 23.2599, lon: 77.4126, defaultMethod: 'KARACHI' },
  { name: 'Aligarh', country: 'India', region: 'South Asia', lat: 27.8974, lon: 78.0880, defaultMethod: 'KARACHI' },
  { name: 'Deoband', country: 'India', region: 'South Asia', lat: 29.6922, lon: 77.6766, defaultMethod: 'KARACHI' },
  { name: 'Bareilly', country: 'India', region: 'South Asia', lat: 28.3670, lon: 79.4304, defaultMethod: 'KARACHI' },
  { name: 'Moradabad', country: 'India', region: 'South Asia', lat: 28.8353, lon: 78.7747, defaultMethod: 'KARACHI' },
  { name: 'Meerut', country: 'India', region: 'South Asia', lat: 28.9845, lon: 77.7064, defaultMethod: 'KARACHI' },
  { name: 'Agra', country: 'India', region: 'South Asia', lat: 27.1767, lon: 78.0081, defaultMethod: 'KARACHI' },
  { name: 'Varanasi', country: 'India', region: 'South Asia', lat: 25.3176, lon: 82.9739, defaultMethod: 'KARACHI' },
  { name: 'Jaipur', country: 'India', region: 'South Asia', lat: 26.9124, lon: 75.7873, defaultMethod: 'KARACHI' },
  { name: 'Surat', country: 'India', region: 'South Asia', lat: 21.1702, lon: 72.8311, defaultMethod: 'KARACHI' },
  { name: 'Kanpur', country: 'India', region: 'South Asia', lat: 26.4499, lon: 80.3319, defaultMethod: 'KARACHI' },
  { name: 'Nagpur', country: 'India', region: 'South Asia', lat: 21.1458, lon: 79.0882, defaultMethod: 'KARACHI' },
  { name: 'Aurangabad (Chhatrapati Sambhajinagar)', country: 'India', region: 'South Asia', lat: 19.8762, lon: 75.3433, defaultMethod: 'KARACHI' },
  { name: 'Kozhikode (Calicut)', country: 'India', region: 'South Asia', lat: 11.2588, lon: 75.7804, defaultMethod: 'KARACHI' },
  { name: 'Malappuram', country: 'India', region: 'South Asia', lat: 11.0732, lon: 76.0740, defaultMethod: 'KARACHI' },
  { name: 'Kochi (Cochin)', country: 'India', region: 'South Asia', lat: 9.9312, lon: 76.2673, defaultMethod: 'KARACHI' },

  // ==========================================
  // PAKISTAN
  // ==========================================
  { name: 'Karachi', country: 'Pakistan', region: 'South Asia', lat: 24.8607, lon: 67.0011, defaultMethod: 'KARACHI' },
  { name: 'Lahore', country: 'Pakistan', region: 'South Asia', lat: 31.5204, lon: 74.3587, defaultMethod: 'KARACHI' },
  { name: 'Islamabad / Rawalpindi', country: 'Pakistan', region: 'South Asia', lat: 33.6844, lon: 73.0479, defaultMethod: 'KARACHI' },
  { name: 'Faisalabad', country: 'Pakistan', region: 'South Asia', lat: 31.4504, lon: 73.1350, defaultMethod: 'KARACHI' },
  { name: 'Multan', country: 'Pakistan', region: 'South Asia', lat: 30.1575, lon: 71.5249, defaultMethod: 'KARACHI' },
  { name: 'Peshawar', country: 'Pakistan', region: 'South Asia', lat: 34.0151, lon: 71.5249, defaultMethod: 'KARACHI' },
  { name: 'Quetta', country: 'Pakistan', region: 'South Asia', lat: 30.1798, lon: 66.9750, defaultMethod: 'KARACHI' },
  { name: 'Gujranwala', country: 'Pakistan', region: 'South Asia', lat: 32.1877, lon: 74.1945, defaultMethod: 'KARACHI' },
  { name: 'Sialkot', country: 'Pakistan', region: 'South Asia', lat: 32.4945, lon: 74.5229, defaultMethod: 'KARACHI' },

  // ==========================================
  // BANGLADESH
  // ==========================================
  { name: 'Dhaka', country: 'Bangladesh', region: 'South Asia', lat: 23.8103, lon: 90.4125, defaultMethod: 'KARACHI' },
  { name: 'Chittagong', country: 'Bangladesh', region: 'South Asia', lat: 22.3569, lon: 91.7832, defaultMethod: 'KARACHI' },
  { name: 'Sylhet', country: 'Bangladesh', region: 'South Asia', lat: 24.8949, lon: 91.8687, defaultMethod: 'KARACHI' },

  // ==========================================
  // HARAMAYN & ARABIAN GULF
  // ==========================================
  { name: 'Makkah al-Mukarramah', country: 'Saudi Arabia', region: 'Middle East', lat: 21.4225, lon: 39.8262, defaultMethod: 'UMM_AL_QURA' },
  { name: 'Madinah al-Munawwarah', country: 'Saudi Arabia', region: 'Middle East', lat: 24.4672, lon: 39.6111, defaultMethod: 'UMM_AL_QURA' },
  { name: 'Riyadh', country: 'Saudi Arabia', region: 'Middle East', lat: 24.7136, lon: 46.6753, defaultMethod: 'UMM_AL_QURA' },
  { name: 'Jeddah', country: 'Saudi Arabia', region: 'Middle East', lat: 21.5433, lon: 39.1728, defaultMethod: 'UMM_AL_QURA' },
  { name: 'Dammam / Khobar', country: 'Saudi Arabia', region: 'Middle East', lat: 26.4207, lon: 50.0888, defaultMethod: 'UMM_AL_QURA' },
  { name: 'Dubai', country: 'United Arab Emirates', region: 'Middle East', lat: 25.2048, lon: 55.2708, defaultMethod: 'UMM_AL_QURA' },
  { name: 'Abu Dhabi', country: 'United Arab Emirates', region: 'Middle East', lat: 24.4539, lon: 54.3773, defaultMethod: 'UMM_AL_QURA' },
  { name: 'Sharjah', country: 'United Arab Emirates', region: 'Middle East', lat: 25.3463, lon: 55.4209, defaultMethod: 'UMM_AL_QURA' },
  { name: 'Doha', country: 'Qatar', region: 'Middle East', lat: 25.2854, lon: 51.5310, defaultMethod: 'UMM_AL_QURA' },
  { name: 'Kuwait City', country: 'Kuwait', region: 'Middle East', lat: 29.3759, lon: 47.9774, defaultMethod: 'UMM_AL_QURA' },
  { name: 'Manama', country: 'Bahrain', region: 'Middle East', lat: 26.2285, lon: 50.5860, defaultMethod: 'UMM_AL_QURA' },
  { name: 'Muscat', country: 'Oman', region: 'Middle East', lat: 23.5880, lon: 58.3829, defaultMethod: 'UMM_AL_QURA' },

  // ==========================================
  // LEVANT, IRAQ, YEMEN & IRAN
  // ==========================================
  { name: 'Jerusalem (Al-Quds)', country: 'Palestine', region: 'Middle East', lat: 31.7683, lon: 35.2137, defaultMethod: 'MWL' },
  { name: 'Amman', country: 'Jordan', region: 'Middle East', lat: 31.9454, lon: 35.9284, defaultMethod: 'MWL' },
  { name: 'Beirut', country: 'Lebanon', region: 'Middle East', lat: 33.8938, lon: 35.5018, defaultMethod: 'MWL' },
  { name: 'Damascus', country: 'Syria', region: 'Middle East', lat: 33.5138, lon: 36.2765, defaultMethod: 'MWL' },
  { name: 'Baghdad', country: 'Iraq', region: 'Middle East', lat: 33.3152, lon: 44.3661, defaultMethod: 'MWL' },
  { name: 'Basra', country: 'Iraq', region: 'Middle East', lat: 30.5081, lon: 47.7835, defaultMethod: 'MWL' },
  { name: 'Erbil', country: 'Iraq', region: 'Middle East', lat: 36.1901, lon: 44.0091, defaultMethod: 'MWL' },
  { name: 'Sana\'a', country: 'Yemen', region: 'Middle East', lat: 15.3694, lon: 44.1910, defaultMethod: 'UMM_AL_QURA' },
  { name: 'Tehran', country: 'Iran', region: 'Middle East', lat: 35.6892, lon: 51.3890, defaultMethod: 'TEHRAN' },

  // ==========================================
  // NORTH AFRICA & AFRICA
  // ==========================================
  { name: 'Cairo', country: 'Egypt', region: 'North Africa', lat: 30.0444, lon: 31.2357, defaultMethod: 'EGYPTIAN' },
  { name: 'Alexandria', country: 'Egypt', region: 'North Africa', lat: 31.2001, lon: 29.9187, defaultMethod: 'EGYPTIAN' },
  { name: 'Casablanca', country: 'Morocco', region: 'North Africa', lat: 33.5731, lon: -7.5898, defaultMethod: 'MWL' },
  { name: 'Rabat', country: 'Morocco', region: 'North Africa', lat: 34.0209, lon: -6.8416, defaultMethod: 'MWL' },
  { name: 'Fes', country: 'Morocco', region: 'North Africa', lat: 34.0181, lon: -5.0078, defaultMethod: 'MWL' },
  { name: 'Marrakech', country: 'Morocco', region: 'North Africa', lat: 31.6295, lon: -7.9811, defaultMethod: 'MWL' },
  { name: 'Tunis', country: 'Tunisia', region: 'North Africa', lat: 36.8065, lon: 10.1815, defaultMethod: 'MWL' },
  { name: 'Algiers', country: 'Algeria', region: 'North Africa', lat: 36.7538, lon: 3.0588, defaultMethod: 'MWL' },
  { name: 'Tripoli', country: 'Libya', region: 'North Africa', lat: 32.8872, lon: 13.1913, defaultMethod: 'MWL' },
  { name: 'Khartoum', country: 'Sudan', region: 'North Africa', lat: 15.5007, lon: 32.5599, defaultMethod: 'EGYPTIAN' },
  { name: 'Mogadishu', country: 'Somalia', region: 'East Africa', lat: 2.0469, lon: 45.3182, defaultMethod: 'MWL' },
  { name: 'Nairobi', country: 'Kenya', region: 'East Africa', lat: -1.2921, lon: 36.8219, defaultMethod: 'MWL' },
  { name: 'Johannesburg', country: 'South Africa', region: 'Southern Africa', lat: -26.2041, lon: 28.0473, defaultMethod: 'MWL' },
  { name: 'Cape Town', country: 'South Africa', region: 'Southern Africa', lat: -33.9249, lon: 18.4241, defaultMethod: 'MWL' },
  { name: 'Durban', country: 'South Africa', region: 'Southern Africa', lat: -29.8587, lon: 31.0218, defaultMethod: 'MWL' },
  { name: 'Lagos', country: 'Nigeria', region: 'West Africa', lat: 6.5244, lon: 3.3792, defaultMethod: 'MWL' },
  { name: 'Kano', country: 'Nigeria', region: 'West Africa', lat: 12.0022, lon: 8.5920, defaultMethod: 'MWL' },
  { name: 'Dakar', country: 'Senegal', region: 'West Africa', lat: 14.7167, lon: -17.4677, defaultMethod: 'MWL' },

  // ==========================================
  // TURKEY, BALKANS & CENTRAL ASIA
  // ==========================================
  { name: 'Istanbul', country: 'Turkey', region: 'Eurasia', lat: 41.0082, lon: 28.9784, defaultMethod: 'MWL' },
  { name: 'Ankara', country: 'Turkey', region: 'Eurasia', lat: 39.9334, lon: 32.8597, defaultMethod: 'MWL' },
  { name: 'Konya', country: 'Turkey', region: 'Eurasia', lat: 37.8746, lon: 32.4932, defaultMethod: 'MWL' },
  { name: 'Bursa', country: 'Turkey', region: 'Eurasia', lat: 40.1885, lon: 29.0610, defaultMethod: 'MWL' },
  { name: 'Sarajevo', country: 'Bosnia and Herzegovina', region: 'Europe', lat: 43.8563, lon: 18.4131, defaultMethod: 'MWL' },
  { name: 'Pristina', country: 'Kosovo', region: 'Europe', lat: 42.6629, lon: 21.1655, defaultMethod: 'MWL' },
  { name: 'Tirana', country: 'Albania', region: 'Europe', lat: 41.3275, lon: 19.8187, defaultMethod: 'MWL' },
  { name: 'Baku', country: 'Azerbaijan', region: 'Central Asia', lat: 40.4093, lon: 49.8671, defaultMethod: 'MWL' },
  { name: 'Tashkent', country: 'Uzbekistan', region: 'Central Asia', lat: 41.2995, lon: 69.2401, defaultMethod: 'KARACHI' },
  { name: 'Samarkand', country: 'Uzbekistan', region: 'Central Asia', lat: 39.6542, lon: 66.9597, defaultMethod: 'KARACHI' },
  { name: 'Bukhara', country: 'Uzbekistan', region: 'Central Asia', lat: 39.7747, lon: 64.4286, defaultMethod: 'KARACHI' },
  { name: 'Almaty', country: 'Kazakhstan', region: 'Central Asia', lat: 43.2220, lon: 76.8512, defaultMethod: 'KARACHI' },
  { name: 'Bishkek', country: 'Kyrgyzstan', region: 'Central Asia', lat: 42.8746, lon: 74.5698, defaultMethod: 'KARACHI' },
  { name: 'Dushanbe', country: 'Tajikistan', region: 'Central Asia', lat: 38.5598, lon: 68.7870, defaultMethod: 'KARACHI' },
  { name: 'Kabul', country: 'Afghanistan', region: 'Central Asia', lat: 34.5553, lon: 69.2075, defaultMethod: 'KARACHI' },

  // ==========================================
  // SOUTHEAST ASIA & EAST ASIA
  // ==========================================
  { name: 'Jakarta', country: 'Indonesia', region: 'Southeast Asia', lat: -6.2088, lon: 106.8456, defaultMethod: 'MWL' },
  { name: 'Surabaya', country: 'Indonesia', region: 'Southeast Asia', lat: -7.2575, lon: 112.7521, defaultMethod: 'MWL' },
  { name: 'Bandung', country: 'Indonesia', region: 'Southeast Asia', lat: -6.9175, lon: 107.6191, defaultMethod: 'MWL' },
  { name: 'Medan', country: 'Indonesia', region: 'Southeast Asia', lat: 3.5952, lon: 98.6722, defaultMethod: 'MWL' },
  { name: 'Kuala Lumpur', country: 'Malaysia', region: 'Southeast Asia', lat: 3.1390, lon: 101.6869, defaultMethod: 'MWL' },
  { name: 'Penang (George Town)', country: 'Malaysia', region: 'Southeast Asia', lat: 5.4141, lon: 100.3288, defaultMethod: 'MWL' },
  { name: 'Singapore', country: 'Singapore', region: 'Southeast Asia', lat: 1.3521, lon: 103.8198, defaultMethod: 'MWL' },
  { name: 'Bandar Seri Begawan', country: 'Brunei', region: 'Southeast Asia', lat: 4.9031, lon: 114.9398, defaultMethod: 'MWL' },
  { name: 'Bangkok', country: 'Thailand', region: 'Southeast Asia', lat: 13.7563, lon: 100.5018, defaultMethod: 'MWL' },
  { name: 'Tokyo', country: 'Japan', region: 'East Asia', lat: 35.6762, lon: 139.6503, defaultMethod: 'MWL' },
  { name: 'Seoul', country: 'South Korea', region: 'East Asia', lat: 37.5665, lon: 126.9780, defaultMethod: 'MWL' },
  { name: 'Beijing', country: 'China', region: 'East Asia', lat: 39.9042, lon: 116.4074, defaultMethod: 'MWL' },

  // ==========================================
  // EUROPE
  // ==========================================
  { name: 'London', country: 'United Kingdom', region: 'Europe', lat: 51.5074, lon: -0.1278, defaultMethod: 'MWL' },
  { name: 'Birmingham', country: 'United Kingdom', region: 'Europe', lat: 52.4862, lon: -1.8904, defaultMethod: 'MWL' },
  { name: 'Manchester', country: 'United Kingdom', region: 'Europe', lat: 53.4808, lon: -2.2426, defaultMethod: 'MWL' },
  { name: 'Bradford', country: 'United Kingdom', region: 'Europe', lat: 53.7960, lon: -1.7594, defaultMethod: 'MWL' },
  { name: 'Glasgow', country: 'United Kingdom', region: 'Europe', lat: 55.8642, lon: -4.2518, defaultMethod: 'MWL' },
  { name: 'Paris', country: 'France', region: 'Europe', lat: 48.8566, lon: 2.3522, defaultMethod: 'MWL' },
  { name: 'Marseille', country: 'France', region: 'Europe', lat: 43.2965, lon: 5.3698, defaultMethod: 'MWL' },
  { name: 'Berlin', country: 'Germany', region: 'Europe', lat: 52.5200, lon: 13.4050, defaultMethod: 'MWL' },
  { name: 'Frankfurt', country: 'Germany', region: 'Europe', lat: 50.1109, lon: 8.6821, defaultMethod: 'MWL' },
  { name: 'Munich', country: 'Germany', region: 'Europe', lat: 48.1351, lon: 11.5820, defaultMethod: 'MWL' },
  { name: 'Cologne', country: 'Germany', region: 'Europe', lat: 50.9375, lon: 6.9603, defaultMethod: 'MWL' },
  { name: 'Amsterdam', country: 'Netherlands', region: 'Europe', lat: 52.3676, lon: 4.9041, defaultMethod: 'MWL' },
  { name: 'Rotterdam', country: 'Netherlands', region: 'Europe', lat: 51.9244, lon: 4.4777, defaultMethod: 'MWL' },
  { name: 'The Hague', country: 'Netherlands', region: 'Europe', lat: 52.0705, lon: 4.3007, defaultMethod: 'MWL' },
  { name: 'Brussels', country: 'Belgium', region: 'Europe', lat: 50.8503, lon: 4.3517, defaultMethod: 'MWL' },
  { name: 'Vienna', country: 'Austria', region: 'Europe', lat: 48.2082, lon: 16.3738, defaultMethod: 'MWL' },
  { name: 'Zurich', country: 'Switzerland', region: 'Europe', lat: 47.3769, lon: 8.5417, defaultMethod: 'MWL' },
  { name: 'Geneva', country: 'Switzerland', region: 'Europe', lat: 46.2044, lon: 6.1432, defaultMethod: 'MWL' },
  { name: 'Rome', country: 'Italy', region: 'Europe', lat: 41.9028, lon: 12.4964, defaultMethod: 'MWL' },
  { name: 'Milan', country: 'Italy', region: 'Europe', lat: 45.4642, lon: 9.1900, defaultMethod: 'MWL' },
  { name: 'Madrid', country: 'Spain', region: 'Europe', lat: 40.4168, lon: -3.7038, defaultMethod: 'MWL' },
  { name: 'Barcelona', country: 'Spain', region: 'Europe', lat: 41.3851, lon: 2.1734, defaultMethod: 'MWL' },
  { name: 'Stockholm', country: 'Sweden', region: 'Europe', lat: 59.3293, lon: 18.0686, defaultMethod: 'MWL' },
  { name: 'Oslo', country: 'Norway', region: 'Europe', lat: 59.9139, lon: 10.7522, defaultMethod: 'MWL' },
  { name: 'Copenhagen', country: 'Denmark', region: 'Europe', lat: 55.6761, lon: 12.5683, defaultMethod: 'MWL' },
  { name: 'Moscow', country: 'Russia', region: 'Europe', lat: 55.7558, lon: 37.6173, defaultMethod: 'MWL' },

  // ==========================================
  // NORTH AMERICA & SOUTH AMERICA
  // ==========================================
  { name: 'New York City', country: 'United States', region: 'North America', lat: 40.7128, lon: -74.0060, defaultMethod: 'ISNA' },
  { name: 'Chicago', country: 'United States', region: 'North America', lat: 41.8781, lon: -87.6298, defaultMethod: 'ISNA' },
  { name: 'Houston', country: 'United States', region: 'North America', lat: 29.7604, lon: -95.3698, defaultMethod: 'ISNA' },
  { name: 'Los Angeles', country: 'United States', region: 'North America', lat: 34.0522, lon: -118.2437, defaultMethod: 'ISNA' },
  { name: 'Dallas / Fort Worth', country: 'United States', region: 'North America', lat: 32.7767, lon: -96.7970, defaultMethod: 'ISNA' },
  { name: 'San Francisco / Bay Area', country: 'United States', region: 'North America', lat: 37.7749, lon: -122.4194, defaultMethod: 'ISNA' },
  { name: 'Washington D.C.', country: 'United States', region: 'North America', lat: 38.9072, lon: -77.0369, defaultMethod: 'ISNA' },
  { name: 'Detroit / Dearborn', country: 'United States', region: 'North America', lat: 42.3314, lon: -83.0458, defaultMethod: 'ISNA' },
  { name: 'Toronto', country: 'Canada', region: 'North America', lat: 43.6532, lon: -79.3832, defaultMethod: 'ISNA' },
  { name: 'Montreal', country: 'Canada', region: 'North America', lat: 45.5017, lon: -73.5673, defaultMethod: 'ISNA' },
  { name: 'Vancouver', country: 'Canada', region: 'North America', lat: 49.2827, lon: -123.1207, defaultMethod: 'ISNA' },
  { name: 'Calgary', country: 'Canada', region: 'North America', lat: 51.0447, lon: -114.0719, defaultMethod: 'ISNA' },

  // ==========================================
  // OCEANIA (AUSTRALIA & NEW ZEALAND)
  // ==========================================
  { name: 'Sydney', country: 'Australia', region: 'Oceania', lat: -33.8688, lon: 151.2093, defaultMethod: 'MWL' },
  { name: 'Melbourne', country: 'Australia', region: 'Oceania', lat: -37.8136, lon: 144.9631, defaultMethod: 'MWL' },
  { name: 'Perth', country: 'Australia', region: 'Oceania', lat: -31.9505, lon: 115.8605, defaultMethod: 'MWL' },
  { name: 'Brisbane', country: 'Australia', region: 'Oceania', lat: -27.4698, lon: 153.0251, defaultMethod: 'MWL' },
  { name: 'Auckland', country: 'New Zealand', region: 'Oceania', lat: -36.8485, lon: 174.7633, defaultMethod: 'MWL' },
];

/**
 * Filter global cities with multi-field search (city name, country, region)
 */
export function searchGlobalCities(query: string): GlobalCity[] {
  if (!query || !query.trim()) return GLOBAL_CITIES;
  const q = query.toLowerCase().trim();
  return GLOBAL_CITIES.filter(
    c => c.name.toLowerCase().includes(q) ||
         c.country.toLowerCase().includes(q) ||
         c.region.toLowerCase().includes(q)
  );
}
