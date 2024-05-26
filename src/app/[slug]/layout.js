import Footer from "@/components/Footer/Footer";
import Header from "@/components/header/Header";




export default function HomeLayout({
    children, // will be a page or nested layout
  }) {
    return (
     
        


   
        
     

<div >
      
      
<Header/>


      

        {children}
        <Footer/>
      </div>
    
   
    )
  }