import { Button, ListGroup, ListGroupItem } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect } from 'react'
import { useState } from 'react'
import ReactPaginate from 'react-paginate';


const Issues = () => {
    
    const [issues, setIssues] = useState([]);
    const [owner] = useState("microsoft")
    const [repo] = useState("typescript")
    const [pageNumber, setPageNumber] = useState(0);

    const issuesPerPage = 5
    const pagesVisited = pageNumber* issuesPerPage
    
    const fetchIssue = async () => {
        const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/issues?state=all#`)
        const users = await response.json()
        setIssues(users);
    }

    useEffect(() => {
        fetchIssue()
    }, []);// eslint-disable-line react-hooks/exhaustive-deps


    // mapping and slicing for displaying the data on the webpage
    const displayIssue= issues
    .slice(pagesVisited, pagesVisited+issuesPerPage)// only displaying 5 per page
    .map((issue)=>{// traversing all the elements
        // Destructuring the useful items from github api
        const{user ,title, id, html_url} = issue

        return(
            <>
            <ListGroup  className='container'>
            <ListGroupItem  className='d-flex'  key = {id}>
                <div user-detail>
                    <img className='avatar' src={user.avatar_url} alt={user.login} ></img>
                    <p className='fw-bold'>{user.login}</p>
                </div>
                
                <h3 className = "issue-title" >{title}</h3>
                <Button size = "sm" className='btn fw-bold' style={{ backgroundColor: "#238636" }} href={html_url}>See this issue</Button> 
            </ListGroupItem>
            </ListGroup>
            </>
        )
    })

    // Paginate Functions
    const pageCount = Math.ceil(issues.length/issuesPerPage);
    const ChangePage = ({selected}) =>{
      setPageNumber(selected);
    }

  return (
    <>  

        <h3 className='display-heading'>Displaying issues of {owner}/{repo} repository</h3>
        {displayIssue}
        <div className='section'>

        <ReactPaginate 
        previousLabel= {"Previous"}
        nextLabel = {"Next"}
        pageCount = {pageCount}
        onPageChange = {ChangePage}
        containerClassName = {"paginationBtn"}
        previousLinkClassName = {"previousBtn"}
        nextLinkClassName = {"nextBtn"}
        activeLinkClassName = {"paginationActive"}
        />
        </div>
        
    </>
  )
}

export default Issues