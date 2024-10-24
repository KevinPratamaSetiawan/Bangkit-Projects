import { sum } from './index.js';

import assert from 'node:assert';

import test from 'node:test';

test('Mengembalikan nilai yang benar dari operasi penjumlahan 2 variabel integer atau nilai.', (t) => {
  assert.strictEqual(sum(5, 3), 8);

  assert.strictEqual(sum(-5, 4), -1);

  assert.strictEqual(sum(0, 0), 0);
});