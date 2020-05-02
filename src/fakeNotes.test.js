import fakeNote from './fakeNote';

test('generates a test note', () => {
  const testNote = fakeNote();
  expect(testNote.text).toMatch(/\w{2}/);

  expect(testNote.date).toBeInstanceOf(Date);
  expect(testNote.date.valueOf()).not.toBeGreaterThan(Date.now() + 1.01 * 24*60*60*1000);
  expect(testNote.date.valueOf()).not.toBeLessThan(Date.now() - 31.01 * 24*60*60*1000);

  expect(testNote.id).toBeGreaterThan(0);
  expect(Math.floor(testNote.id)).toEqual(testNote.id);

  // console.log(testNote.text);
});
