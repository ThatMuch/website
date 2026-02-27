const fs = require('fs');
const imagePath = './src/components/PostCard/PostCard.tsx';
console.log(fs.readFileSync(imagePath, 'utf8'));
