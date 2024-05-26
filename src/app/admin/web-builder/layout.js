
import NavBar from "@/components/nav/NavBar"





export default function DashboardLayout({
    children, // will be a page or nested layout
  }) {
    return (
     
<div className="flex h-screen bg-[#F9F9F9]">
      
      <div className="flex flex-col flex-1">
      <NavBar/>
      <main  className="flex-grow p-4">

      

        {children}
        </main >
        
      </div>
    </div>
   
    )
  }