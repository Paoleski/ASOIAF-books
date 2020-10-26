
const bookWrapper = document.querySelector('.books-wrapper');
const buttons = document.querySelectorAll('button');

    const getAll = async (event) => {
        const response = await axios.get('https://www.anapioficeandfire.com/api/books', {
        });
        const filter = event.target.dataset.filter;
        populateList(response.data, filter);
        return response.data;
    }


const populateList = (books, filter) => {
    
    if (filter === 'mainseries') {
        books = books.filter(book => book.name.startsWith('A'));
        books = books.map(book => ({...book, id:(books.indexOf(book) + 1)}));
        console.log(books);
    } else if (filter === 'dunkandegg') {
        books = books.filter(book => book.numberOfPages < 600)
        books = books.map(book => ({...book, id:(books.indexOf(book) + 1)}));
    } else {
        books = books.slice(8);
        books = books.map(book => ({...book, id:(books.indexOf(book) + 1)}));
    }
    console.log(books);
    bookWrapper.innerHTML = books.map(book => {
        const cleanedDate = new Date(book.released).toDateString();
        const author = book.authors.join(', ');
        return `
                <div class="book">
                    <div class="book-preview" id="book-1">
                        <h4 style="text-align:center;margin:0;">Book ${book.id}</h4>
                        <h2 class="book-title" >${book.name}</h6>
                        <h4 style="text-align:center;margin:0;">${author}</h4>
                        <hr>
                        <div class="book-info">
                            <p>Released on: ${cleanedDate}</p>
                            <p>Number of pages: ${book.numberOfPages}</p>
                            <p>Number of pov characters: ${book.povCharacters.length}</p>
                            <p>Number of characters: ${book.characters.length}</p>
                            <p>Publisher: ${book.publisher}</p>

                        </div>
                    </div>
                </div>
              `
    }).join(" ");

}

buttons.forEach(button => button.addEventListener('click', getAll));
