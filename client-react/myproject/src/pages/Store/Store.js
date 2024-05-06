
import { useState, useEffect } from "react";
import "./Store.css"
const Store = () => {
  const [books, setBooks] = useState(new Array);
  const [selectedBook, setSelectedBook] = useState(null);

  async function showBook() {
    try {
      const response = await fetch("http://localhost:7002/api/books");
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.log("failed to fetch");
    }
  }

  useEffect(() => {
    showBook();
  }, []);

  const deleteBook = (book) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      code: book._id
    });

    var requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch("http://localhost:7002/api/books", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        alert(result);
        setBooks((prevCartItems) =>
          prevCartItems.filter((item) => item._id !== book._id)
        );
      })
      .catch((error) => console.log("error", error));
  };

  const updateBook = (book) => {
    setSelectedBook(book);
    document.getElementById("dialog").showModal();
  };

  useEffect(() => {
    if (selectedBook) {
      document.getElementById("name").value = selectedBook.name;
      document.getElementById("code").value = selectedBook.code;
      document.getElementById("price").value = selectedBook.price;
      document.getElementById("author").value = selectedBook.author;
      document.getElementById("image").value = selectedBook.image;
      document.getElementById("type").value = selectedBook.type;
    }
  }, [selectedBook]);
  
  const update = async (book) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      name: book.name,
      code: book.code,
      price: book.price,
      author: book.author,
      image: book.image,
      type:book.type
    });

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch("http://localhost:7002/api/books", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        setBooks((prevBooks) => {
          const updatedBooks = [...prevBooks];
          const updatedIndex = updatedBooks.findIndex(
            (book) => book.code === selectedBook.code
          );
          updatedBooks[updatedIndex] = {
            ...updatedBooks[updatedIndex],
            name: book.name,
            code: book.code,
            price: book.price,
            author: book.author,
            image: book.image,
            type:book.type
          };
          return updatedBooks;
        });
      })
      .catch((error) => console.log("error", error));

    document.getElementById("dialog").close();
  };

  const cancel = () => {
    document.getElementById("dialog").close();
  };

const addNewBook=()=>{

  var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "name":document.getElementById("name").value ,
  "code":document.getElementById("code").value ,
  "price":document.getElementById("price").value ,
  "author":document.getElementById("author").value,
  "image":document.getElementById("image").value ,
  "type":document.getElementById("type").value 
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("http://localhost:7002/api/books", requestOptions)
  .then(response => response.text())
  .then((result) => {
    alert(result);
 
  })
  .catch(error => console.log('error', error));
  
  document.getElementById("dialog").close();

}
  return (
    <>
    <div className="="container>
     <img src="w.jpg"  style={{ heignt: "180px", width: "180px", fontFamily: "initial" }}></img>
      <button id="new" onClick={() => updateBook({})}>Add New Book</button>

      {books &&
        books.map((book, index) => {
          return (
            <div className="book-wrapper" key={book._id}>
              <img
                src={book.image}
                style={{ heignt: "150px", width: "200px", fontFamily: "initial" }}
              ></img>
              <div className="book-info">{book.name + " | " + book.price + "₪"}</div>
             <div className="button-group">
              <button key={index} onClick={() => updateBook(book)}>Edit</button>
              <button onClick={() => deleteBook(book)}>Remove</button>
              </div>
              <dialog id="dialog" >
                <h1>Add/Edit-Book</h1>
              Name <br></br><input id="name" placeholder="name" defaultValue={selectedBook ? selectedBook.name : ""} onBlur={(e) =>
                    setSelectedBook({
                      ...selectedBook,
                      name: e.target.value
                    })}></input>
        
                <br></br>
                Code
                <br></br>
                <input id="code" placeholder="code"
               
                  defaultValue={selectedBook ? selectedBook.code : ""}
                  onBlur={(e) =>
                    setSelectedBook({
                      ...selectedBook,
                      code: e.target.value
                    })
                  }
                ></input>
                <br></br>
                Price
                <br></br>
                <input id="price" placeholder="price"
                  defaultValue={selectedBook ? selectedBook.price : ""}
                  onBlur={(e) =>
                    setSelectedBook({
                      ...selectedBook,
                      price: e.target.value
                    })
                  }
                ></input>
                <br></br>
                Type
                <br></br>
                <input id="type" placeholder="type"
                  defaultValue={selectedBook ? selectedBook.type : ""}
                  onBlur={(e) =>
                    setSelectedBook({
                      ...selectedBook,
                      type: e.target.value
                    })
                  }
                ></input>
                <br></br>
                Author
                <br></br>

                <textarea id="author" placeholder="author"
                  defaultValue={selectedBook ? selectedBook.author : ""}
                  onBlur={(e) =>
                    setSelectedBook({
                      ...selectedBook,
                      author: e.target.value
                    })
                  }
                ></textarea>
                <br></br>
                Image-url
                <br></br>
                <input id="image" placeholder="image url"
                  defaultValue={selectedBook ? selectedBook.image : ""}
                  onBlur={(e) =>
                    setSelectedBook({
                      ...selectedBook,
                      image: e.target.value
                    })
                  }
                ></input>
                <br></br>
                <img
                  src={selectedBook ? selectedBook.image : ""}
                  style={{ heignt: "150px", width: "200px", fontFamily: "initial" }}
                ></img>
                <br></br>
                <button onClick={() => update(selectedBook)}>edit</button>
                <button onClick={() =>addNewBook()}>create</button>
                <button onClick={cancel}>cancel</button>
              </dialog>
             
            </div>
          );
        })}
        </div>
    </>
  );
};

export default Store