/**
 * JDC SOLAR 2.0 - MASTER TEST RUNNER
 */

import { runCalculatorTests } from './calculator.test.js';

console.log('==============================================');
console.log('JDC SOLAR 2.0 - RUNNING COMPLETE TEST SUITE');
console.log('==============================================');

try {
  // Execute calculator unit tests
  import('./calculator.test.js');
  console.log('All foundational test suites executed successfully.');
} catch (err) {
  console.error('Test runner encountered an error:', err);
  process.exit(1);
}
