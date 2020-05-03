import {movieNote, listNote, randomNote} from './fakeNote';

test('generates a movie note', () => {
  const testNote = movieNote();
  expect(testNote.text).toMatch(/\w{2}/);

  expect(testNote.date).toBeInstanceOf(Date);
  expect(testNote.date.valueOf()).not.toBeGreaterThan(Date.now() + 1.01 * 24*60*60*1000);
  expect(testNote.date.valueOf()).not.toBeLessThan(Date.now() - 31.01 * 24*60*60*1000);

  expect(testNote.id).toBeGreaterThan(0);
  expect(Math.floor(testNote.id)).toEqual(testNote.id);
});

test('generates a list note', () => {
  const testNote = listNote();
  expect(testNote.text).toMatch(/\w{2}/);

  expect(testNote.date).toBeInstanceOf(Date);
  expect(testNote.date.valueOf()).not.toBeGreaterThan(Date.now() + 1.01 * 24*60*60*1000);
  expect(testNote.date.valueOf()).not.toBeLessThan(Date.now() - 31.01 * 24*60*60*1000);

  expect(testNote.id).toBeGreaterThan(0);
  expect(Math.floor(testNote.id)).toEqual(testNote.id);
});

test('generates a random note', () => {
  const testNote = randomNote();
  expect(testNote.text).toMatch(/\w{2}/);

  expect(testNote.date).toBeInstanceOf(Date);
  expect(testNote.date.valueOf()).not.toBeGreaterThan(Date.now() + 1.01 * 24*60*60*1000);
  expect(testNote.date.valueOf()).not.toBeLessThan(Date.now() - 31.01 * 24*60*60*1000);

  expect(testNote.id).toBeGreaterThan(0);
  expect(Math.floor(testNote.id)).toEqual(testNote.id);
});
