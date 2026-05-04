import React, { useEffect, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import history from './history'

function ScrollToTop({ children }) {

    useEffect(() => {
        const unlisten = history.listen(() => {
            window.scrollTo(0, 0)
        })
        return () => {
            unlisten()
        }
    }, [])

    return <Fragment>{children}</Fragment>
}

export default withRouter(ScrollToTop)
