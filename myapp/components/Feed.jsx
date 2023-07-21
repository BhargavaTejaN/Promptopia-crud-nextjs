"use client";

import React, { useState, useEffect } from "react";
import PromtCard from "./PromtCard";

const PromtCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromtCard key={post._id} post={post} handleTagClick={handleTagClick} />
      ))}
    </div>
  );
};

const Feed = () => {
  const [allPosts, setAllPosts] = useState([]);

  // search states
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  const fetchPosts = async () => {
    try {
      const options = {
        method: "GET",
      };
      const response = await fetch("/api/prompt", options);
      const data = await response.json();

      if (response.ok) {
        setAllPosts(data);
      }
    } catch (error) {
      console.log("ERROR WHILE FETCHING THE POSTS : ", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const filterPrompts = (searchText) => {
    const regex = new RegExp(searchText,"i");
    return allPosts.filter(
      (item) => regex.test(item.creator.username) || regex.test(item.tag) || regex.test(item.prompt) || regex.test(item.title)
    )
  }

  const handleSearchChange = (event) => {
    clearTimeout(searchTimeout);
    setSearchText(event.target.value);
    
    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(event.target.value);
        setSearchedResults(searchResult);
      })
    )
  };

  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    const searchResult =  filterPrompts(tagName);
    setSearchedResults(searchResult);
  }

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      {searchText ? (
        <PromtCardList data={searchedResults} handleTagClick={handleTagClick} />
      ) : (
        <PromtCardList data={allPosts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;
