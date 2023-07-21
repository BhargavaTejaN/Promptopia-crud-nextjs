"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";

const MyProfile = () => {

    const router = useRouter();
    const { data: session } = useSession();

    const [myPosts, setMyPosts] = useState([]);

    const fetchPosts = async() => {
        try {
            const options = {
                method : "GET"
            }
            const response = await fetch(`/api/users/${session?.user.id}/posts`,options);
            const data = await response.json();

            if(response.ok){
                setMyPosts(data);
            }

        } catch (error) {
            console.log("ERROR WHILE FETCHING PROFILE : ",error)
        }
    }

    useEffect(() => {
        if(session?.user.id){
            fetchPosts();
        }
    },[session?.user.id])

    const handleEdit = (post) => {
        router.push(`/update-prompt?id=${post._id}`)
    }

    const handleDelete = async (post) => {
        const hasConfirmed = confirm("Are you Sure You Want To Delete The Prompt?");
        if(hasConfirmed){
            try {
                const options = {
                    method : "DELETE"
                }
                await fetch(`/api/prompt/${post._id.toString()}`,options);
                const filteredPosts = myPosts.filter((eachPost) => (
                    eachPost._id !== post._id
                ))
                setMyPosts([...filteredPosts]);
                router.push("/")
            } catch (error) {
                console.log("ERROR WHILE DELETING THE PROPMT : ",error)
            }
        }
    }

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page. Share your exceptional prompts and inspire others with the power of your imagination"
      data={myPosts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
