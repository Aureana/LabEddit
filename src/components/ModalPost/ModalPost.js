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

    useEffect(() => { //roda na primeira renderização
        getPostById()
        getCommentsByPostId()
    }, []) 


    const getPostById = async () => {
        //renderiza as publicações.
        try {
            context.setLoading(true)
            const response = await axios.get(`${BASE_URL}/posts`, {
                headers: {
                    Authorization: window.localStorage.getItem("token")
                }
            })

            const get = response.data.filter((post) => {

                return post.id === context.urlPost

            })
            setPostByID(get[0])
           

        } catch (error) {
            console.log(error)
            context.setLoading(false)
        }
    }


    const likeOrDislike = async (id, likeDislike, path) => { //para like e dislike tanto p post como p comentários
        try {
            let body = {
                like: likeDislike
            }
            await axios.put(`${BASE_URL}/${path}/${id}/like`, body, {
                headers: {
                    Authorization: window.localStorage.getItem("token")
                }
            })
            if (path === "posts") {
                getPostById()
            } else {
                getCommentsByPostId()
            }

        } catch (error) {
            console.log(error)
        }
    }

    const insertOtherPost = async () => {
       
        try {
            let body = {
                comments: content
            }
            await axios.post(`${BASE_URL}/comments/${urlPost}`, body, {
                headers: {
                    Authorization: window.localStorage.getItem("token")
                }
            })
            setContent('')
            getCommentsByPostId()

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
                                    <img src={like} onClick={() => likeOrDislike(postByID.id, true, "posts")} alt="botão-like" />
                                    {postByID.likes}
                                    <img src={dislike} onClick={() => likeOrDislike(postByID.id, false, "posts")} alt="botão-dislike" />
                                </span>
                                <span className="subText">
                                    <img src={comment} alt="botãoComentários" />
                                    {comments.length}

                                </span>
                            </p>
                        </article>
                        <input value={content} onChange={(event) => setContent(event.target.value)} className="InputPost" placeholder="Escreva seu comentário..." />
                        <button onClick={() => { insertOtherPost() }}>Responder</button>
                    </div>


                    {/* comentários da publicação */}
                    <div className="comments">
                        {comments.map((comment) => {

                            return (
                                <article key={comment.id}>
                                    {/* puxar o nome do criador do comentário */}
                                    <p className="subText">Enviado por: {comment.userName}</p>
                                    <p>{comment.comments}</p>
                                    <p className="menuDoPost">
                                        <span className="subTextBold">
                                            <img src={like} onClick={() => likeOrDislike(comment.id, true, "comments")} alt="botão-like" />
                                            {comment.likes}
                                            <img src={dislike} onClick={() => likeOrDislike(comment.id, false, "comments")} alt="botão-dislike" />
                                        </span>
                                    </p>
                                </article>
                            )
                        }).reverse()}
                        {/* os comentários aparecem em cima */}
                    </div>
                </StyleSection>
            </StyleContainerModal>
        </>
    )
}

export default ModalPost