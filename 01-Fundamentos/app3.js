const fs = require('fs');

const content = fs.readFileSync('README.md', 'utf8');

const wordCount = content.split(' ');

// const reactWordCount = wordCount.filter((word) =>
//   word.toLowerCase().includes('react')
// ).length;

const reactWordCount = content.match(/react/gi ?? []).length

console.log('Palabras: ', wordCount.length);

console.log('Palabras react', reactWordCount);
