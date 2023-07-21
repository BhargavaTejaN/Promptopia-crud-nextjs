import React from "react";

import PromtCard from "./PromtCard";

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Profile</span>
      </h1>
      <p className="desc text-left">{desc}</p>

      <div className="mt-10 prompt_layout">
        {data.map((eachPost) => (
          <PromtCard
            key={eachPost._id}
            post={eachPost}
            handleEdit={() => handleEdit && handleEdit(eachPost)}
            handleDelete={() => handleDelete && handleDelete(eachPost)}
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;
