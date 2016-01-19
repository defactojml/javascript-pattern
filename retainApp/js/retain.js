$(function() {

  // MVC model where
  // - the model talks only to the Octopus
  // - the view talks only to the Octopus

  var model = {
    init: function() {
      if (!localStorage.notes) {
        localStorage.notes = JSON.stringify([]);
      }
    },
    add: function(obj) {
      var data = JSON.parse(localStorage.notes);
      data.push(obj);
      localStorage.notes = JSON.stringify(data);
    },
    getAllNotes: function() {
      return JSON.parse(localStorage.notes);
    }
  };

  var octopus = {
    addNewNote: function(noteStr) {
      model.add({
        content: noteStr,
        date: Date.now()
      });
      view.render();
    },

    getNotes: function() {
      return model.getAllNotes();
    },

    getNotesInReverseOrder: function() {
      return model.getAllNotes().reverse();
    },

    init: function() {
      //fetch data from local storage (if exists)
      model.init();
      // initialize the view with displaying the data
      view.init();
    }
  };

  var view = {

    // Add the event listener to the HTML form created statically
    // Call to the render
    init: function() {
      this.noteList = $('#notes');
      var newNoteForm = $('#new-note-form');
      var newNoteContent = $('#new-note-content');
      newNoteForm.submit(function(e) {
        octopus.addNewNote(newNoteContent.val());
        newNoteContent.val('');
        e.preventDefault();
      });
      view.render();
    },
    // Fetch the list of notes
    render: function() {
      var htmlStr = '';
      octopus.getNotesInReverseOrder().forEach(function(note) {
        htmlStr += '<li class="note">' +
        '<span> ' + note.content + '</span>' +
        '<span class="note-date">' + new Date(note.date).toString() + '</span>' +
        '</li>';
      });
      this.noteList.html(htmlStr);
    }
  };

  octopus.init();
});