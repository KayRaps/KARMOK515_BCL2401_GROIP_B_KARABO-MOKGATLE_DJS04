class BookList extends HTMLElement {
    set books(value) {
      this._books = value;
      this.render();
    }
  
    set page(value) {
      this._page = value;
      this.render();
    }
  
    get books() {
      return this._books;
    }
  
    get page() {
      return this._page;
    }
  
    constructor() {
      super();
      this._books = [];
      this._page = 1;
      this.attachShadow({ mode: 'open' });
    }
  
    connectedCallback() {
      this.render();
    }
  
    render() {
      const booksToDisplay = this._books.slice(0, this._page * BOOKS_PER_PAGE);
      const bookPreviews = booksToDisplay.map(book => `
        <book-preview 
          author="${book.author}" 
          id="${book.id}" 
          image="${book.image}" 
          title="${book.title}">
        </book-preview>
      `).join('');
  
      this.shadowRoot.innerHTML = `
        <style>
          .book-list {
            display: grid;
            gap: 1rem;
          }
        </style>
        <div class="book-list">
          ${bookPreviews}
        </div>
        <button id="show-more">Show more (${Math.max(this._books.length - this._page * BOOKS_PER_PAGE, 0)})</button>
      `;
  
      this.shadowRoot.querySelector('#show-more').addEventListener('click', () => {
        this.page += 1;
      });
    }
  }
  
  customElements.define('book-list', BookList);
  