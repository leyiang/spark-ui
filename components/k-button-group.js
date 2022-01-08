class KButtonGroup extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        //language=HTML
        shadowRoot.innerHTML = `
            ${ this.componentStyle }
            <slot></slot>
        `;
    }

    get componentStyle() {
        //language=HTML
        return `
            <style>
                :host {
                    display: inline-flex;
                }

                ::slotted( k-button:not(:first-of-type):not(:last-of-type) ) {
                    border-radius: 0;
                }

                ::slotted( k-button ) {
                    margin: 0;
                }

                ::slotted( k-button:first-of-type ) {
                    border-top-right-radius: 0;
                    border-bottom-right-radius: 0;
                }

                ::slotted( k-button:not(:first-of-type) ) {
                    margin-left: -1px !important;
                }

                ::slotted( k-button:last-of-type ) {
                    border-top-left-radius: 0;
                    border-bottom-left-radius: 0;
                }
                
                ::slotted( k-button[type]:not([type='dashed']):not(:first-of-type) ) {
                    margin-left: 1px !important;
                }
            </style>
        `;
    }
}

if( ! customElements.get("k-button-group") ) {
    customElements.define("k-button-group", KButtonGroup );
}