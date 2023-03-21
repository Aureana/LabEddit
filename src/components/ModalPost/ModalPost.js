import Header from "../../components/Header/Header"
import axios from "axios"
import { useContext } from "react"
import { GlobalContext } from "../../context/GlobalContext"
import { StyleContainerModal, StyleSection } from "./styleModalPost"
import like from "../../assets/like.svg"
import dislike from "../../assets/dislike.svg"
import comment from "../../assets/comment.svg"
import { useEffect, useState } from "react"
import { BASE_URL } from "../../constants/BASE_URL"

function ModalPost(props) {

    const context = useContext(GlobalContext)
    const [post, setPost] = useState({})
    const [postByID, setPostByID] = useState({})
    const [comments, setComments] = useState([])
    const [content, setContent] = useState('')
    const { urlPost } = context

    useEffect(() => {
        browserPost()
        getPostById()
        getCommentsByPostId()
        //console.log(post)   
    },
        [])


    const browserPost = async () => {
        try {
            let auxPost = ''
            const response = await axios.get(`${BASE_URL}/posts/${urlPost}`, {
                headers: {
                    Authorization: window.localStorage.getItem("token")
                }
            })
            auxPost = response.data[0]
            // console.log("Post", response.data[0])
            setPost(auxPost)
        } catch (error) {
            console.log(error)
        }
    }

    const getPostById = async () => {
        //renderiza as publicações.
        try {
            context.setLoading(true)
            const response = await axios.get(`${BASE_URL}/posts`, {
                headers: {
                    Authorization: window.localStorage.getItem("token")
                }
            })
            //context.setPosts(response.data)
            //context.setLoading(false)

            const get = response.data.filter((post) => {

                return post.id === context.urlPost

            })
            setPostByID(get[0])
            //console.log(postByID)


        } catch (error) {
            console.log(error)
            context.setLoading(false)
        }
    }


    const likePost = async (postId) => {
        try {
            let body = {
                like: 1,
            }
            await axios.put(`${BASE_URL}/posts/${postId}/like`, body, {
                headers: {
                    Authorization: window.localStorage.getItem("token")
                }
            })
            browserPost()
            props.browserPosts()
        } catch (error) {
            console.log(error)
        }
    }


    const dislikePost = async (postId) => {
        try {
            let body = {
                like: 0,
            }
            await axios.put(`${BASE_URL}/posts/${postId}/like`, body, {
                headers: {
                    Authorization: window.localStorage.getItem("token")
                }
            })
            browserPost()
            props.browserPosts()
        } catch (error) {
            console.log(error)
        }
    }

    const insertOtherPost = async () => {
        // console.log(`${BASE_URL}/comments/${urlPost}`)
        try {
            let body = {
                content

            }
            await axios.post(`${BASE_URL}/comments/${urlPost}`, body, {
                headers: {
                    Authorization: window.localStorage.getItem("token")
                }
            })
            setContent('')
            browserPost()
            props.browserPosts()

        } catch (error) {
            console.log(error)
        }
    }

    const getCommentsByPostId = async () => {
        //renderiza as publicações.
        try {
            context.setLoading(true)
            const response = await axios.get(`${BASE_URL}/comments/`, {
                headers: {
                    Authorization: window.localStorage.getItem("token")
                }
            })
            let commentByPostId = []
            for (const comment of response.data) {
                if (comment.postId === context.urlPost) {
                    commentByPostId.push(comment)

                }

            }
            setComments(commentByPostId)
            //   const get = response.data.filter((comments)=>{
            //     console.log(context.urlPost)


            //})
            //setComments(get)
            //    setPostByID(get[0])
            //console.log(comments)

        } catch (error) {
            console.log(error)
            context.setLoading(false)
        }
    }

    return (
        <>
            <StyleContainerModal>
                <Header />
                <StyleSection>

                    <div>
                        <article>
                            <p className="subText">Enviado por: {postByID && postByID?.creator?.name}</p>
                            <p>{postByID.content}</p>
                            <p className="menuDoPost">
                                <span className="subTextBold">
                                    <img src={like} onClick={() => likePost(post.id)} alt="botão-like" />
                                    {postByID.likes}
                                    <img src={dislike} onClick={() => dislikePost(post.id)} alt="botão-dislike" />
                                </span>
                                <span className="subText">
                                    <img src={comment} alt="botãoComentários" />
                                    {post.comments}

                                </span>
                            </p>
                        </article>
                        <input value={content} onChange={(event) => setContent(event.target.value)} className="InputPost" placeholder="Escreva seu comentário..." />
                        <button onClick={() => { insertOtherPost() }}>Responder</button>
                    </div>




                    {/* comentários da publicação */}
                    <div>
                        {/* {post && post?.comments_post?.map((comment) => { */}
                        {comments.map((comment) => {

                            return (
                                <article key={comment.id}>
                                    {/* puxar o nome do criador do comentário */}
                                    <p className="subText">Enviado por: {comment.userName}</p>
                                    {console.log("creator", comment)}
                                    <p>{comment.comments}</p>
                                    <p className="menuDoPost">
                                        <span className="subTextBold">
                                            <img src={like} onClick={() => likePost(comment.id)} alt="botão-like" />
                                            {comment.likes}
                                            <img src={dislike} onClick={() => dislikePost(comment.id)} alt="botão-dislike" />
                                        </span>
                                    </p>
                                </article>
                            )
                        })}
                    </div>
                </StyleSection>
            </StyleContainerModal>
        </>
    )
}

export default ModalPost