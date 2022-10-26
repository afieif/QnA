import React from 'react';
import { useStore } from '../context/StorageContext';
import { Navigate, Outlet } from 'react-router-dom';

export default function QuestionRoute() {
    const {curr} = useStore()
    return curr?.qid ? <Outlet /> : <Navigate to="/" />;
}