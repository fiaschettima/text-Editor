import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('PUT DB');
  const jateDB = await openDB('jate', 1);
  const act = jateDB.transaction('jate', 'readwrite');
  const storeD = act.objectStore('jate');
  const req = storeD.put({id:1, text: content});
  const res = await req;
  console.log('Data Saved', res)
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET DB');
  const jateDB = await openDB('jate', 1);
  const act = jateDB.transaction('jate', 'readonly');
  const storeD = act.objectStore('jate');
  const req = storeD.getAll();
  const res = await req;
  console.log('Retrieved', res);
  return res.value;
};

initdb();
