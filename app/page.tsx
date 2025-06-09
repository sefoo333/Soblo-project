
import Navbar from "./_componants/small_comps/Navbar"
import Home_comp from "./_componants/pages/Home_comp";

 export default function Home() {

  return (
   <>
           <Navbar />
   <div className="parent max-md:px-[20px] w-full flex justify-center">
<div className="container  w-[80rem] py-10">
  <Home_comp />
  </div>    
   </div>
   </>
  );
}
