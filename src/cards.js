/**
 * Card database for Chhota Pandit game
 * Cards are loaded from public/cards.json
 */

// Import cards from JSON file
import cardsJson from '../public/cards.json';

export const CARDS = cardsJson;

/**
 * Get all unique categories from the card database
 * @returns {string[]} Array of category names
 */
export function getCategories() {
  const categories = new Set(CARDS.map(card => card.category));
  return Array.from(categories).sort();
}

/**
 * Get cards filtered by categories
 * @param {string[]} categories - Categories to include
 * @returns {Card[]} Filtered cards
 */
export function getCardsByCategories(categories) {
  return CARDS.filter(card => categories.includes(card.category));
}

/**
 * Get cards by specific category
 * @param {string} category - Category name
 * @returns {Card[]} Cards in that category
 */
export function getCardsByCategory(category) {
  return CARDS.filter(card => card.category === category);
}

/**
 * Validate if deck constraints can be satisfied
 * @param {string[]} selectedCategories - Categories selected
 * @param {number} requiredDeckSize - Required deck size
 * @returns {{isValid: boolean, message?: string, availableCards?: number}}
 */
export function validateDeckConstraints(selectedCategories, requiredDeckSize) {
  if (selectedCategories.length === 0) {
    return { isValid: false, message: 'At least one category must be selected.' };
  }

  const availableCards = getCardsByCategories(selectedCategories);

  // Check if we have enough cards total
  if (availableCards.length < requiredDeckSize) {
    return {
      isValid: false,
      message: `Not enough cards available. Selected categories have ${availableCards.length} cards, but ${requiredDeckSize} are needed.`,
      availableCards: availableCards.length
    };
  }

  // Check if we can satisfy "at least 1 per category" constraint
  const minCardsNeeded = selectedCategories.length;
  if (requiredDeckSize < minCardsNeeded) {
    return {
      isValid: false,
      message: `Deck size must be at least ${minCardsNeeded} to include 1 card from each selected category.`
    };
  }

  // For deck building, we just need enough total cards and at least 1 per category
  // The 6-cards-per-category limit only applies during individual player turns
  return { isValid: true, availableCards: availableCards.length };
}
