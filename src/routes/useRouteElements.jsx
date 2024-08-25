import { useRoutes } from 'react-router-dom'
import { Children } from "react";


export default function useRouteElements() {
    return useRoutes([
        {
            path: '/',
        }
    ])
}