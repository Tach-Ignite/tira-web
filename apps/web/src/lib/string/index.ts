/* eslint-disable no-else-return */
export function convertPluralToSingular(word: string) {
  // Check if the word ends with 'ies'
  if (word.endsWith('ies')) {
    // If it does, replace 'ies' with 'y'
    return `${word.slice(0, -3)}y`;
  } else if (word.endsWith('s')) {
    // If it ends with 's', remove the last character
    return word.slice(0, -1);
  }
  // If the word doesn't end with 's' or 'ies', return it unchanged
  return word;
}

export const getInitials = (name: string) => {
  // Split the name into words
  const words = name.split(' ');
  // Extract the first letter of each word
  return words.map((word) => word[0]).join('');
};
