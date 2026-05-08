/**
 * Formats a timestamp into a human-readable clinical date format.
 */
export const formatAssessmentDate = (timestamp: string): string => {
  return new Date(timestamp).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

/**
 * Calculates a summary status based on risk levels.
 */
export const getOverallRiskStatus = (riskLevels: string[]): 'stable' | 'warning' | 'critical' => {
  if (riskLevels.includes('High')) return 'critical';
  if (riskLevels.includes('Medium')) return 'warning';
  return 'stable';
};

/**
 * Filters history based on a search query.
 */
export const filterHistoryItems = <T extends { id: number | string; createdAt?: string; timestamp?: string }>(
  items: T[],
  query: string
): T[] => {
  if (!query) return items;
  const searchLower = query.toLowerCase();
  return items.filter(item => {
    const timeString = item.createdAt || item.timestamp || '';
    return String(item.id).toLowerCase().includes(searchLower) ||
      (timeString && formatAssessmentDate(timeString).toLowerCase().includes(searchLower));
  });
};
