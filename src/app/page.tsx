'use client'

import Logo from "./assets/logo.png"
import { Cog, LockKeyhole, Mail, UserRound, UserRoundCog } from "lucide-react";
import Login from "./login/page";
import { use, useEffect, useState } from "react";
import ReactPasswordChecklist from "react-password-checklist";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "./services/firebaseConfig"
import { get, ref, set } from "firebase/database";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Entrance(){

   
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [tokenState, setTokenState] = useState<boolean>(false);
  const [tokenInput, setTokenInput] = useState(''); 
  const [error, setError] = useState("");
  const [errorToken, setErrorToken] = useState("");
  const [send, setSend] = useState("");


  const navigate = useRouter();

  useEffect(() => {
    let timeout: NodeJS.Timeout;
  
    if (send) {
      timeout = setTimeout(() => setSend(""), 1000);
    }
  
    if (error) {
      timeout = setTimeout(() => setError(""), 3000);
    }

    if (errorToken) {
      timeout = setTimeout(() => setErrorToken(""), 3000);

    }
  
    return () => clearTimeout(timeout); 
  }, [send, error, errorToken]);
  

  async function handleSignup(e: any) {
    e.preventDefault();
  
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      await set(ref(db, `Usuários/${user.uid}`), {
        name: name,
        email: email,
        createdAt: new Date().toISOString(), // Corrigido
      });
  
      setSend("Usuário cadastrado com sucesso!");

      setTimeout(() => {
        navigate.push("./login");
      }, 2000);

    } catch (err: any) {
      setError("Não foi possível cadastrar!");
    }
  }

  async function handleToken() {

      try {

        const tokenRef = ref(db, "Token/tokenKey");
        const tokenSnap = await get(tokenRef);

        if (tokenSnap.exists()){
          
          const token = tokenSnap.val();
          
          if(token == tokenInput){
            
            navigate.push("./monitor");
          
          } else setErrorToken("Token inválido!");
        }


      } catch (err: any){
        setErrorToken("Não foi possível obter o Token de acesso!");
      }

  }

  function changeTokenScreen(){
    if(tokenState){
      setTokenState(false);
    } else setTokenState(true);
  }

  return (
    <>
    <div className="flex justify-center items-center w-screen h-screen bg-cover bg-center"  style={{backgroundImage: `url("https://cdn.discordapp.com/attachments/933064662822568009/1308616407801528320/bg-image.png?ex=673e9780&is=673d4600&hm=c28469290d55d8ec7eefb11f420bc97a8ef25483605c0af56c20d700f88fe4da&")`}}>
      <div className="flex w-10/12 h-5/6 bg-white rounded-l-2xl">
        <div className="flex flex-col justify-start items-center w-2/6 bg-orangeSite rounded-l-2xl hover:shadow-right-only">
            <span className="flex justify-center items-center select-none pt-8">
              <img className="w-1/2" src={Logo.src} />
            </span>

            <div className="w-1/2 pt-12 pb-14 select-none">
              <p className="font-mono font-extrabold text-2xl text-left">Bem-Vindo de Volta!</p>
              <p className="font-mono font-thin text-sm text-justify">Acesse a plataforma agora mesmo.</p>
            </div> 

            
            <button className="py-2 px-4 my-4 rounded-3 border-2 rounded-full w-2/4 hover:animate-pulse select-none transition ease-in-out delay-100 hover:scale-110 hover:bg-white hover:text-orangeSite hover:border-orangeSite hover:animate-pulse">
              <Link href="./login" className="font-mono  text-2xl">ENTRAR</Link>
            </button>

            {!tokenState &&
              <button className="flex justify-center items-center py-12 gap-1 select-none" onClick={changeTokenScreen}>
              <div className="flex flex-row justify-center items-center bg-white p-1 rounded-xl">
                <UserRoundCog color="#E77A00"/>
              </div>
              <p className="font-mono p-1 px-2 transition easy-in-out delay 150 rounded-xl hover:bg-white hover:text-orangeSite">Token para manutenção</p>
              </button> 
            }

            {tokenState &&
              <button className="flex justify-center items-center py-12 gap-1 select-none" onClick={changeTokenScreen}>
              <div className="flex flex-row justify-center items-center bg-white p-1 rounded-xl">
                <UserRoundCog color="#E77A00"/>
              </div>
              <p className="font-mono p-1 px-2 transition easy-in-out delay 150 rounded-xl bg-white text-orangeSite hover:bg-white hover:text-orangeSite">Cadastro</p>
              </button> 
            }
            
            

        </div>

          {!tokenState &&
          <form onSubmit={handleSignup} className="flex flex-col w-full justify-start items-center select-none hover:shadow-left-only">
            <div className="flex flex-col justify-center items-center w-full pb-8">
              <h1 className="font-mono p-2 pt-10 tracking-tight text-3xl text-center font-bold text-darkBlueSite">Crie sua conta</h1>
              <p className="font-mono text-lg text-blueSite">Preencha os campos</p>
            </div>

            <div className="flex flex-col w-full justify-start items-center gap-6">
              <div className="flex justify-between items-center w-3/5 p-1 bg-lightGraySite rounded-lg">
                <span className="flex justify-center items-center px-2">
                <UserRound color="#9da3ae" size={28} />
                </span>
                <input type="text" placeholder="Usuário" pattern="^([A-Za-z]\s?){1,30}$" value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-lg
                font-mono text-darkBlueSite h-full p-4 bg-lightGraySite  focus:bg-white focus:outline-blueSite invalid:outline-pink-500 invalid:text-pink-600
              focus:invalid:outline-pink-500 focus:invalid:ring-pink-500" required></input>
              </div>

              <div className="flex justify-between items-center w-3/5 p-1 bg-lightGraySite rounded-lg">
                <span className="flex justify-center items-center px-2">
                <Mail color="#9da3ae" size={28} />
                </span>
                <input type="email" autoComplete="off" id="emailCad" placeholder="Email" pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$" value={email} onChange={(e) => setEmail(e.target.value)} className="peer/emailCad w-full rounded-lg
                font-mono text-darkBlueSite h-full p-4 bg-lightGraySite  focus:bg-white focus:outline-blueSite invalid:outline-pink-500 invalid:text-pink-600
              focus:invalid:outline-pink-500 focus:invalid:ring-pink-500" required></input>
              </div>
              
            <div className="flex flex-col justify-start items-center w-full gap-4">
              <div className="flex justify-between items-center w-3/5 p-1 bg-lightGraySite rounded-lg">
                  <span className="flex justify-center items-center px-2">
                  <LockKeyhole color="#9da3ae" size={28} />
                  </span>
                  <input type="password" placeholder="Senha" value={password} pattern="^(?=.*\d)[A-Za-z\d]{6,30}$" onChange={(e) => setPassword(e.target.value)} className="w-full rounded-lg
                  font-mono text-darkBlueSite h-full p-4 bg-lightGraySite  focus:bg-white focus:outline-blueSite invalid:outline-pink-500 invalid:text-pink-600
                focus:invalid:outline-pink-500 focus:invalid:ring-pink-500" required></input>
              </div>

              <ReactPasswordChecklist className="flex flex-col justify-self-start w-2/4 font-mono text-sm leading-none text-left"
                  rules={[
                    "minLength", "maxLength", "number"
                  ]} 
                  messages={{minLength: "• A senha deve conter no mínimo 6 caracteres",
                    maxLength: "• A senha contém menos de 30 caracteres",
                    number: "• A senha deve conter pelo menos um número"
                  }}
                  minLength={6} maxLength={30} value={password} validTextColor="#219EBC" invalidTextColor="#ec4899"
                  hideIcon onChange={(isValid) => {}}
                ></ReactPasswordChecklist>

                <button type="submit" className="py-2 px-4 mt-4 rounded-3 border-2 rounded-full w-2/4 border-graySite text-graySite hover:animate-pulse select-none transition ease-in-out delay-100 hover:scale-110 hover:bg-white hover:text-orangeSite hover:border-orangeSite hover:animate-pulse">
                  <p className="font-mono text-2xl">CADASTRAR</p>
                </button>

                {error && <p className="font-mono text-xl text-pink-500">{error}</p>}
                {send && <p className="font-mono text-xl text-blueSite">{send}</p>}
              </div>
            </div>
          </form>
          }
v
          {tokenState &&
          <div className="flex flex-col w-full justify-center items-center select-none">
            <div className="w-full">
              <h1 className="font-mono p-6 pt-6 tracking-tight text-xl text-center font-bold text-darkBlueSite">Insira abaixo o Token de manutenção:</h1>
            </div>

            <div className="flex justify-between items-center w-3/5 p-1 mb-4 bg-lightGraySite rounded-lg">
                <span className="flex justify-center items-center px-2">
                <Cog color="#9da3ae" size={28} />
                </span>
                <input type="text" placeholder="Token de acesso" pattern="^([A-Za-z]\s?){8,30}$" value={tokenInput} onChange={(e) => setTokenInput(e.target.value)} className="w-full rounded-lg
                font-mono text-darkBlueSite h-full p-4 bg-lightGraySite  focus:bg-white focus:outline-blueSite" required></input>
            </div>

            <button onClick={handleToken} className="py-2 px-4 my-4 rounded-3 border-2 rounded-full w-2/4 hover:animate-pulse select-none transition ease-in-out delay-100 border-graySite text-graySite hover:scale-110 hover:bg-white hover:text-orangeSite hover:border-orangeSite hover:animate-pulse">
              <p className="font-mono text-2xl">OBTER ACESSO</p>
            </button>

            {errorToken && <p className="font-mono text-xl text-pink-500">{errorToken}</p>}

            </div>
          }
      </div>
    </div>
    </>
  );
}