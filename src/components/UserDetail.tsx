/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/aria-role */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { GET_USERS_API_ENDPOINT } from '../shared/constants';

const UserDetail = () => {
  const { id } = useParams();
  const [isLoading, setLoading] = useState(true);
  const [user, setUser]= useState<any>();

  useEffect(() => {
    getUserDetail();
  }, []);

  const getUserDetail = () => {
    setLoading(true);
    axios.get(`${GET_USERS_API_ENDPOINT}/${id}`).then((res: any) => {
      setUser(res);
    }).finally(() => setLoading(false));
  };

  return (
    <>
      {
        !isLoading &&
        <div role="user-detail" className="user-detail">
          {
            user ?
            <h1 role="user-name">{user.name}</h1> :
            <p>User not found</p>
          }
        </div>
      }
    </>
  )
};

export default UserDetail;
