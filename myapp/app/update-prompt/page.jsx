"use client";

import React, { useEffect, useState } from "react";
import { useRouter,useSearchParams } from "next/navigation";

import Form from "@components/Form";

const UpdatePrompt = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const PromptId = searchParams.get('id');

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    title : "",
    prompt: "",
    tag: "",
  });

  const getPromptDetails = async() => {
    try {
        const options = {
            method : "GET"
        }
        const response = await fetch(`/api/prompt/${PromptId}`,options);
        const data = await response.json();

        if(response.ok){
            setPost({
                title : data.title,
                prompt : data.prompt,
                tag : data.tag
            })
        }

    } catch (error) {
        console.log("ERROR WHILE GETTING THE PROMPT DETAILS : ",error)
    }
  }

  useEffect(() => {
    if(PromptId){
        getPromptDetails();
    }
  },[PromptId])

  const updatePrompt = async (event) => {
    event.preventDefault();
    setSubmitting(true);

    if(!PromptId){
        return alert("Missing PromptId!");
    }

    try {
      const options = {
        method: "PATCH",
        body: JSON.stringify({
          title : post.title,
          prompt: post.prompt,
          tag: post.tag,
        }),
      };
      const response = await fetch(`/api/prompt/${PromptId}`, options);
      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log("ERROR WHILE UPDATING A PROMPT : ", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  );
};

export default UpdatePrompt;
