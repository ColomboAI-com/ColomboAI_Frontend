import { getCookie } from "@/utlils/cookies";
import { ROOT_URL_AUTH } from "@/utlils/rootURL";
import axios from "axios";
import React, { useEffect, useState } from "react";

const UsersSearch = () => {
  const [userSearchQuery, setUserSearchQuery] = useState('');
  const [users, setUsers] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(userSearchQuery)
    try {
      const res = await axios.get(`${ROOT_URL_AUTH}/user/search`, {
        params: { q: userSearchQuery },
        headers: {
          Authorization: getCookie("token"),
        },
      });
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <lable>
          Search:
          <input
            type="text"
            name="query"
            value={userSearchQuery}
            onChange={(e) => setUserSearchQuery(e.target.value)}
          />
        </lable>
        <input type="submit" />
      </form>
    </div>
  );
};

export default UsersSearch;
