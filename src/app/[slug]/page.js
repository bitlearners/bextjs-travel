"use client";
import { useEffect, useState } from 'react';
import { useParams } from "next/navigation";

const Page = () => {
    const [pageContent, setPageContent] = useState(null);
    const { slug } = useParams();

    useEffect(() => {
        if (slug) {
            getPageDetails(slug);
        }
    }, [slug]);

    const getPageDetails = async (slug) => {
        try {
            const response = await fetch(`/api/pages/${slug}`, { cache: "no-cache" });
            const data = await response.json();
            if (data.success) {
                setPageContent(data.result);
            } else {
                console.error("Failed to fetch page content:", data.error);
            }
        } catch (error) {
            console.error("Error fetching page content:", error);
        }
    };

    return (
        <div>
            {pageContent ? (
                <div dangerouslySetInnerHTML={{ __html: pageContent.content }}></div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Page;
