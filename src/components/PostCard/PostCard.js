import { useContext } from "react"
import {GlobalContext} from "../../context/GlobalContext"
import axios from "axios"
import { BASE_URL } from "../../constants/BASE_URL"
import like from "../../assets/like.svg"
import dislike from "../../assets/dislike.svg"
import comment from "../../assets/coment.svg"

function PostCard (props){
    const context = useContext(GlobalContext)

    const showPost = (postId)=>{
        context.setUrlPost(postId)
        context.setModal(true)
        context.setActionModal("post")
    }

    const likePost = async (postId)=>{
        try {
            let body = {
                like: true,
            }
            await axios.put(`${BASE_URL}/posts/${postId}/like`,body,{
                headers:{
                    Authorization:window.localStorage.getItem("token")
                }})
            props. handlePosts()
        } catch (error) {
            console.log(error)
        }
    }

    const dislikePost = async (postId)=>{
        try {
            let body = {
                like: false,
            }
            await axios.put(`${BASE_URL}/posts/${postId}/like`,body,{
                headers:{
                    Authorization:window.localStorage.getItem("token")
                }})
            props. handlePosts()
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <article>
        <p className="subText">Enviado por: {props.post.creator.username}</p>
        <p>{props.post.content}</p>
        <p className="menuDoPost">
            <span className="subTextBold">
                <img src={like} onClick={()=>likePost(props.post.id)} alt="botão-like"/>
                {props.post.likes}
                <img src={dislike} onClick={()=>dislikePost(props.post.id)} alt="botão-dislike"/> 
            </span> 
            <span className="subText" onClick={()=>showPost(props.post.id)}>
                <img src={comment} alt="botãoComentários" />
                {props.post.comments}
            </span>
        </p>
    </article>
    )
}

export default PostCard