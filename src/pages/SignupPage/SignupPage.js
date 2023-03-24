import Header from "../../components/Header/Header"
import axios from "axios"
import { StyleMain, StyleSectionLoginSignup } from "../../constants/stylePages"
import { goToHomePage } from "../../router/coordinator"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { BASE_URL } from "../../constants/BASE_URL"

function SignupPage (){
    const navigate = useNavigate()
    const [msgErro, setMsgErro] = useState("")
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
    }) 


    const onChangeForm = (event)=>{
        setForm({ ...form, [event.target.name]: event.target.value })
    }

   
    const signUp = async ()=>{
        try {

            let body ={
                name: form.name,
                email: form.email,
                password: form.password,
            }
            console.log({body})
            const response = await axios.post(`${BASE_URL}/users/signup`, body)
            window.localStorage.setItem("token", response.data.token)
            goToHomePage(navigate)
        } catch (error) {
            setMsgErro(error.response.data)
            console.log(error)
        }
    }

    return(
        <>
        <Header/>
        <StyleMain>
            <StyleSectionLoginSignup>
                <div>
                    <h1>Olá, Boas vindas ao LabEddit ;)</h1>
                </div>
                <div>
                    <input value={form.name} name="name" onChange={onChangeForm} placeholder="Apelido"/>
         
                    <input value={form.email} name="email" onChange={onChangeForm} placeholder="E-mail"/>
                    <input value={form.password} name="password" onChange={onChangeForm}  type="password" placeholder="Senha"/>  
                    {msgErro === "'email' já existe"? <p> E-mail já cadastrado! </p> : null}
                    {msgErro === "ERROR: 'email' deve ser tipo: 'example@example.example'."? <p> Digite um email válido,'exemplo@exemplo.exemplo' </p> : null}
                    {msgErro === "ERROR: 'Senha' deve conter pelo menos 8 caracteres com pelo menos uma letra maiúscula, pelo menos um número, e um carácter especial'."? <p> 'Senha' deve conter pelo menos 8 caracteres com pelo menos uma letra maiúscula, pelo menos um número, e um carácter especial'." </p> : null}
                    
                           
                </div>
                <div>
                    <p>Ao continuar, você concorda com o nosso <a href="#">Contrato de usuário</a> e nossa <a href="#">Politica de Privacidade</a></p>
                    <p>
                        <span>
                            <input className="CheckBox" type="checkbox"/>
                            <label>Eu concordo em receber e-mails sobre coisas legais no Labeddit</label>
                        </span>
                    </p>
                    <button onClick={()=>signUp()}>Cadastrar</button>
                </div>
            </StyleSectionLoginSignup>
        </StyleMain>
        </>
    )
}

export default SignupPage