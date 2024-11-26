'use client'

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { db } from "../services/firebaseConfig";
import { get, ref } from "firebase/database";
import { use, useEffect, useState } from "react";

export default function Monitor(){

    const [ifData, setIfData] = useState(0);

    async function receiveSens() {
        try {

            const ifRef = ref(db, "Sensores/IF");
            await get(ifRef).then((snapshot) => {
                if (snapshot.exists()) {
                    setIfData(snapshot.val());
                    console.log("dado recebido!");
                } else console.log("Os dados do sensor não existem!")
            })

        } catch(err: any){
            console.log("Não foi possível receber os dados dos sensores!");
        }

    }

    useEffect(() => {
        const intervalo = setInterval(() => {
             receiveSens();
          }, 1000);
      
          return () => clearInterval(intervalo);
    }, []);



    return(
        <div className="flex justify-center items-center w-screen h-screen bg-cover bg-center"  style={{backgroundImage: `url("https://cdn.discordapp.com/attachments/933064662822568009/1308616407801528320/bg-image.png?ex=673e9780&is=673d4600&hm=c28469290d55d8ec7eefb11f420bc97a8ef25483605c0af56c20d700f88fe4da&")`}}>
            <div className="flex flex-col justify-start items-center w-8/12 h-5/6 bg-white rounded-2xl select-none">
                <div className="flex justify-between items-center w-3/5 pt-6">
                    
                    <button type="button" className="flex justify-content items-center w-8 h-8 bg-white border-none">
                        <Link href="/" className="text-[#757474] hover:text-[#a8a8a8]">
                            <ArrowLeft className="w-8 h-8"></ArrowLeft>
                        </Link>
                    </button>

                    <div className="flex flex-col justify-center items-center  pb-16">
                        <h1 className="font-mono p-2 pt-10 tracking-tight text-3xl text-center font-bold text-darkBlueSite">Monitoramento</h1>
                            <p className="font-mono text-lg text-blueSite">Veja os dados dos sensores</p>
                    </div>
                            
                    <span className="w-9"></span>
                    
                </div>

                <div className="flex flex-col justify-between w-4/12 h-6/12 rounded-xl">
                    <div className="flex w-full justify-center rounded-tl-md rounded-tr-md bg-orangeSite p-2">
                        <p className="font-mono text-center text-lg">sensor infravermelho IF</p>
                    </div>
                    
                    <div className="flex w-full justify-center items-center p-20 border-raySite border-4 rounded-bl-lg rounded-br-lg">
                        <p className="font-mono text-darkBlueSite text-6xl">{ifData}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}