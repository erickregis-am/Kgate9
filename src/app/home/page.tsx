'use client'

import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { ref, get, set } from "firebase/database";
import { auth, db } from "../services/firebaseConfig";
import { AppWindowMac, LogOut, Minus, Scan, Tally1 } from "lucide-react";
import { useRouter } from "next/navigation";


export default function Home() {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showUsername, setShowUsername] = useState(true);
  const [error, setError] = useState("");
  const [activeCancela, setActiveCancela] = useState(true);
  const container = document.getElementById('container');
  const cancela = document.getElementById('cancelaButton');

  const navigate = useRouter();

  function toggleFullScreen() {
      
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      }
     else if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }

    async function toggleCancela() {
      try {
        const cancelaRef = ref(db, 'Cancela/Estado');
        await get(cancelaRef).then((snapshot) => {
          if (snapshot.exists()) {
            if(snapshot.val() == false){
              set(ref(db, "Cancela/"),{
                Estado: true
              });
              setTimeout(() => {
                setActiveCancela(true);
              }, 1000)
              
            } else {
              set(ref(db, "Cancela/"),{
                Estado: false
              });
              setTimeout(() => {
                setActiveCancela(false);
              }, 1000)
              
          }
        }});
      } catch (err: any){
        setError("Não foi possível acionar a cancela");
      }
    }

    async function verifyCancela() {
      try {
        const cancelaRef = ref(db, 'Cancela/Estado');
        await get(cancelaRef).then((snapshot) => {
          if (snapshot.exists()) {
            if(snapshot.val() == false){
              setActiveCancela(false);
            } else {
              setActiveCancela(true);
          }
        }});
      } catch (err: any){
        setError("Não foi possível receber o estado da cancela");
      }
    }

    async function handleLogout(){
        try {
            await signOut(auth);

            navigate.push("./login");
            
        } catch (err: any){
            setError("Não foi possível fazer logOut!");
        }
    }

  useEffect(() => {
      verifyCancela();
  }, [])

  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, async (user) => {

      if (user) {

        const userRef = ref(db, `Usuários/${user.uid}`);
        const snapshot = await get(userRef);

        if (snapshot.exists()) {

          setUserData(snapshot.val());
          setLoading(false);

        } else {

          setUserData(null);

        }
      } else {

        setLoading(false);

      }
    });

    return () => unsubscribe(); 
  }, []);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
  
    if(showUsername){
      timeout = setTimeout(() => setShowUsername(false), 5000);
    }
  
    return () => clearTimeout(timeout);
  },[container])



  useEffect(() => {

    let timeout: NodeJS.Timeout;
  
    if(error){
      timeout = setTimeout(() => setError(""), 5000);
    }
  
    return () => clearTimeout(timeout);

  }, [cancela])

  if (loading) {
    return (
      <div className="flex justify-center items-center w-full h-screen bg-darkBlueSite">
        <p className="font-mono text-white">Carregando...</p>
      </div>
    );
  }
  
  if (!userData) {
    return (
      <div className="flex justify-center items-center w-full h-100vh bg-graySite select-none">
        <p className="font-mono text-darkBlueSite">Nenhum usuário logado ou dados encontrados.</p>
      </div>
    );
  }

  return (
    <div id="container" className="flex justify-center items-center w-screen h-screen bg-cover bg-center"  style={{backgroundImage: `url("https://cdn.discordapp.com/attachments/933064662822568009/1308616407801528320/bg-image.png?ex=673e9780&is=673d4600&hm=c28469290d55d8ec7eefb11f420bc97a8ef25483605c0af56c20d700f88fe4da&")`}}>
       <div className="flex w-10/12 h-5/6 flex-col items-center justify-start bg-white rounded-2xl select-none">
          <div className="flex justify-between items-center w-11/12 py-8 pb-20">
              
              {showUsername && <div className="flex justify-center items-center gap-4">
                <p className="font-mono text-darkBlueSite text-3xl">Bem-vindo</p>
                <p className="font-mono text-blueSite text-3xl">{userData.name}!</p>
              </div>} 

              {!showUsername && <div className="flex justify-center items-center">
                <p className="font-mono text-blueSite text-3xl">K</p>
                <p className="font-mono text-darkBlueSite text-3xl">GATE</p>
                <p className="font-mono text-blueSite text-3xl">9</p>
                </div>}

              <div className="flex justify-center items-center gap-8">

                  {error && <p className="text-red-500">{error}</p>}
            
                  <button onClick={handleLogout} className="border-none">
                    <LogOut className="text-red-600 hover:text-red-400"></LogOut>
                  </button>

                  <button onClick={toggleFullScreen} className="border-none">
                      <Scan className="text-darkGraySite hover:text-graySite"></Scan>
                  </button>
              </div> 
            </div>

            {activeCancela && <div className="flex justify-between items-center w-6/12 py-1 pt-8 pb-32">
              
                <span className="flex justify-start items-center">
                  <AppWindowMac className="text-darkGraySite w-16 h-16"></AppWindowMac>
                  <Tally1 className="text-darkGraySite w-16 h-16"></Tally1>
                </span>

                <span className="flex justify-start items-center">
                  <AppWindowMac className="text-graySite w-16 h-16"></AppWindowMac>
                  <Minus className="text-graySite w-16 h-16"></Minus>
                </span>
            </div>}

            {!activeCancela && <div className="flex justify-between items-center w-6/12 py-1 pt-8 pb-32">
              
              <span className="flex justify-start items-center">
                <AppWindowMac className="text-graySite w-16 h-16"></AppWindowMac>
                <Tally1 className="text-graySite w-16 h-16"></Tally1>
              </span>

              <span className="flex justify-start items-center">
                <AppWindowMac className="text-darkGraySite w-16 h-16"></AppWindowMac>
                <Minus className="text-darkGraySite w-16 h-16"></Minus>
              </span>
            </div>}

            {activeCancela && <button onClick={toggleCancela} id="cancelaButton" className="py-2 px-4 my-4 mt-16 rounded-3 border-2 rounded-full w-2/4 hover:animate-pulse select-none transition ease-in-out delay-100 border-graySite text-graySite hover:scale-110 hover:bg-white hover:text-orangeSite hover:border-orangeSite hover:animate-pulse">
              <p className="font-mono  text-2xl">DESCER</p>
            </button>}

            {!activeCancela && <button onClick={toggleCancela} id="cancelaButton" className="py-2 px-4 my-4 mt-16 rounded-3 border-2 rounded-full w-2/4 hover:animate-pulse select-none transition ease-in-out delay-100 border-graySite text-graySite hover:scale-110 hover:bg-white hover:text-orangeSite hover:border-orangeSite hover:animate-pulse">
              <p className="font-mono  text-2xl">SUBIR</p>
            </button>}

            {error && <p className="font-mono text-xl text-pink-500">{error}</p>}

       </div>
    </div>
  );
}
