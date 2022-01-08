class KIcon extends HTMLElement {
    static get observedAttributes() {
        return ["name", "color", "size", "path"];
    }

    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });

        //language=HTML
        shadowRoot.innerHTML = `
            <style>
                :host {
                    font-size: inherit;
                    display: inline-block;
                    transition: .3s;
                }
                
                .icon {
                    display: block;
                    width: 1em;
                    height: 1em;
                    margin: auto;
                    fill: currentColor;
                    overflow: hidden;
                }
                
                :host([spin]) {
                    animation: rotate 1.4s linear infinite;
                }
                
                @keyframes rotate {
                    to {
                        transform: rotate(360deg);
                    }
                }
            </style>
            
            <svg class="icon" id="icon" aria-hidden="true" viewBox="0 0 ${this.view} ${ this.view }">
                ${ this.path ? '<path id="path"></path>' : '<use id="use"></use>' }
            </svg>
        `;
    }

    get view() {
        return this.getAttribute("view") || 1024;
    }

    get name() {
        return this.getAttribute("name");
    }

    get path() {
        return this.getAttribute("path") || '';
    }

    set name(val) {
        this.setAttribute("name", val);
    }

    set path(val) {
        return this.setAttribute("path", val);
    }

    get size() {
        return this.getAttribute("size") || '';
    }

    get color() {
        return this.getAttribute("color") || '';
    }

    set size(val) {
        return this.setAttribute("size", val);
    }

    set color(val) {
        return this.setAttribute("color", val);
    }

    connectedCallback() {
        this.icon = this.shadowRoot.getElementById("icon");
        this.use = this.icon.querySelector("use");
        this.d = this.icon.querySelector("path");

        this.size && (this.size = this.size);
        this.color && (this.color = this.color);
        this.name && (this.name = this.name);
        this.path && (this.path = this.path);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if( name === 'name' && this.use ) {
            this.use.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', `../iconfont/icon.svg#icon-${ newValue }`);
        }

        if( name === 'path' && this.d ) {
            this.d.setAttribute( "d", newValue );
        }

        if( name === "color" && this.icon ) {
            this.icon.style.color = newValue;
        }

        if( name === "size" && this.icon ) {
            this.icon.style.fontSize = newValue + "px";
        }
    }
}

if( ! customElements.get("k-icon") ) {
    customElements.define("k-icon", KIcon );
}