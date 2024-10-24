import { test } from 'node:test';
import assert from 'node:assert';
import sum from './index.js';

test('sum harus mengembalikan hasil yang benar untuk angka valid', () => {
  assert.strictEqual(sum(10, 10), 20, 'Penjumlahan 10 dan 10 harus menghasilkan 20');
  assert.strictEqual(sum(0, 0), 0, 'Penjumlahan 0 dan 0 harus menghasilkan 0');
  assert.strictEqual(sum(100, 200), 300, 'Penjumlahan 100 dan 200 harus menghasilkan 300');
});

test('sum harus mengembalikan 0 jika salah satu argumen bukan angka', () => {
  assert.strictEqual(sum('5', 10), 0, 'Penjumlahan string "5" dan angka 10 harus menghasilkan 0');
  assert.strictEqual(sum(5, '10'), 0, 'Penjumlahan angka 5 dan string "10" harus menghasilkan 0');
  assert.strictEqual(sum('a', 'b'), 0, 'Penjumlahan string "a" dan string "b" harus menghasilkan 0');
});

test('sum harus mengembalikan 0 jika salah satu argumen negatif', () => {
  assert.strictEqual(sum(-5, 10), 0, 'Penjumlahan -5 dan 10 harus menghasilkan 0');
  assert.strictEqual(sum(5, -10), 0, 'Penjumlahan 5 dan -10 harus menghasilkan 0');
  assert.strictEqual(sum(-5, -10), 0, 'Penjumlahan -5 dan -10 harus menghasilkan 0');
});

test('sum harus menangani angka desimal dengan benar', () => {
  assert.strictEqual(sum(2.5, 3.5), 6, 'Penjumlahan 2.5 dan 3.5 harus menghasilkan 6');
  assert.strictEqual(sum(0.1, 0.2), 0.3, 'Penjumlahan 0.1 dan 0.2 harus menghasilkan 0.3 (presisi floating-point)');
});

test('sum harus mengembalikan 0 jika tidak ada argumen yang diberikan', () => {
  assert.strictEqual(sum(), 0, 'Pemanggilan sum tanpa argumen harus menghasilkan 0');
});
