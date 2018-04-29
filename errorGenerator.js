import {createElem, addElem} from './domGenerator';

function makeErrorPage(e) {

    let frag = document.createDocumentFragment();
    let main = createElem("main");
    let h1 = createElem("h1", {}, e.toString());

    addElem(h1, main);
    addElem(main, frag);
    addElem(frag, document.body);
}

export {makeErrorPage};