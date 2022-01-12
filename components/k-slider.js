import "./k-tip.js";

class KSlider extends HTMLElement {
    static get observedAttributes() {
        return ["min", "max", "step", "disabled", "showtips", "suffix"]
    }

    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });
        //language=HTML
        shadowRoot.innerHTML = `
            <style>
                :host {
                    box-sizing: border-box;
                    display: flex;
                    padding: 0 5px;
                    user-select: none;
                }
                
                :host([disabled]) {
                    opacity: .8;
                    --themeColor: #999;
                    cursor: not-allowed;
                }
                
                :host([disabled]) input[type="range"] {
                    pointer-events: none;
                }
                
                input[type="range"] {
                    pointer-events: all;
                    margin: 0 -5px;
                    width: calc( 100% + 10px );
                    -webkit-appearance: none;
                    outline: 0;
                    height: 12px;;
                    background: none;
                    border-radius: 2px;
                }
                
                input[type="range"]::-webkit-slider-runnable-track {
                    display: flex;
                    align-items: center;
                    position: relative;
                    height: 2px;
                    border-radius: 2px;
                    background:linear-gradient(to right, var(--themeColor,#42b983) calc(100% * var(--percent)), rgba(0,0,0,.1) 0% );
                }
                
                input[type="range"]::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    appearance: none;
                    border: 2px solid var(--themeColor, #42b983);
                    position: relative;
                    width: 10px;
                    height: 10px;
                    margin-top: -4px;
                    border-radius: 50%;
                    background: var(--themeColor, #42b983);
                    transition: .2s ease;
                }

                input[type="range"]:focus {
                    z-index: 2;
                }
                
                input[type="range"]:focus::-webkit-slider-thumb {
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    background-color: #FFF;
                    /*outline: 2px solid #000;*/
                    /*outline-offset: 0.125rem;*/
                    /*background-color: #FFF;*/
                    /*border: 4px solid currentColor;*/
                    /*border-radius: 50%;*/
                }

                #slider-container {
                    width: 100%;
                }
            </style>

            <k-tip
                id="slider-container"
                dir="top"
                tip="${ this.showtips && ! this.disabled ? this.defaultValue : '' }"
                prefix="${ this.prefix }"
                suffix="${ this.suffix }"
            >
                <input
                    type="range"
                    id="slider"
                    min="${ this.min }"
                    max="${ this.max }"
                    step="${ this.step }"
                    value="${ this.defaultValue }"
                    ${ this.disabled ? 'disabled' : '' }
                >    
            </k-tip>
        `;
    }

    focus() {
        this.slider.focus();
    }

    get value() {
        return Number( this.slider.value );
    }

    get suffix() {
        return this.getAttribute("suffix") || '';
    }

    get prefix() {
        return this.getAttribute("prefix") || '';
    }

    get min() {
        return this.getAttribute("min") ?? 0;
    }

    get max() {
        return this.getAttribute("max") ?? 100;
    }

    get step() {
        return this.getAttribute("stop") || 1;
    }

    get defaultValue() {
        return this.getAttribute("defaultValue") || 0;
    }

    get disabled() {
        return this.getAttribute("disabled") !== null;
    }

    get showtips() {
        return this.getAttribute("showtips") !== null;
    }

    set disabled(val) {
        if( val === null || val === false ) {
            this.removeAttribute("disabled");
        } else {
            this.setAttribute("disabled", '');
        }
    }

    set showtips( val ) {
        if( val === null || val === false ) {
            this.removeAttribute("showtips");
        } else {
            this.setAttribute("showtips", '' );
        }
    }

    set value(val) {
        this.slider.value = val;
        this.sliderContainer.tip = val;
        this.sliderContainer.style.setProperty("--percent", (this.value - this.min) / (this.max - this.min) );
    }

    connectedCallback() {
        this.slider = this.shadowRoot.getElementById("slider");
        this.sliderContainer = this.shadowRoot.getElementById("slider-container");

        if( this.value !== undefined ) this.value = this.value;

        this.slider.addEventListener("input", e => {
            this.value = this.slider.value;
            this._oninput = true;
            e.stopPropagation();
            this.dispatchEvent(new CustomEvent('input', {
                detail: {
                    value: this.slider.value
                }
            }));
        });

        this.slider.addEventListener("change", e => {
            this.value = this.slider.value;
            this._oninput = false;

            this.dispatchEvent(new CustomEvent('change', {
                detail: {
                    value: this.slider.value
                }
            }));
        });

        /*
        为什么不直接监听 slider， 而是要用父元素来监听slider的wheel?
         */
        this.addEventListener("wheel", e => {
            // Slider focused
            if( getComputedStyle(this.slider).zIndex == 2 ) {
                e.preventDefault();
                if( e.deltaY < 0 || e.deltaY > 0 ) {
                    this.value -= this.step * 5;
                } else {
                    this.value += this.step * 5;
                }

                this.dispatchEvent(new CustomEvent("change", {
                    detail: {
                        value: this.value
                    }
                }));
            }
        }, true );
    }

    attributeChangedCallback( name, oldValue, newValue ) {
        console.log( this.slider, this._oninput );
        if( this.slider && oldValue !== newValue && ! this._oninput ) {
            if( name === 'disabled' ) {
                if( newValue !== null ) {
                    this.slider.setAttribute('disabled', '');
                } else {
                    this.slider.removeAttribute("disabled");
                }
            } else {
                console.log( name );

            }
        }
    }
}

if( ! customElements.get("k-slider") ) {
    customElements.define("k-slider", KSlider );
}