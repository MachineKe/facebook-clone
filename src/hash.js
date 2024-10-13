import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TaylorSwiftHashtags = () => {
  const [hashtags, setHashtags] = useState([]);
  const [error, setError] = useState(null);  // Track errors
  const [loading, setLoading] = useState(true);  // Track loading state

  useEffect(() => {
    const fetchTaylorSwiftHashtags = async () => {
      try {
        const response = await axios.get(
          `https://api.twitter.com/2/tweets/search/recent?query=Taylor Swift Concert OR The Eras Tour`, // Modify the query for relevant terms
          {
            headers: {
              'Authorization': `Bearer YOUR_TWITTER_BEARER_TOKEN`,
            },
          }
        );
        
        console.log(response.data); // Log the whole response to check the structure
        const tweets = response.data.data;

        if (tweets && tweets.length > 0) {
          // Extract hashtags from the tweets
          const taylorSwiftHashtags = tweets.flatMap(tweet => 
            tweet.entities && tweet.entities.hashtags ? tweet.entities.hashtags.map(ht => `#${ht.tag}`) : []
          );

          setHashtags(taylorSwiftHashtags);
        } else {
          console.log("No tweets found for the query.");
        }
      } catch (error) {
        console.error('Error fetching hashtags:', error);
        setError(error);  // Set the error state
      } finally {
        setLoading(false);  // Set loading to false after fetching
      }
    };

    fetchTaylorSwiftHashtags();
  }, []);

  if (loading) return <div>Loading...</div>;  // Show a loading message
  if (error) return <div>Error: {error.message}</div>;  // Show an error message

  return (
    <div>
      <h2>Hashtags for Taylor Swift Concerts</h2>
      <ul>
        {hashtags.length > 0 ? (
          hashtags.map((hashtag, index) => (
            <li key={index}>{hashtag}</li>
          ))
        ) : (
          <p>No hashtags found.</p>
        )}
      </ul>
    </div>
  );
};

export default TaylorSwiftHashtags;
