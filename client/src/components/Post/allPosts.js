import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts } from '../../actions/Post.action';
// import { NavLink } from 'react-router-dom';
import { isEmpty } from '../outils'
import CardAllPosts from './cardAllPosts';


const AllPosts = () => {
    const [count, setCount] = useState(5);
    const [loadPost, setLoadPost] = useState(true);
    const dispatch = useDispatch();
    const AllPosts = useSelector((state) => state.postReducer);

    const loadMore = () => {
        if (window.innerHeight + document.documentElement.scrollTop + 1 > document.scrollingElement.scrollHeight) {
            setLoadPost(true);
        }
    }
    useEffect(() => {
        if (loadPost) {
            dispatch(getAllPosts(count));
            setLoadPost(false)
            setCount(count + 5);
        }

        window.addEventListener('scroll', loadMore);
        return () => window.removeEventListener('scroll', loadMore)
    }, [loadPost, dispatch, count])

    return (
        <section id="Post">
            <div className="titre-section">
                <img className="logo-post" src="logo/icon.png" alt="logo d'entreprise" />
                <h2>Fil d'actualité</h2>
            </div>
            {!isEmpty(AllPosts[0]) &&
                AllPosts.map((post) => {
                    // console.log(post.id);
                    return <CardAllPosts post={post} key={post.id} />
                })
            }

        </section>
    )
};
export default AllPosts;
