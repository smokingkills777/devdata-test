let noteModalElem = 
`
<div class="modal__container">
    <div class="modal d-flex flex-row flex-wrap">
        <div class="modal__content d-flex flex-column">
            <input type="text" class="modal__subject">
            <textarea type="text" class="modal__text" rows="10"></textarea>
            <p class="modal__date">13 Aug 2021</p>
        </div>
        <div class="modal__interact d-flex flex-column justify-content-center">
            <button id="note__edit">Edit note</button>
            <button id="note__copy">Copy to clipboard</button>
            <button id="note__delete">Delete note</button>
            <button id="note__share">Share</button>
            <button id="note__close">Close</button>
        </div>
    </div>
</div>
`