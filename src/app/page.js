"use client"
import { useEffect, useState } from 'react';

async function getHomePage() {
    try {
        const response = await fetch("/api/pages", { cache: "no-cache" });
        const data = await response.json();
        if (data.success) {
            return data.result;
        } else {
            console.error("Failed to fetch home page content:", data.error);
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
            const data = await getHomePage();
            if (data) {
                setPageContent(data);
            }
        };
        fetchHomePageData();
    }, []);

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

export default HomePage;
