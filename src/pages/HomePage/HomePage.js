import Header from "../../components/Header/Header"
import axios from "axios"
import { StyleMain, StyleSection } from "../../constants/stylePages"
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import {GlobalContext} from "../../context/GlobalContext"
import { goToLoginPage } from "../../router/coordinator"
import ModalPost from "../../components/ModalPost/ModalPost"
import PostCard from "../../components/PostCard/PostCard"
import { BASE_URL } from "../../constants/BASE_URL" 

function HomePage(){

    const context = useContext(GlobalContext)
    const navigate = useNavigate()
    const [content, setContent] = useState('') //armazenar dados de publicação.

  
    useEffect(()=>{
        handlePosts()
        
      
    },[])

   
    // useEffect(()=>{  // verifica se há o Token armazenado no localStorage.Senão, retorna para LoginPage
    //     const token = window.localStorage.getItem("token")
    //     if(!token){
    //         goToLoginPage(navigate)
    //     }
    // },[])

   
    const handlePosts = async()=>{
         //renderiza as publicações.
        try {
            context.setLoading(true)
            const response = await axios.get(`${BASE_URL}/posts`,{
                headers: {
                    Authorization: window.localStorage.getItem("token")
                }
            }) 
            context.setPosts(response.data)
            context.setLoading(false)

           // console.log(response.data)
        } catch (error) {
            console.log(error)
            context.setLoading(false)
        }
    }

    
    const insertOtherPost = async () =>{
        
        try {  

            let body = {
                content,
            }

            await axios.post(`${BASE_URL}/posts`,body,{
                headers:{
                    Authorization:window.localStorage.getItem("token")
                }})  
            handlePosts() 
            setContent('')        
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <>
            {context.modal ? 
            <section className="boxOverlay" />
            : 
            ''}
            <Header/>
            <StyleMain>
                {context.modal && context.actionModal === "post" ? 
                <>           
                                         
                        <ModalPost
                postId={context.urlPosts}
                posts={context.posts}
                handlePosts={handlePosts}/>                
                
                </>
                : 
                ''}

                <StyleSection>
                    <div>
                        <input value={content} onChange={(event)=>setContent(event.target.value)} className="InputPost" placeholder="Escreva seu post..."/>
                        <button onClick={()=>insertOtherPost()}>Postar</button>
                    </div>
                    <div>
                        {context.loading ?
                        'Loading...' 
                        :
                        context.posts && context?.posts?.map((post)=> {
                            
                            return(                                                      
                            <PostCard key={post.id}
                            post={post}
                            handlePosts={handlePosts}/>
                        )})}
                    </div>
                </StyleSection>
            </StyleMain>
        </>
    )
}

export default HomePage