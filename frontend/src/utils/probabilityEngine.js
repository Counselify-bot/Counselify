/**
 * Counselify AI Rank Predictor - Probability Engine
 * 
 * Logic based on user requirements:
 * 1. Trend adjustment: Adjust closing rank by competition growth (e.g. 5% increase).
 * 2. Probability Formula: User Rank - Adjusted Closing Rank.
 * 3. Categorization: Very High, High, Medium, Low.
 */

export const calculateProbability = (userRank, closingRank, margin = 0.05) => {
    // With a margin of 5%, we allow colleges with a closing rank slightly lower than the user's rank.
    // E.g., if user rank is 5000, acceptable closing rank can be as low as 4750.
    const allowedMargin = userRank * margin; // e.g. 250 for rank 5000
    const difference = userRank - closingRank; // e.g., 5000 - 4990 = 10 -> inside allowed margin

    let probability = 0;
    let text = "";
    let color = "";

    if (difference < -1000) {
        probability = 95;
        text = "Very High";
        color = "text-green-600 bg-green-50 border-green-100";
    } else if (difference < 0) {
        probability = 85;
        text = "High";
        color = "text-green-600 bg-green-50 border-green-100";
    } else if (difference <= allowedMargin) {
        // Within 5% margin (5000 rank matches with 4990)
        probability = 75;
        text = "Good Match";
        color = "text-blue-600 bg-blue-50 border-blue-100";
    } else if (difference <= allowedMargin * 2) {
        probability = 55;
        text = "Medium";
        color = "text-yellow-600 bg-yellow-50 border-yellow-100";
    } else if (difference <= allowedMargin * 4) {
        probability = 30;
        text = "Low";
        color = "text-orange-600 bg-orange-50 border-orange-100";
    } else {
        probability = 15;
        text = "Unlikely";
        color = "text-red-600 bg-red-50 border-red-100";
    }

    return { probability, text, color, difference };
};

export const getStrategyRecommendation = (userRank, predictionData, strategyMode = "Normal") => {
    // In Aggressive: show options that are "Medium" but might be reachable in later rounds.
    // In Safe: show options that are "Very High" to ensure a seat.

    if (strategyMode === "Aggressive") {
        return predictionData.filter(d => d.probability >= 40); // Includes Medium
    } else if (strategyMode === "Safe") {
        return predictionData.filter(d => d.probability >= 80); // Only High/Very High
    }

    return predictionData; // Normal: show everything relevant
};
