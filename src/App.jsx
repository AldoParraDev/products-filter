import { useEffect } from "react";
import "./App.css";
import { useState } from "react";

function App() {
   const [data, setData] = useState([]);
   const [textSearch, setTextSearch] = useState("");
   const [page, setPage] = useState(0);
   const [rowsPerPage, setRowsPerPage] = useState(8);
   const [dataFiltered, setDataFiltered] = useState(data);

   const getDataFromPlatzi = async () => {
      try {
         const res = await fetch("https://api.escuelajs.co/api/v1/products");
         const data = await res.json();
         setData(data);
      } catch (error) {
         console.log(error);
      }
   };

   useEffect(() => {
      getDataFromPlatzi();
   }, []);

   const handlePrevPage = () => {
      if (page === 0) return;
      setPage(page - 1);
   };
   const handleNextPage = () => {
      setPage(page + 1);
   };

   const handleChange = (evt) => {
      setTextSearch(evt.target.value);
   };

   useEffect(() => {
      const handleFilteredData = () => {
         if (textSearch === "") {
            setDataFiltered(data);
         } else {
            const filteredSearch = data.filter((item) =>
               item.title.toLowerCase().includes(textSearch.toLowerCase())
            );
            setDataFiltered(filteredSearch);
         }
      };
      handleFilteredData();
   }, [textSearch, data]);

   return (
      <main className="px-[5%] w-full flex flex-col items-center justify-center">
         <header className="flex flex-col items-center justify-center gap-[.5rem] mb-[1rem]">
            <h1 className="text-[2rem]">Busqueda de productos</h1>
            <input
               className="h-[30px] flex items-center justify-center px-[8px]"
               type="text"
               placeholder="Buscar productos..."
               onChange={handleChange}
            />
            <div className="flex items-center justify-center gap-[1rem]">
               <button
                  className="px-[12px] py-[5px] bg-green-400 text-black rounded-[5px]"
                  onClick={handlePrevPage}
               >
                  Anterior
               </button>
               <button
                  className="px-[12px] py-[5px] bg-green-400 text-black rounded-[5px]"
                  onClick={handleNextPage}
               >
                  Siguiente
               </button>
            </div>
         </header>
         <section className="w-full flex flex-col">
            <div className="w-full grid grid-cols-4 grid-flow-row gap-[20px]">
               {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item, index) => (
                     <article key={index} className="card-product">
                        <h3> {item.title} </h3>
                        <p> {item.description} </p>
                        <img
                           className="h-[150px] w-full object-cover"
                           src={item.images[0]}
                           alt="image"
                        />
                     </article>
                  ))}
            </div>
         </section>
      </main>
   );
}

export default App;
