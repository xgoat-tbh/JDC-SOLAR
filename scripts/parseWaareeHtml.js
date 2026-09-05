import fs from 'fs';

const content = fs.readFileSync('C:\\Users\\Outcast\\.gemini\\antigravity\\brain\\58f1ccba-d83c-4985-878b-d4d963786e81\\.system_generated\\steps\\3610\\content.md', 'utf8');

const matches = content.match(/https:\/\/[^"'\s]+\.(?:png|svg|webp|jpg)/gi) || [];
const unique = [...new Set(matches)];
console.log('Found image URLs:', unique.filter(u => u.toLowerCase().includes('logo') || u.toLowerCase().includes('brand') || u.toLowerCase().includes('waaree')));
