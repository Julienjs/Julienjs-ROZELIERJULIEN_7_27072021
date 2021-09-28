import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts } from '../../actions/post.action';
import { isEmpty } from '../outils'
import CardAllPosts from './CardAllPosts';

const AllPosts = () => {
    const [count, setCount] = useState(5);
    const [loadPost, setLoadPost] = useState(true);
    const dispatch = useDispatch();
    const AllPosts = useSelector((state) => state.postReducer);

    const loadMore = () => {
        if (window.innerHeight + document.documentElement.scrollTop + 1 > document.scrollingElement.scrollHeight) {
            setLoadPost(true);
        }
    };

    useEffect(() => {
        if (loadPost) {
            dispatch(getAllPosts(count));
            setLoadPost(false)
            setCount(count + 5);
        }
        window.addEventListener('scroll', loadMore);
        return () => window.removeEventListener('scroll', loadMore)
    }, [loadPost, dispatch, count]);


    return (
        <section id="section-post">
            <div className="section-title-post">
                <img className="img-title-post" src="logo/icon.png" alt="logo d'entreprise" />
                <h2>Fil d'actualité</h2>
            </div>
            {!isEmpty(AllPosts[0]) &&
                AllPosts.map((post) => {
                    return <CardAllPosts post={post} key={post.id} />
                })
            }
        </section>
    )
};
export default AllPosts;
