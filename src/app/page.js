"use client"
import FooterPage from '@/components/Footer/Footer';
import Header from '@/components/header/Header';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState } from 'react';

async function getHomePage(slug) {
    try {
        const response = await fetch(`/api/pages?slug=${slug}`, { cache: "no-cache" });
        const data = await response.json();
        if (data.success) {
            return data.result;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error fetching home page content:", error);
        return null;
    }
}


const HomePage = () => {
    const [pageContent, setPageContent] = useState(null);

    useEffect(() => {
        const fetchHomePageData = async () => {
            const data = await getHomePage("/");
            if (data) {
                setPageContent(data);
            }
        };
        fetchHomePageData();
    }, []);

    useEffect(() => {
        AOS.init({
             duration: 800,
             once: false,
           })
     }, [])

    if (!pageContent) {
        return null;
    }

    return (
        <>

        <Header/>

        <div className="hero min-h-screen -top-0" style={{backgroundImage: `url(${pageContent.imageUrl})`}}>

  

</div>
        
        <div dangerouslySetInnerHTML={{ __html: pageContent.content }}></div>
<FooterPage/>
        </>
    );
};

export default HomePage;
