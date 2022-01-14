export default class KSwitch extends HTMLElement {
    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });
        //language=HTML
        shadowRoot.innerHTML = `
            <style>
                :host {
                    display: inline-block;
                }
                
                :host([disabled]) {
                    pointer-events: none;
                    opacity: .6;
                }
                
                :host([disabled]) label {
                    pointer-events: all;
                    cursor: not-allowed;
                }
                
                input[type="checkbox"] {
                    position: absolute;
                    clip: rect(0, 0, 0, 0);
                }
                
                label {
                    cursor: pointer;
                    display: flex;
                    width: 2.4em;
                    height: 1.2em;
                    padding: .15em;
                    border-radius: 1.2em;
                    background: #EEE;
                    transition: width .3s, height .3s, background-color .3s;
                }
                
                label::before {
                    content: '';
                    flex: 0;
                    transition: flex .3s;
                }
                
                label::after {
                    content: '';
                    width: 1.2em;
                    height: 1.2em;
                    border-radius: 1.2em;
                    background-color: #FFF;
                    transition: padding .3s;
                }
                
                input[type="checkbox"]:checked ~ label {
                    background-color: darkseagreen;
                }
                
                input:checked ~ label::before {
                    flex: 1;
                }

                label:active ~ label::after {
                    padding: 0 1.2em 0;
                }
            </style>
            
            <input type="checkbox" id="switch">
            <label for="switch"></label>
        `;
    }
}

if( ! customElements.get("k-switch") ) {
    customElements.define("k-switch", KSwitch );
}