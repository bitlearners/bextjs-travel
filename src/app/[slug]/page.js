"use client";import { useEffect, useState } from 'react';
import { useParams } from "next/navigation";
import AOS from 'aos';
import 'aos/dist/aos.css';
import NotFound from '../not-found';

const Page = () => {
    const [pageContent, setPageContent] = useState(null);
    const { slug } = useParams();

    useEffect(() => {
        if (slug) {
            getPageDetails(slug);
        }
    }, [slug]);

    useEffect(() => {
        AOS.init({
             duration: 800,
             once: false,
        });
    }, []);

    const getPageDetails = async (slug) => {
        try {
            const response = await fetch(`/api/pages/${slug}`, { cache: "no-cache" });
            const data = await response.json();
            if (data.success) {
                setPageContent(data.result);
            } else {
                console.error("Failed to fetch page content:", data.error);
                setPageContent("404"); // Set a placeholder value to indicate page not found
            }
        } catch (error) {
            console.error("Error fetching page content:", error);
            setPageContent("404"); // Set a placeholder value to indicate page not found
        }
    };

    if (pageContent === "404") {
        return <NotFound />;
    }

    if (!pageContent) {
        // Render a loading indicator or placeholder while waiting for content
        return null;
    }

    return (
        <>
 <div className="hero min-h-96 -top-0" style={{backgroundImage: `url(${pageContent.imageUrl})`}}>
  <div className="hero-overlay bg-opacity-60"></div>
  <div className="hero-content text-center text-neutral-content">
    <div className="max-w-md">
      <h1 className="mb-5 text-5xl font-bold">{pageContent.pageName}</h1>
   
    </div>
  </div>
</div>

        <div dangerouslySetInnerHTML={{ __html: pageContent.content }}></div>

        </>
    );
};

export default Page;
