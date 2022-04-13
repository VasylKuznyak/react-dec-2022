import {useLocation, useParams} from "react-router-dom";
import {useEffect, useState} from "react";

import {postService} from "../../services";
import {PostDetails} from "../../components";

const SinglePost = () => {
    const {state} = useLocation();
    const [post, setPost] = useState(state);
    const {id} = useParams();

    useEffect(() => {
        if (!state) {
            postService.getById(id).then(({data}) => setPost(data));
        } else {
            setPost(state);
        }
    }, [id, state]);

    return (
        <div>
            {post && <PostDetails key={post.key} post={post}/>}
        </div>
    );
};

export {SinglePost};