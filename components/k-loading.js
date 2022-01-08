class KLoading extends HTMLElement {
    static get observedAttributes() {
        return ["color", "size"];
    }

    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        //language=HTML
        shadowRoot.innerHTML = `
            <style>
                :host {
                    font-size: inherit;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    color: var(--themeColor, #42b983);
                }
                
                .loading {
                    display: block;
                    width: 1em;
                    height: 1em;
                    margin: auto;
                    animation: rotate 1.4s linear infinite;
                }
                
                .circle {
                    stroke: currentColor;
                    animation: progress 1.4s ease-in-out infinite;
                    stroke-dasharray: 80px, 200px;
                    stroke-dashoffset: 0px;
                }
                
                :host(:not(:empty)) .loading {
                    margin: .5em;;
                }
                
                @keyframes rotate {
                    to {
                        transform: rotate(360deg);
                    }
                }
                
                @keyframes progress {
                    0%, 100% {
                        stroke-dasharray: 1px, 200px;
                        stroke-dashoffset: 0px;
                    }
                    
                    50% {
                        stroke-dasharray: 100px, 200px;
                        stroke-dashoffset: -15px;
                    }
                    
                    100% {
                        stroke-dasharray: 100px, 200px;
                        stroke-dashoffset: -125px;
                    }
                }
            </style>
            
            <svg class="loading" id="loading" viewBox="22 22 44 44">
                <circle class="circle" cx="44" cy="44" r="20.2" fill="none" stroke-width="3.6"></circle>
            </svg>
            <slot></slot>
        `;
    }

    get color() {
        return this.getAttribute("color") || '';
    }

    get size() {
        return this.getAttribute("size") || '';
    }

    set color( val ) {
        this.setAttribute("color", val );
    }

    set size( val ) {
        this.setAttribute("size", val );
    }

    connectedCallback() {
        this.loading = this.shadowRoot.getElementById("loading");

        this.color && ( this.color = this.color );
        this.size && ( this.size = this.size );
    }

    attributeChangedCallback( name, oldVal, newVal ) {
        if( name === 'size' && this.loading ) {
            this.loading.style.fontSize = newVal + 'px';
        }

        if( name === 'color' && this.loading ) {
            this.loading.style.color = newVal;
        }
    }
}

if( ! customElements.get("k-loading") ) {
    customElements.define("k-loading", KLoading );
}