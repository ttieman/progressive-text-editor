import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });


export const putDb = async (content) => {
  const contactDb = await openDB("jate", 1);
  const tx = contactDb.transaction("jate", "readwrite");
  const store = tx.objectStore("jate");
  const request = store.put({ id: 1, value: content });
  const result = await request;
  console.log("data saved, result");
};


export const getDb = async () => {
  const jatetDb = await openDB("jate", 1);
  const tx = jatetDb.transaction("jate", "readonly");
  const store = tx.objectStore("jate");
  const request = store.get(1);

  
  const result = await request;
  console.log("result.value", result);
  return result ? result.value : undefined;
};

initdb();