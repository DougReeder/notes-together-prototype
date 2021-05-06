// import RemoteStorage from 'remotestoragejs';

// remoteStorage.js data module
const RemoteNotes = {
  name: 'notes',
  builder: function (privateClient, publicClient) {
    privateClient.declareType('note', {
      "type": "object",
      "properties": {
        "id": {
          "type": "integer"
        },
        "text": {   // may contain semantic HTML tags
          "type": "string",
          "default": "",
          "maxLength": 600000   // allows for one small raster image in a data URL
        },
        "date": {   // RFC 3339, section 5.6 (a subset of ISO 8601)
          "type": "string",
          "format": "date-time"
        }
      },
      "required": [ "text", "date" ]
    });

    privateClient.on('change', evt => {
      console.log("change:", evt);
    });

    return {
      exports: {
        upsert: function(memoryNote) {   // available as remoteStorage.remoteNotes.add();
          console.debug("remoteNotes.upsert", memoryNote);
          const id = memoryNote.id || Math.ceil((1 - Math.random()) * Number.MAX_SAFE_INTEGER);
          const text = memoryNote.text || "";
          let date;
          if (memoryNote.date instanceof Date) {
            date = memoryNote.date;
          } else {
            date = new Date(memoryNote.date);   // ms since epoch, string RFC 2822, or string ISO 8601
          }
          var remoteNote = {id: id, text: text, date: date.toISOString()};

          var path = id.toFixed();

          return privateClient.storeObject("note", path, remoteNote).then(function() {
            return remoteNote;
          });
        },

        list: async function () {
          console.log("remotestorage notes list");
          return  privateClient.getListing('/');
        },

        getAll: async function () {
          console.log("remotestorage notes getAll");
          return privateClient.getAll('/');
        },

        get: async function (key) {
          console.debug("remotestorage notes get", key);
          return privateClient.getObject(key);
        }
      }
    }
  }
};

export default RemoteNotes;
