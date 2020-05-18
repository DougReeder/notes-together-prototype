import RemoteStorage from 'remotestoragejs';
import RemoteNotes from "./RemoteNotes";
import Widget from "remotestorage-widget";
import "./Cache.css";


let remoteStorage;
const cache = {};
let cacheChangedCallback;

function initCache(cacheChangedCallbackArg) {
  remoteStorage = new RemoteStorage({modules: [ RemoteNotes ], cache: false});
  remoteStorage.access.claim('notes', 'rw');

  cacheChangedCallback = cacheChangedCallbackArg;

  remoteStorage.on('ready', function() {
    console.log("remoteStorage ready");
  });

  remoteStorage.on('connected', async () => {
    const userAddress = remoteStorage.remote.userAddress;
    console.log(`remoteStorage connected to “${userAddress}”`);
    await refreshCache();
  });

  remoteStorage.on('not-connected', function() {
    console.log("remoteStorage not-connected", remoteStorage.remote.token);
  });

  remoteStorage.on('disconnected', function() {
    console.log("remoteStorage disconnected", arguments);
  });

  remoteStorage.on('error', function(err) {
    console.error("remoteStorage error", err);
  });

  remoteStorage.on('network-offline', () => {
    console.debug(`Remote Storage offline now.`);
  });

  remoteStorage.on('network-online', () => {
    console.debug(`Remote Storage back online.`);
  });

  const widget = new Widget(remoteStorage);   // login
  widget.attach();
}


async function refreshCache() {
  try {
    const serverMeta = await remoteStorage.notes.list();
    console.log("serverMeta:", serverMeta);
    let cacheChanged = false;
    const entries = Object.entries(serverMeta);
    const promises = [];
    for (let i = 0; i < entries.length; ++i) {
      const key = entries[i][0];
      const value = entries[i][1];
      const cacheNote = cache[key];
      if (!cacheNote) {
        promises.push(remoteStorage.notes.get(key));
      } else {
        if (value.ETag === cacheNote.ETag) {
          console.log("matches cache:", key);
        } else {
          console.log("doesn't match cache:", key);
        }
      }
    }
    const results = await Promise.allSettled(promises);
    results.forEach(result => {
      if ('fulfilled' === result.status) {
        const key = result.value.id.toFixed();
        console.log("key", key, serverMeta[key].ETag);
        result.value.ETag = serverMeta[key].ETag;
        result.value.lastModified = serverMeta[key]["Last-Modified"];
        cache[key] = result.value;
        cacheChanged = true;
        console.log(`for ${result.value.id} got`, result.value);
      } else {
        console.error(result.reason);
      }
    });

    console.log(`cache changed: ${cacheChanged}:`, cache);
    if (cacheChanged) {
      cacheChangedCallback();
    }
  } catch (err) {
    console.error("while refreshing cache:", err);
  }
}

async function getNotesArr() {
  return Object.values(cache);
}

async function storeNoteRemote(memoryNote) {
  console.log("storeNoteRemote", memoryNote);

  return remoteStorage.notes.add(memoryNote);
}

export {initCache, refreshCache, getNotesArr, storeNoteRemote};
