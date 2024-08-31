import React from "react";

const EditCover = () => {
  const handleEditCover = () => {
    console.log("Editing cover.");
  };

  return <button onClick={handleEditCover}>Edit Cover</button>;
};

export default EditCover;
