import axios from "axios";
import React, { useEffect, useState } from "react";
import {Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import React from "react";
import './PostsPage.css';
const PostsPage = () => {
    const defaultPostsData = [{ id: 0, title: "" }];
    const [informations, setInformations] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchText, setSearchText] = useState('');
    const [sortByTitle, setSortByTitle] = useState('NONE');
    useEffect(() => {
        let didCancel = false;
        axios({
            method: 'GET',
            url: `https://jsonplaceholder.typicode.com/posts`
        }).then(response => {
            if (!didCancel) {
                console.log(response);
                setInformations(response.data);
                setIsLoading(false);
            }
        })
            .catch(() => {
                if (!didCancel) {
                    setIsLoading(false);
                    setError('Something went wrong')
                }
            })
            ;
        return () => {
            didCancel = true;
        }
    }, []);
    console.log('informations = ', informations);
    if (isLoading) return (
        <div>Loading</div>
    );
    if (error) return (
        <div style={{ color: 'red' }}>{error}</div>
    )
    const informationsFilteled = informations.filter(information => information.title.toLowerCase().includes(searchText.toLocaleLowerCase()));
    const getInformationsSorted = () => {
        if (sortByTitle === 'NONE') return informationsFilteled;
        if (sortByTitle === 'ASC') return informationsFilteled.sort((information1, information2) => {
            if (information1.title.toLowerCase() < information2.title) return -1;
            if (information2.title.toLowerCase() > information2.title) return 1;
            return 0;
        })
        if (sortByTitle === 'DES') return informationsFilteled.sort((information1, information2) => {
            if (information1.title.toLowerCase() < information2.title) return 1;
            if (information2.title.toLowerCase() > information2.title) return -1;
            return 0;
        })
    }
    const removePost =(id) => {
        for (var i = 0; i < informations.length; i++) {
          if (informations[i].id === id) {
            informations.splice(i, 1);
           
          }
        }
        setInformations([...informations]);
      }
    const informationSorted = getInformationsSorted();
    const handleChangeSortByTitle = () => {
        if (sortByTitle === 'NONE') {
            setSortByTitle('ASC');
            return;
        }
        if (sortByTitle === 'ASC') {
            setSortByTitle('DES');
            return;
        }
        if (sortByTitle === 'DES') {
            setSortByTitle('NONE');
        }
    }
    return (
        <div>
            <input className="title__search-input" placeholder="Search by title" value={searchText} onChange={(evt) => setSearchText(evt.target.value)}></input>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th onClick={handleChangeSortByTitle}>Title -- Sort({sortByTitle})</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {informationSorted.map(information => (
                        <tr>
                            <td>{information.id}</td>
                            <td>{information.title}</td>
                            <td><Link to={`/post/${information.id}`}>View Detail</Link> 
                            <Button
                            key={information.id}
                                onClick={() => removePost(information.id)}
                                >
                                Remove
                            </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>

            </table>
        </div>
    )
}
export default PostsPage;