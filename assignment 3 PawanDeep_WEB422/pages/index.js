/**********************************************************************************  
 * WEB422 – Assignment 3
 * I declare that this assignment is my own work in accordance with Seneca Academic Policy.  
 * No part of this assignment has been copied manually or electronically from any other source
 * (including web sites) or distributed to other students.
 * Name: __Pawan Deep___ Student ID: ___111144218___ Date: 10-14-2022
 * 
 * 
 * *********************************************************************************/

import useSWR from 'swr';
import { useState, useEffect } from "react";
import {Accordion, Pagination} from 'react-bootstrap';
import MovieDetails from "../components/MovieDetails";
import PageHeader from "../components/PageHeader";
export default function Home() {
  const [ page, setPage ] = useState(1);    
  const [ pageData, setPageData ] = useState([]);
  const { data, error } = useSWR(`https://agreeable-red-clam.cyclic.app/api/movies?page=${page}&perPage=10`);
  useEffect(() => {
    if (data) {
    setPageData(data);
  }
  }, [data]);
  const previous = ()=> {
    if (page > 1) setPage(prev=> prev - 1)};
  const next = () => setPage(prev => prev + 1);  
  return (
    <>
    <strong><PageHeader  text ="Film Collection : Sorted by Date" /></strong>
    <Accordion>
      {pageData.map((movies,index) =>{
        return (
          <Accordion.Item eventKey={movies._id} key={index}>
            <Accordion.Header> 
              <strong>{movies.title}</strong> &nbsp; ({movies.year}: Directed By {movies.directors.join(', ')})
            </Accordion.Header> 
            <Accordion.Body>
              <MovieDetails movie={movies}/>
            </Accordion.Body>
          </Accordion.Item>
        )
      })}
    </Accordion>
    <br/>
    <Pagination>
      <Pagination.Prev onClick={previous}/>
      <Pagination.Item>{page}</Pagination.Item>
      <Pagination.Next onClick={next}/>
    </Pagination>
    </>
  )
}