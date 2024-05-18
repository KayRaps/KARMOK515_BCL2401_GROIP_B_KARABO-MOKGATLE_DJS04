class OverlayComponent extends HTMLElement {
    connectedCallback() {
      this.render();
    }
  
    open() {
      this.setAttribute('open', '');
    }
  
    close() {
      this.removeAttribute('open');
    }
  
    render() {
      const content = this.innerHTML;
      this.innerHTML = `
        <style>
          .overlay {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            justify-content: center;
            align-items: center;
          }
          .overlay[open] {
            display: flex;
          }
          .overlay__content {
            background: white;
            padding: 1rem;
            border-radius: 8px;
            width: 80%;
            max-width: 600px;
          }
        </style>
        <div class="overlay" ${this.hasAttribute('open') ? 'open' : ''}>
          <div class="overlay__content">
            ${content}
          </div>
        </div>
      `;
    }
  }
  
  customElements.define('overlay-component', OverlayComponent);
  