function createHtmlElement(html) {
    let elementTemplate = document.createElement('template');
    elementTemplate.innerHTML = html;

    return elementTemplate.content.childNodes[0];
}

function createButton(text, parent) {
    return createElement(getButtonHtml(text), parent);
}

function getButtonHtml(text, classes, parent) {
    return "<button type='button' class='btn "+classes+"'>" + text + "</button>";
}
function showElement(el){
    el.classList.remove("hidden");
}
function hideElement(el){
    el.classList.add("hidden");
}