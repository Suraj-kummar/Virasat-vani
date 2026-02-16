// Clear localStorage script for Virasat Vani
// Run this in the browser console to reset the app

console.log('🧹 Clearing Virasat Vani localStorage...');

// List all keys before clearing
const keys = Object.keys(localStorage).filter(k => k.startsWith('virasat_'));
console.log('Found keys:', keys);

// Clear all virasat-related data
localStorage.removeItem('virasat_products');
localStorage.removeItem('virasat_cart');
localStorage.removeItem('virasat_user');
localStorage.removeItem('virasat_lang');

console.log('✅ Cleared! Please refresh the page.');
console.log('The app will now use the latest product data with local images.');
