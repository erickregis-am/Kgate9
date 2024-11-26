'use client'

import { get, ref } from "firebase/database";
import { ArrowLeft, LockKeyhole, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { auth, db } from "../services/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
 


export default function Login(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState("");
    const [userDataFound, setUserDataFound] = useState("");

    const navigate = useRouter();

    useEffect(() => {
        let timeout: NodeJS.Timeout | undefined;

        if (userDataFound || error) {
            timeout = setTimeout(() => {
            setUserDataFound("");
            setError("");
            }, 3000);
        }
  
        return () => clearTimeout(timeout); 
    }, [userDataFound, error]);

    const handleLogin = async (e:any) => {
        e.preventDefault();

        try {
      
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

       
            const userRef = ref(db, `Usuários/${user.uid}`);
            const snapshot = await get(userRef);

            if (snapshot.exists()) {

                setUserData(snapshot.val());

                setTimeout(() => {
                    navigate.push("/home");
                  }, 2000);

            } else {

                setUserData(null);
                setUserDataFound("Nenhum usuário foi encontrado.");
            }
            
        } catch (err: any) {
            setError("Não foi possível realizar o login!");
        }
    };

    return(
        <div className="flex justify-center items-center w-screen h-screen bg-cover bg-center"  style={{backgroundImage: `url("https://cdn.discordapp.com/attachments/933064662822568009/1308616407801528320/bg-image.png?ex=673e9780&is=673d4600&hm=c28469290d55d8ec7eefb11f420bc97a8ef25483605c0af56c20d700f88fe4da&")`}}>
            <div className="flex w-8/12 h-5/6 bg-white rounded-2xl">
                <form onSubmit={handleLogin} className="flex flex-col w-full justify-start items-center select-none">
                    <div className="flex flex-col justify-center items-center w-full  bg-white rounded-2xl">
                        
                        <div className="flex justify-between items-center w-3/5">

                            <button type="button" className="flex justify-content items-center w-8 h-8 bg-white border-none">
                                <Link href="/" className="text-[#757474] hover:text-[#a8a8a8]">
                                    <ArrowLeft className="w-8 h-8"></ArrowLeft>
                                </Link>
                            </button>

                            <div className="flex flex-col justify-center items-center  pb-24">
                                <h1 className="font-mono p-2 pt-10 tracking-tight text-3xl text-center font-bold text-darkBlueSite">Login</h1>
                                <p className="font-mono text-lg text-blueSite">Entre com seus dados</p>
                            </div>
                            
                            <span className="w-9"></span>

                        </div>
                            

                        <div className="flex flex-col w-full justify-start items-center gap-6">
                            <div className="flex justify-between items-center w-3/5 p-1 bg-lightGraySite rounded-lg">
                                <span className="flex justify-center items-center px-2">
                                    <Mail color="#9da3ae" size={28} />
                                </span>
                                <input type="email" autoComplete="off" placeholder="Email" pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-lg
                                font-mono text-darkBlueSite h-full p-4 bg-lightGraySite  focus:bg-white focus:outline-blueSite invalid:outline-pink-500 invalid:text-pink-600
                              focus:invalid:outline-pink-500 focus:invalid:ring-pink-500" required></input>
                            </div>

                            <div className="flex justify-between items-center w-3/5 p-1 bg-lightGraySite rounded-lg">
                                <span className="flex justify-center items-center px-2">
                                    <LockKeyhole color="#9da3ae" size={28} />
                                </span>
                                <input type="password" placeholder="Senha" value={password} pattern="^(?=.*\d)[A-Za-z\d]{6,30}$" onChange={(e) => setPassword(e.target.value)} className="w-full rounded-lg
                                font-mono text-darkBlueSite h-full p-4 bg-lightGraySite  focus:bg-white focus:outline-blueSite invalid:outline-pink-500 invalid:text-pink-600
                              focus:invalid:outline-pink-500 focus:invalid:ring-pink-500" required></input>
                            </div>
                            
                        </div>

                        <button type="submit"className="py-2 px-4 my-4 mt-16 rounded-3 border-2 rounded-full w-2/4 hover:animate-pulse select-none transition ease-in-out delay-100 border-graySite text-graySite hover:scale-110 hover:bg-white hover:text-orangeSite hover:border-orangeSite hover:animate-pulse">
                            <p className="font-mono  text-2xl">ENTRAR</p>
                        </button>

                        {error && <p className="font-mono text-xl text-pink-500">{error}</p>}
                        {userDataFound && <p className="font-mono text-xl text-pink-500">{userDataFound}</p>}

                    </div>
                </form>
            </div>
        </div>
    );
}