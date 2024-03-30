class SearchBar extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({mode: 'open'});

        this.shadowRoot.innerHTML = `
            <style>
                search-bar {
                    display: flex;
                    margin-bottom: 10px;
                    position: relative;                    
                    justify-content: center;
                }

                #search {
                    border: 1px solid #ccc;
                    border-radius: 5px;
                    padding: 5px;
                    width: 80%;
                }

                button {
                    --color: black;
                    font-family: inherit;
                    display: inline-block;
                    width: 8em;
                    height: 2.6em;
                    line-height: 2.5em;
                    margin: 20px;
                    position: relative;
                    overflow: hidden;
                    border: 2px solid var(--color);
                    transition: color .5s;
                    z-index: 1;
                    font-size: 17px;
                    border-radius: 6px;
                    font-weight: 500;
                    color: var(--color);
                   }
                   
                   button:before {
                    content: "";
                    position: absolute;
                    z-index: -1;
                    background: var(--color);
                    height: 150px;
                    width: 200px;
                    border-radius: 50%;
                   }
                   
                   button:hover {
                    color: #fff;
                   }
                   
                   button:before {
                    top: 100%;
                    left: 100%;
                    transition: all .7s;
                   }
                   
                   button:hover:before {
                    top: -30px;
                    left: -30px;
                   }
                   
                   button:active:before {
                    background: #3a0ca3;
                    transition: background 0s;
                   }

            </style>
            <div id="search-bar">
                <input id="search" type="text" required/>
                <button id="searchButton">Search</button>
            </div>`;
        } 

            connectedCallback(){
                this.shadowRoot.getElementById('searchButton').addEventListener('click', () => {
                    const searchTerm = this.shadowRoot.getElementById('search').value;
                });
            }
}
customElements.define('search-bar', SearchBar);
