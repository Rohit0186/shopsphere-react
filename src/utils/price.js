/**
 * Helper utility to convert USD prices to INR (Indian Rupees).
 * Used across the application for consistent price formatting.
 */
export const convertToINR = (price) => {
  if (!price) return 0;
  
  // Using a fixed conversion rate of 83 as requested
  return Math.round(price * 83);
};
