import React from 'react';
import { useStore } from '../context/StorageContext';
import { Navigate, Outlet } from 'react-router-dom';

export default function TaggedRoute() {
    const {tag} = useStore();
  return (
    tag ? <Outlet /> : <Navigate to="/tag" />
  )
}