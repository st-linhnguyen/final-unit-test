import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { handleRemoveItems } from '../core/helpers/common.helper';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    setLoading(true);
    axios.get('GET_USERS_API_ENDPOINT').then((res: any) => {
      setUsers(res);
    }).catch(err => {
      console.log(err)
    }).finally(() => {
      setLoading(false);
    });
  };

  const onDelete = (uid: any) => {
    setUsers((pre: any[]) => {
      return handleRemoveItems(pre, [uid]);
    });
  };

  return (
    <div className="user-list">
      {
        (!isLoading || users.length) ?
        <table className="min-w-full text-left text-sm font-light">
          <thead className="border-b font-medium dark:border-neutral-500">
            <tr>
              <th scope="col" className="px-6 py-4">Name</th>
              <th scope="col" className="px-6 py-4">Email</th>
              <th scope="col" className="px-6 py-4">Phone</th>
              <th scope="col" className="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody>
            {
              users.map((user: any) => (
                <tr key={ user.id } className="border-b dark:border-neutral-500">
                  <td className="whitespace-nowrap px-6 py-4">{ user.name }</td>
                  <td className="whitespace-nowrap px-6 py-4">{ user.email }</td>
                  <td className="whitespace-nowrap px-6 py-4">{ user.phone }</td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <Link data-testid={`${user.id}`} to={`${user.id}`}>Detail</Link>
                    <button onClick={ () => onDelete(user.id) }>Delete</button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table> :
        <p>No users found</p>
      }
    </div>
  )
};

export default UserList;
