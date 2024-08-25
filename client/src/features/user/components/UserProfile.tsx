import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUserInfo, fetchLoggedInUserAsync } from '../userSlice';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

export default function UserProfile() {
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserInfo);

  return (
    <div>
      <div className="mx-auto mt-12 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <h1 className="text-4xl my-5 font-bold tracking-tight text-gray-900">
            {/* Name: {userInfo.name ? userInfo.name : 'New User'} */}
            Name: New User
          </h1>
          <h3 className="text-xl my-5 font-bold tracking-tight text-red-900">
            email address : {userInfo.email}
          </h3>
          {userInfo.role === 'admin' && (
            <>
              <h3 className="text-xl my-5 font-bold tracking-tight text-red-900">
                role : {userInfo.role}
              </h3>
              <h4 className='font-bold'>
                link: <Link to='/admin'>Admin</Link>
              </h4>
            </>
          )}
          {userInfo.role !== 'admin' && (
            <>
              <h3 className="text-xl my-5 font-bold tracking-tight text-red-900">
                role : User
              </h3>
            </>
          )}
        </div>
      </div>
    </div>
  );
}