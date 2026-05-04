import React from 'react'
import Loadable from '../../../Utils/Loadable'
import Loading from '../../../Utils/Loadable'

export const Dashboard = Loadable( () =>
    import('./../../../Pages/Advisor/dashboard/dashboard'), {fallback: <Loading/>}
)

