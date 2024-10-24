const {nanoid} = require('nanoid');
const books = require('./books');

const addBookHandler = (request, h) =>{
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

    const id = nanoid(16);
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;
    var finished = undefined;

    if(pageCount === readPage){
        finished = true;
    }else{
        finished = false;
    }

    if (!name) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. Mohon isi nama buku',
        });
        response.code(400);
        return response;
    }
    
    if (readPage > pageCount) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
        });
        response.code(400);
        return response;
    }

    const newBook = {
        id, name, year, author, summary, publisher, pageCount, readPage, finished, reading, insertedAt, updatedAt
    };

    var beforePushLength = books.length;

    books.push(newBook);

    var afterPushLength = books.length;

    if (afterPushLength > beforePushLength) {
        const response = h.response({
          status: 'success',
          message: 'Buku berhasil ditambahkan',
          data: {
            bookId: id,
          },
        });
        response.code(201);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Buku gagal ditambahkan',
    });

    response.code(200);
    return response;
};

const getAllBooksHandler = (request, h) => {
    if('name' in request.query){
        const {name} = request.query;
        const resultNameSearch = [];

        for(let book of books){
            const bookName = book.name.toLowerCase();
            if(bookName.includes(name.toLowerCase())){
                resultNameSearch.push(book);
            }
        }

        if (!resultNameSearch.length) {
            const response = h.response({
                status: 'success',
                message: 'Buku tidak ditemukan',
            });
        
            response.code(204);
            return response;
        }

        const response = h.response({
            status: 'success',
            message: 'Buku berhasil ditemukan',
            data: {
                books: resultNameSearch.map(book => ({ 
                    id: book.id,
                    name: book.name,
                    publisher: book.publisher,
                })),
            },
        });
        response.code(200);
        return response;

    }else if('reading' in request.query){
        const { reading } = request.query;
        var resultReadingStatusSearch = [];

        if(reading === '0'){
            for(let book of books){
                if(book.reading === false){
                    resultReadingStatusSearch.push(book);
                }
            }
        }else if(reading === '1'){
            for(let book of books){
                if(book.reading === true){
                    resultReadingStatusSearch.push(book);
                }
            }
        }else{
            const response = h.response({
                status: 'success',
                message: 'Semua buku dikembalikan',
                data: {
                    books: books.map(book => ({ 
                        id: book.id,
                        name: book.name,
                        publisher: book.publisher,
                    })),
                },
            });
            response.code(200);
            return response;
        }

        if (!resultReadingStatusSearch) {
            const response = h.response({
                status: 'success',
                message: 'Buku tidak ditemukan',
            });
        
            response.code(204);
            return response;
        }

        const response = h.response({
            status: 'success',
            message: 'Buku berhasil ditemukan',
            data: {
                books: resultReadingStatusSearch.map(book => ({ 
                    id: book.id,
                    name: book.name,
                    publisher: book.publisher,
                })),
            },
        });
        response.code(200);
        return response;

    }else if('finished' in request.query){
        const {finished} = request.query;
        const resultFinishedStatusSearch = [];
    
        if(finished === '0'){
            for(let book of books){
                if(book.finished === false){
                    resultFinishedStatusSearch.push(book);
                }
            }
        }else if(finished === '1'){
            for(let book of books){
                if(book.finished === true){
                    resultFinishedStatusSearch.push(book);
                }
            }
        }else{
            const response = h.response({
                status: 'success',
                message: 'Semua buku dikembalikan',
                data: {
                    books: books.map(book => ({ 
                        id: book.id,
                        name: book.name,
                        publisher: book.publisher,
                    })),
                },
            });
            response.code(200);
            return response;
        }
    
        if (!resultFinishedStatusSearch) {
            const response = h.response({
                status: 'success',
                message: 'Buku tidak ditemukan',
            });
        
            response.code(204);
            return response;
        }
    
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil ditemukan',
            data: {
                books: resultFinishedStatusSearch.map(book => ({ 
                    id: book.id,
                    name: book.name,
                    publisher: book.publisher,
                })),
            },
        });
        response.code(200);
        return response;
    }else{
        const response = h.response({
            status: 'success',
            data: {
                books: books.map(book => ({ 
                    id: book.id,
                    name: book.name,
                    publisher: book.publisher,
                })),
            },
        });
        response.code(200);
        return response;
    }
};

const getBookByIdHandler = (request, h) => {
    const { id } = request.params;
    const book = books.filter((book) => book.id === id)[0];

    if (book !== undefined) {
        const response = h.response({
            status: 'success',
            data:{ 
                book,
            }
        });
        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Buku tidak ditemukan',
    });
    response.code(404);
    return response;
};

const editBookByIdHandler = (request, h) => {
    const { id } = request.params;
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
    const updatedAt = new Date().toISOString();

    const index = books.findIndex((book) => book.id === id);

    if (!name) {
        const response = h.response({
          status: 'fail',
          message: 'Gagal memperbarui buku. Mohon isi nama buku',
        });
        
        response.code(400);
        return response;
    }

    if (readPage > pageCount) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
        });
        response.code(400);
        return response;
    }

    if (index !== -1) {
        books[index] = {
          ...books[index],name, year, author, summary, publisher, pageCount, readPage, reading, updatedAt,
        };

        const response = h.response({
          status: 'success',
          message: 'Buku berhasil diperbarui',
        });

        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Id tidak ditemukan',
    });

    response.code(404);
    return response;
};

const deleteBookByIdHandler = (request, h) => {
    const { id } = request.params;
    const index = books.findIndex((book) => book.id === id);

    if (index !== -1) {
        books.splice(index, 1);
        const response = h.response({
          status: 'success',
          message: 'Buku berhasil dihapus',
        });

        response.code(200);
        return response;
    }
     
    const response = h.response({
        status: 'fail',
        message: 'Buku gagal dihapus. Id tidak ditemukan',
    });

    response.code(404);
    return response;
};

module.exports = { addBookHandler, getAllBooksHandler, getBookByIdHandler, editBookByIdHandler, deleteBookByIdHandler };