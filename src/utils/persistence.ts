import { AmbassadorProfile } from "@/data/ambassador";

const STORAGE_KEY = "eyfi_ambassador_profiles";

/**
 * Loads profiles state from localStorage safely.
 */
export function loadPersistentProfiles(defaultProfiles: AmbassadorProfile[]): AmbassadorProfile[] {
  if (typeof window === "undefined") {
    return defaultProfiles;
  }
  
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // Initialize storage with defaults
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultProfiles));
      return defaultProfiles;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error("Error reading from localStorage", err);
    return defaultProfiles;
  }
}

/**
 * Persists profiles state to localStorage.
 */
export function savePersistentProfiles(profiles: AmbassadorProfile[]): void {
  if (typeof window === "undefined") return;
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profiles));
  } catch (err) {
    console.error("Error saving to localStorage", err);
  }
}

/**
 * Helper to manage individual profile reward claim history.
 * Format: key = eyfi_claims_{profileId}, value = array of claimed milestone IDs
 */
export function loadClaimedRewards(profileId: string): number[] {
  if (typeof window === "undefined") return [];
  
  try {
    const raw = localStorage.getItem(`eyfi_claims_${profileId}`);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error("Error loading claims", err);
    return [];
  }
}

export function saveClaimedRewards(profileId: string, claimedIds: number[]): void {
  if (typeof window === "undefined") return;
  
  try {
    localStorage.setItem(`eyfi_claims_${profileId}`, JSON.stringify(claimedIds));
  } catch (err) {
    console.error("Error saving claims", err);
  }
}
