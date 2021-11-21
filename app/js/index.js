'use strict'

let mainSection = null,
    noteElem = null,
    currentNoteID = null,
    noteModalInfo = null,
    isModalOpen = false;

window.addEventListener('DOMContentLoaded', () => {
    updateNotes();

    const createNoteBtn = document.querySelector('#create-note__submit'),
          subjectInput = document.querySelector('#create-note__subject'),
          textInput = document.querySelector('#create-note__text');

    createNoteBtn.addEventListener('click', (e) => {
        if (subjectInput.value.length == 0) {
            subjectInput.value = 'New note';
        }
        new Note (
            '',
            subjectInput.value,
            textInput.value,
            currentDate()
        ).addNote();
        updateNotes();
    })
})

function updateNotes () {
    let noteBoard = document.querySelector('.note__board'),
        currentNotes = document.querySelectorAll('.note__container');

    currentNotes.forEach( elem => {
        elem.remove();
    })

    for (let elem in noteDB) {
        noteBoard.insertAdjacentHTML('beforeend' , 
        new Note(
            noteDB[elem]['id'],
            noteDB[elem]['subject'],
            noteDB[elem]['text'],
            noteDB[elem]['date']
        ).render());
    }

    showNoteInfo();
}

function showNoteInfo() {
    noteElem = document.querySelectorAll('.note__container');
    noteElem.forEach( elem => {
        elem.addEventListener('click', (e) => {
            mainSection = document.querySelector('main');
            mainSection.insertAdjacentHTML('beforeend', noteModalElem);

            isModalOpen = true;
            document.body.style.overflow = 'hidden';

            noteModalInfo = document.querySelector('.modal__container');

            document.querySelector('#note__close').addEventListener('click', () => {
                    closeModal();
            });

            document.querySelector('#note__copy').addEventListener('click', () => {
                document.querySelector('.modal__text').select();
                document.execCommand('copy');
            });

            document.querySelector('#note__edit').addEventListener('click', () => {
                noteDB.forEach((elem) => {
                    if (elem.id == currentNoteID) {
                        noteProperties.forEach((property) => {
                                elem[property] = noteModalInfo.querySelector(`.modal__${property}`).value;
                                if (property == 'date') {
                                    elem[property] = noteModalInfo.querySelector(`.modal__${property}`).innerText;
                                }
                        });
                    }
                });
                updateNotes();
                console.log(noteDB);
                closeModal();
            });

            document.querySelector('#note__delete').addEventListener('click', () => {
                noteDB.forEach((elem) => {
                    if (elem.id == currentNoteID) {
                        noteDB.splice(elem.id, 1);
                        updateNotes();
                    }
                });
                console.log(currentNoteID);
                console.log(noteDB);
                closeModal();
            })

            currentNoteID = e.target.closest('.note__item').querySelector('.note__id').innerText;
            noteDB.forEach( elem => {
                if (elem.id == currentNoteID) {
                    noteProperties.forEach(property => {
                        noteModalInfo.querySelector(`.modal__${property}`).value = elem[property];
                        if (property == 'date') {
                            noteModalInfo.querySelector(`.modal__${property}`).innerText = elem[property];
                        }
                    });
                }
            });
        });
    });
}

function closeModal() {
    isModalOpen = false;
    mainSection.removeChild(noteModalInfo);
    document.body.style.overflow = '';
}

function currentDate() {
    let date = new Date();
    let result = `${date.getDate()} ${date.toLocaleString('en', { month: 'short' })} ${date.getFullYear()}`;
    return result;
}
