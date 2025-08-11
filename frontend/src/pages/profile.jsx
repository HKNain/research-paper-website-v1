// src/pages/profile.jsx
import React from "react";
import ProfileAuthor from "../components/profiles/profileAuthor";
import ProfileAdmin from "../components/profiles/profileAdmin";
import ProfileReviewer from "../components/profiles/profileReviewer";

const Profile = () => {
    const role = localStorage.getItem("role");
  
    switch (role) {
      case "author": return <ProfileAuthor />;
      case "admin": return <ProfileAdmin />;
      case "reviewer": return <ProfileReviewer />;
    }
}

export default Profile;
