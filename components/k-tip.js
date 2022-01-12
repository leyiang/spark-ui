export default class KTip extends HTMLElement {

    static get observedAttributes() {
        return ["color"];
    }

    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });

        //language=HTML
        shadowRoot.innerHTML = `
            <style>
                :host {
                    position: relative;
                    display: inline-block;
                    overflow: visible;
                }
                
                :host::before,
                :host::after {
                    content: '';
                    display: block;
                    position: absolute;
                    z-index: 1;
                    transform: translate(-50%, -20px);
                    opacity: 0;
                    transition: all .15s, left 0s, right 0s;
                    color: var(--color, rgba(0, 0, 0, 0.75) );
                    visibility: hidden;
                    pointer-events: none;
                }
                
                :host::before {
                    content: attr(prefix) attr(tip) attr(suffix);
                    border-radius: 3px;
                    padding: 6px 10px;
                    line-height: 18px;
                    text-align: left;
                    background-color: var(--color, rgba(0, 0, 0, 0.75));
                    color: #FFF;
                    font-size: 14px;
                    font-style: normal;
                    width: max-content;
                    max-width: 200px;
                }
                
                /* Triangle */
                :host::after {
                    width: 0px;
                    height: 0px;
                    overflow: hidden;
                    border: 6px solid transparent;
                }

                :host([tip]:not([tip='']):hover:not([show=false]))::before,
                :host([tip]:not([tip=''])[show=true])::before,
                :host([tip]:not([tip='']):focus-within:not([show=false]))::before,
                :host([tip]:not([tip='']):hover:not([show=false]))::after,
                :host([tip]:not([tip=''])[show=true])::after,
                :host([tip]:not([tip='']):focus-within:not([show=false]))::after {
                    visibility: visible;
                    opacity: 1;
                }


                /* top && '' */
                :host([dir="top"])::before,
                :host(:not([dir]))::before,
                :host(:not([dir]))::after,
                :host([dir="top"])::after {
                    left: calc( var(--percent, .5) * 100% );
                    bottom: 100%;
                    transform: translate(-50%, -20px);
                }

                :host([dir="top"])::after,
                :host(:not([dir]))::after {
                    margin-bottom: -12px;
                    border-top-color: currentColor;
                }

                :host(:not([dir]):hover:not([show=false]))::before,
                :host(:not([dir])[show=true])::before,
                :host(:not([dir]):focus-within:not([show=false]))::before,
                :host(:not([dir]):hover:not([show=false]))::after,
                :host(:not([dir])[show=true])::after,
                :host(:not([dir]):focus-within:not([show=false]))::after,
                :host([dir="top"]:hover:not([show=false]))::before,
                :host([dir="top"][show=true])::before,
                :host([dir="top"]:focus-within:not([show=false]))::before,
                :host([dir="top"]:hover:not([show=false]))::after,
                :host([dir="top"][show=true])::after,
                :host([dir="top"]:focus-within:not([show=false]))::after {
                    transform: translate( -50%, -10px );
                }

                /* top-left */
                :host([dir="top-left"])::before,
                :host([dir="top-left"])::after {
                    left: 0;
                    bottom: 100%;
                    transform: translate(0, -20px);
                }

                :host([dir="top-left"])::after {
                    margin-bottom: -12px;
                    left: 10px;
                    border-top-color: currentColor;
                }

                :host([dir="top-left"]:hover:not([show=false]))::before,
                :host([dir="top-left"][show=true])::before,
                :host([dir="top-left"]:focus-within:not([show=false]))::before,
                :host([dir="top-left"]:hover:not([show=false]))::after,
                :host([dir="top-left"][show=true])::after,
                :host([dir="top-left"]:focus-within:not([show=false]))::after {
                    transform: translate(0, -10px);
                }

                /* top-right */
                :host([dir="top-right"])::before,
                :host([dir="top-right"])::after {
                    right: 0;
                    bottom: 100%;
                    transform: translate(0, -20px);
                }

                :host([dir="top-right"])::after {
                    margin-bottom: -12px;
                    right: 10px;
                    border-top-color: currentColor;
                }

                :host([dir="top-right"]:hover:not([show=false]))::before,
                :host([dir="top-right"][show=true])::before,
                :host([dir="top-right"]:focus-within:not([show=false]))::before,
                :host([dir="top-right"]:hover:not([show=false]))::after,
                :host([dir="top-right"][show=true])::after,
                :host([dir="top-right"]:focus-within:not([show=false]))::after {
                    transform: translate(0, -10px);
                }

                /* right */
                :host([dir="right"])::before,
                :host([dir="right"])::after {
                    top: calc( var(--percent, .5) * 100% );
                    left: 100%;
                    transform: translate(20px, -50%);
                }

                :host([dir="right"])::after {
                    margin-left: -12px;
                    border-right-color: currentColor;
                }

                :host([dir="right"]:hover:not([show=false]))::before,
                :host([dir="right"][show=true])::before,
                :host([dir="right"]:focus-within:not([show=false]))::before,
                :host([dir="right"]:hover:not([show=false]))::after,
                :host([dir="right"][show=true])::after,
                :host([dir="right"]:focus-within:not([show=false]))::after {
                    transform: translate(10px, -50%);
                }

                /* right-top */
                :host([dir="right-top"])::before,
                :host([dir="right-top"])::after {
                    top: 0;
                    left: 100%;
                    transform: translate(20px, 0);
                }

                :host([dir="right-top"])::after {
                    top: 10px;
                    margin-left: -12px;
                    border-right-color: currentColor;
                }

                :host([dir="right-top"]:hover:not([show=false]))::before,
                :host([dir="right-top"][show=true])::before,
                :host([dir="right-top"]:focus-within:not([show=false]))::before,
                :host([dir="right-top"]:hover:not([show=false]))::after,
                :host([dir="right-top"][show=true])::after,
                :host([dir="right-top"]:focus-within:not([show=false]))::after {
                    transform: translate(10px, 0);
                }

                /* right-bottom */
                :host([dir="right-bottom"])::before,
                :host([dir="right-bottom"])::after {
                    bottom: 0;
                    left: 100%;
                    transform: translate(20px, 0);
                }

                :host([dir="right-bottom"])::after {
                    bottom: 10px;
                    margin-left: -12px;
                    border-right-color: currentColor;
                }

                :host([dir="right-bottom"]:hover:not([show=false]))::before,
                :host([dir="right-bottom"][show=true])::before,
                :host([dir="right-bottom"]:focus-within:not([show=false]))::before,
                :host([dir="right-bottom"]:hover:not([show=false]))::after,
                :host([dir="right-bottom"][show=true])::after,
                :host([dir="right-bottom"]:focus-within:not([show=false]))::after {
                    transform: translate(10px, 0);
                }


                /* bottom */
                :host([dir="bottom"])::before,
                :host([dir="bottom"])::after {
                    left: calc( var(--percent, .5) * 100% );
                    top: 100%;
                    transform: translate(-50%, 20px);
                }

                :host([dir="bottom"])::after {
                    margin-top: -12px;
                    border-bottom-color: currentColor;
                }

                :host([dir="bottom"]:hover:not([show=false]))::before,
                :host([dir="bottom"][show=true])::before,
                :host([dir="bottom"]:focus-within:not([show=false]))::before,
                :host([dir="bottom"]:hover:not([show=false]))::after,
                :host([dir="bottom"][show=true])::after,
                :host([dir="bottom"]:focus-within:not([show=false]))::after {
                    transform: translate(-50%, 10px);
                }

                /* bottom-left */
                :host([dir="bottom-left"])::before,
                :host([dir="bottom-left"])::after {
                    left: 0;
                    top: 100%;
                    transform: translate(0, 20px);
                }

                :host([dir="bottom-left"])::after {
                    margin-top: -12px;
                    border-bottom-color: currentColor;
                    left: 10px;;
                }

                :host([dir="bottom-left"]:hover:not([show=false]))::before,
                :host([dir="bottom-left"][show=true])::before,
                :host([dir="bottom-left"]:focus-within:not([show=false]))::before,
                :host([dir="bottom-left"]:hover:not([show=false]))::after,
                :host([dir="bottom-left"][show=true])::after,
                :host([dir="bottom-left"]:focus-within:not([show=false]))::after {
                    transform: translate(0, 10px);
                }

                /* bottom-left */
                :host([dir="bottom-right"])::before,
                :host([dir="bottom-right"])::after {
                    right: 0;
                    top: 100%;
                    transform: translate(0, 20px);
                }

                :host([dir="bottom-right"])::after {
                    margin-top: -12px;
                    border-bottom-color: currentColor;
                    right: 10px;;
                }

                :host([dir="bottom-right"]:hover:not([show=false]))::before,
                :host([dir="bottom-right"][show=true])::before,
                :host([dir="bottom-right"]:focus-within:not([show=false]))::before,
                :host([dir="bottom-right"]:hover:not([show=false]))::after,
                :host([dir="bottom-right"][show=true])::after,
                :host([dir="bottom-right"]:focus-within:not([show=false]))::after {
                    transform: translate(0, 10px);
                }

                /* left */
                :host([dir="left"])::before,
                :host([dir="left"])::after {
                    top: calc( var(--percent, .5) * 100% );
                    right: 100%;
                    transform: translate(-20px, -50%);
                }

                :host([dir="left"])::after {
                    margin-right: -12px;
                    border-left-color: currentColor;
                }

                :host([dir="left"]:hover:not([show=false]))::before,
                :host([dir="left"][show=true])::before,
                :host([dir="left"]:focus-within:not([show=false]))::before,
                :host([dir="left"]:hover:not([show=false]))::after,
                :host([dir="left"][show=true])::after,
                :host([dir="left"]:focus-within:not([show=false]))::after {
                    transform: translate(-10px, -50%);
                }

                /* left-top */
                :host([dir="left-top"])::before,
                :host([dir="left-top"])::after {
                    top: 0;
                    right: 100%;
                    transform: translate(-20px, 0);
                }

                :host([dir="left-top"])::after {
                    top: 10px;
                    margin-right: -12px;
                    border-left-color: currentColor;
                }

                :host([dir="left-top"]:hover:not([show=false]))::before,
                :host([dir="left-top"][show=true])::before,
                :host([dir="left-top"]:focus-within:not([show=false]))::before,
                :host([dir="left-top"]:hover:not([show=false]))::after,
                :host([dir="left-top"][show=true])::after,
                :host([dir="left-top"]:focus-within:not([show=false]))::after {
                    transform: translate(-10px, 0);
                }


                /* left-bottom */
                :host([dir="left-bottom"])::before,
                :host([dir="left-bottom"])::after {
                    bottom: 0;
                    right: 100%;
                    transform: translate(-20px, 0);
                }

                :host([dir="left-bottom"])::after {
                    bottom: 10px;
                    margin-right: -12px;
                    border-left-color: currentColor;
                }

                :host([dir="left-bottom"]:hover:not([show=false]))::before,
                :host([dir="left-bottom"][show=true])::before,
                :host([dir="left-bottom"]:focus-within:not([show=false]))::before,
                :host([dir="left-bottom"]:hover:not([show=false]))::after,
                :host([dir="left-bottom"][show=true])::after,
                :host([dir="left-bottom"]:focus-within:not([show=false]))::after {
                    transform: translate(-10px, 0);
                }

                :host([type="success"]) {
                    --color: var(--successColor, #52C41A);
                }
                
                :host([type="error"]) {
                    --color: var(--errorColor, #f4615c);
                }
                
                :host([type="warning"]) {
                    --color: var(--warningColor, #faad14);
                }
            </style>
            
            <slot></slot>
        `;
    }

    get tip() {
        return this.getAttribute("tip");
    }

    get color() {
        return this.getAttribute("color");
    }

    get show() {
        return this.getAttribute("show");
    }

    set show( val ) {
        if( val === null || val === false ) {
            this.setAttribute( "show", false );
        } else {
            this.setAttribute( "show", true );
        }
    }

    set color(val) {
        this.setAttribute("color", val);
    }

    set tip( val ) {
        this.setAttribute( "tip", val );
    }



    connectedCallback() {

    }

    attributeChangedCallback( name, oldVal, newVal ) {
        if( name === "color" && this.shadowRoot ) {
            this.style.setProperty("--color", newVal );
        }
    }
}

if( ! customElements.get("k-tip") ) {
    customElements.define("k-tip", KTip );
}