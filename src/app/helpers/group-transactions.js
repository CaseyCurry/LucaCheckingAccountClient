"use strict";

const groupTransactions = (transactions) => {
  let words = groupByWords(transactions);
  let phrases = mergeWords(words);
  let sorted = sortPhrases(phrases);
  return sorted;
};

export default groupTransactions;

const groupByWords = (transactions) => {
  const words = {};

  transactions
    .forEach((transaction) => {
      const description = ignorePhrases(transaction.description);
      const wordsInTransaction = description.split(" ");
      wordsInTransaction.forEach((word) => {
        word = ignoreWords(word);
        if (word) {
          if (!words[word]) {
            words[word] = {
              word: word,
              transactions: [transaction]
            };
          } else {
            words[word].transactions.push(transaction);
          }
        }
      });
    });

  return words;
};

const ignorePhrases = (description) => {
  const phrasesToIgnore = ["D/C SETTLEMENT", "Pre auth", "POS Debit",
    "ACH Debit", "ONLINE PMT", "POST ATM DEBIT", "DBT CRD",
    "POS Recurring Debit", "LOC:", "ACH Credit"
  ];

  phrasesToIgnore.forEach((phraseToIgnore) => {
    description = description
      .split(phraseToIgnore)
      .join("")
      .split(phraseToIgnore.toLowerCase())
      .join("")
      .split(phraseToIgnore.toUpperCase())
      .join("");
  });

  return description;
};

const ignoreWords = (word) => {
  const removeDates = true;
  const removeNumbers = true;
  const minimumWordLengthToGroup = 3;
  const wordsToIgnore = ["POS", "ATM", "DEBIT", "DDA", "Rowlett",
    "Garland", "DEB", "ID#", "TRACE#", "9500000000", "CKF555076855POS",
    "The", "Card#"
  ];

  wordsToIgnore.forEach((wordToIgnore) => {
    if (word.toLowerCase() === wordToIgnore.toLowerCase()) {
      word = "";
    }
  });

  if (word.length < minimumWordLengthToGroup) {
    return null;
  }

  if (removeDates &&
    !isNaN(Date.parse(word))) {
    return null;
  }

  if (removeNumbers &&
    !isNaN(word)) {
    return null;
  }

  return word;
};

const mergeWords = (words) => {
  const phrases = {};

  for (const word in words) {
    let merged = false;

    for (const mergedWord in phrases) {
      if (areEqual(
          phrases[mergedWord].transactions,
          words[word].transactions)) {
        phrases[mergedWord].phrase += " " + words[word].word;
        merged = true;
      }
    }

    if (!merged) {
      phrases[word] = {
        phrase: words[word].word,
        count: words[word].transactions.length,
        transactions: words[word].transactions
      };
    }
  }

  return phrases;
};

const sortPhrases = (phrases) => {
  return Object.keys(phrases)
    .map(phrase => phrases[phrase])
    .sort((x, y) => {
      return y.count - x.count;
    });
};

const areEqual = (x, y) => {
  if (x.length !== y.length) {
    return false;
  }

  for (let i = 0; i < x.length; i++) {
    if (x[i] != y[i]) {
      return false;
    }
  }

  return true;
};
