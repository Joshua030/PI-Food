import { useState } from "react";



export const usePagination = (data)=> {
    // User is currently on this page
const [currentPage, setCurrentPage] = useState(1);
// No of Records to be displayed on each page   
const [recordsPerPage] = useState(9);

const indexOfLastRecord = currentPage * recordsPerPage;
const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
const nPages = Math.ceil(data.length / recordsPerPage)
const pageNumbers = [...Array(nPages + 1).keys()].slice(1)
const nextPage = (e) => {
    if(currentPage !== nPages) 
        setCurrentPage(currentPage + 1)
}
const prevPage = (e) => {
    if(currentPage !== 1) 
        setCurrentPage(currentPage - 1)
}

const choosedPage = (number) => {
    setCurrentPage(number)
}
return {
   prevPage,
   nextPage, 
   pageNumbers,
   choosedPage,
   indexOfFirstRecord,
   indexOfLastRecord
}
}
   