import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { ref, get } from "firebase/database";
import { auth, db } from "../services/firebaseConfig";

export default function Home() {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, async (user) => {

      if (user) {

        const userRef = ref(db, `Usuários/${user.uid}`);
        const snapshot = await get(userRef);

        if (snapshot.exists()) {

          setUserData(snapshot.val());

        } else {

          setUserData(null);

        }
      } else {

        setLoading(false);

      }
    });

    return () => unsubscribe(); 
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center w-full h-full bg-graySite">
        <p className="font-mono text-darkBlueSite">Carregando...</p>
      </div>
    );
  }
  
  if (!userData) {
    return (
      <div className="flex justify-center items-center w-full h-100vh bg-graySite">
        <p className="font-mono text-darkBlueSite">Nenhum usuário logado ou dados encontrados.</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center w-screen h-screen bg-cover bg-center"  style={{backgroundImage: `url("https://cdn.discordapp.com/attachments/933064662822568009/1308616407801528320/bg-image.png?ex=673e9780&is=673d4600&hm=c28469290d55d8ec7eefb11f420bc97a8ef25483605c0af56c20d700f88fe4da&")`}}>
       
    </div>
  );
}
