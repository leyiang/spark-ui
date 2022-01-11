import "./k-loading.js";

/**
 * Define KButton Class
 */
export default class KButton extends HTMLElement {

    /**
     * Observing Attributes
     * @returns {string[]}
     */
    static get observedAttributes() {
        return ["disabled", "icon", "loading", "href", "htmltype"];
    }

    constructor() {
        super();

        /**
         * Create Shadow Root
         * @type {ShadowRoot}
         */
        const shadowRoot = this.attachShadow({mode: 'open'});

        //language=HTML
        const attr = {
            type: `type="${this.htmlType}"`,
            href: `href="${this.href}" target="${this.target}" rel="${this.rel}"`,
            download: `download="${this.download}"`,
        };

        shadowRoot.innerHTML = `            
            ${this.componentStyle}
            
            
            <${this.href ? "a" : "button"}
                ${this.htmlType ? attr.type : ''}
                ${(this.download && this.href) ? attr.download : ''}
                ${this.href ? attr.href : ''}
                class="btn" id="btn"
            >
                <slot></slot>
            </${this.href ? "a" : "button"}>
        `;
    }

    get componentStyle() {
        //language=HTML
        return `
            <style>
                /**
                    Shadow Root Host
                */
                :host {
                    display: inline-flex;
                    border-radius: var(--borderRadius, .25em);
                }

                a,
                .btn {
                    cursor: pointer;
                    text-decoration: none;
                    width: 100%;
                    height: 100%;
                    position: relative;
                    display: flex;
                    padding: .25rem .625rem;
                    box-sizing: border-box;
                    vertical-align: middle;
                    line-height: 1.8;
                    overflow: hidden;
                    align-items: center;
                    justify-content: center;
                    border: 1px solid var(--borderColor, rgba(0, 0, 0, 0.2));
                    font-size: 14px;
                    font-family: Arial;
                    color: var(--fontColor, #333);
                    border-radius: inherit;
                    transition: background .3s, box-shadow .3s, border-color .3s, color .3s;
                    background-color: transparent;
                }

                k-loading {
                    margin-right: .35rem;;
                }
                /*
                    Selects a shadow root host, only if it is
                    matched by the selector argument
                */
                :host([shape="circle"]) {
                    border-radius: 50%;
                }

                :host([disabled]),
                :host([loading]) {
                    pointer-events: none;
                    opacity: .6;
                }

                :host([block]) {
                    display: flex;
                }

                :host([disabled]:not([type])) {
                    background: rgba(0, 0, 0, 0.1);
                }

                /**
                   :host pointer events none
                   .btn pointer events all
                 */
                :host([disabled]) .btn,
                :host([loading]) .btn {
                    cursor: not-allowed;
                    pointer-events: all;
                }

                :host([type="primary"]:not([disabled]):hover) .btn {
                    background: var(--themeBackground, var(--themeHoverColor, #4dc68d));
                }

                :host([type="danger"]:not([disabled]):hover) .btn {
                    background: var(--themeBackground, var(--dangerHoverColor, #ff9491));
                }

                :host( :not([type="primary"]):not([type="danger"]):not([disabled]):hover ) .btn,
                :host( :not([type="primary"]):not([type="danger"]):focus-within ) .btn,
                :host([type="flat"][focus]) .btn {
                    color: var(--themeColor, #42b983);
                    border-color: var(--themeColor, #42b983);
                }

                :host([type="primary"]) .btn {
                    color: #FFF;
                    background: var(--themeBackground, var(--themeColor, #42b983));
                }

                :host([type="danger"]) .btn {
                    color: #FFF;
                    background: var(--themeBackground, var(--dangerColor, #ff7875));
                }

                :host([type="dashed"]) .btn {
                    border-style: dashed;
                }

                :host([type="flat"]) .btn,
                :host([type="primary"]) .btn,
                :host([type="danger"]) .btn {
                    border: none;
                    padding: calc(.25em + 1px) calc(.625em + 1px);
                }

                :host([type="flat"]) .btn::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    opacity: 0;
                    transition: .3s;
                    pointer-events: none;
                    background: var(--themeColor, #42b983);
                }

                :host([type="flat"]:not([disabled]):hover) .btn::before {
                    opacity: .1;
                }

                :host([type="flat"]:focus-within) .btn.btn::before,
                :host([type="flat"][focus]) .btn.btn::before {
                    opacity: .2;
                }
            </style>
        `
    }

    get disabled() {
        return this.getAttribute("disabled") !== null;
    }

    get icon() {
        return this.getAttribute("icon");
    }

    get loading() {
        return this.getAttribute("loading") !== null;
    }

    get href() {
        return this.getAttribute("href");
    }

    get htmltype() {
        return this.getAttribute("htmltype");
    }

    get target() {
        return this.getAttribute("target") || "_blank";
    }

    get rel() {
        return this.getAttribute("rel");
    }

    get download() {
        return this.getAttribute("download");
    }

    set disabled( value ) {
        if( value === null || value === false ) {
            this.removeAttribute("disabled");
        } else {
            this.setAttribute("disabled", '' );
        }
    }

    set loading( val ) {
        if( val === null || val === false ) {
            this.removeAttribute("loading");
        } else {
            this.setAttribute("loading", '' );
        }
    }

    connectedCallback() {
        this.btn = this.shadowRoot.getElementById("btn");

        this.disabled = this.disabled;
        this.loadEl = document.createElement("k-loading");
        this.loadEl.style.color = "inherit";

        this.loading && (this.loading = this.loading);
    }

    attributeChangedCallback(name, oldValue, newValue ) {
        if( name === 'disabled' && this.btn ) {
            if( newValue !== null ) {
                this.btn.setAttribute("disabled", "disabled");
                if( this.href ) {
                    this.btn.removeAttribute("href" );
                }
            } else {
                this.btn.removeAttribute("disabled");
                if( this.href ) {
                    this.btn.href = this.href;
                }
            }
        }

        if( name === 'loading' && this.btn ) {
            if( newValue !== null ) {
                this.btn.prepend( this.loadEl );
                this.btn.setAttribute("disabled", "disabled");
            } else {
                this.btn.removeChild( this.loadEl );
                this.btn.removeAttribute("disabled", "disabled");
            }
        }
    }
}

if( ! customElements.get("k-button") ) {
    customElements.define("k-button", KButton);
}
