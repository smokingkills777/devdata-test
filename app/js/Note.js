class Note {
    constructor(id, subject, text, date) {
        this.id = id,
        this.subject = subject,
        this.text = text,
        this.date = date
    }

    addNote() {
        noteDB.push( {id : noteDB.length, subject : this.subject, text : this.text, date: this.date} );
    }

    render() {
        const element = 
        `
        <div class="note__container col-lg-3 col-md-4">
            <div class="note__item">
                <div class="note__id" hidden="">${this.id}</div>
                <h5 class="note__subject">${this.cutNoteText(this.subject, 20)}</h5>
                <hr>
                <p class="note__text">${this.cutNoteText(this.text, 250)}</p>
                <p class="note__date">
                    ${this.date}
                </p>
                <div class="note__social">
                    <i class="bi bi-twitter"></i>
                    <i class="bi bi-facebook"></i>
                    <i class="bi bi-clipboard"></i>
                </div>
            </div>
        </div>
        `;

        return element;
    }

    cutNoteText(text, maxSymbols) {
        return text.length > maxSymbols ? text.substr(0, maxSymbols) + '...' : text;
    }
}