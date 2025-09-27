import CompanionCard from "@/components/CompanionCard";
import CompanionsList from "@/components/CompanionsList";
import Cta from "@/components/CTA";
import { recentSessions } from "@/constants"; 

const Page = () => {
  return (
    <main>
      <h1 className="text-2xl underline">Popular Companions</h1>

      <section className="home-section">
         <CompanionCard 
           id="123"
           name="Neura the Binary Explorer"
           topic="Neural Network Of Brain"
           subject="science"
           duration={45}
           color="#ffda6e"
         />

         <CompanionCard 
           id="456"
           name="Countsy The Number Wizard"
           topic="Derivatives & Integrals"
           subject="math"
           duration={30}
           color="#e5d0ff"
         />

         <CompanionCard 
           id="789"
           name="Verba the Vocabulary Builder"
           topic="Language"
           subject="English Literature"
           duration={30}
           color="#BDE7FF"
         />
 
      </section>      

      <section className="home-section"> 
       <CompanionsList 
       title="Recently Completed Sessions"
       companions={recentSessions}
       className="q-2/3 max-lg:w-full"
       />
        <Cta />  
      </section>
               
    </main>
  );
};

export default Page;
