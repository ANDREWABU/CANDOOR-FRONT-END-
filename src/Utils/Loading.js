import Logo from '../assets/images/logo1.png'

const styles = {
    circularProgress: {
        position: 'fixed',
        left: 0,
        bottom: 0,
        right: 0,
        top: 0,
        display:'block',
        margin: 'auto'
    },

    loading: {
        position: 'fixed',
        margin: 0,
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        transition: 'opacity .3s',
        zIndex: '9999999 !important',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
    }
}

const Loading = () => {
    return (
        <div style={styles.loading}>
            <img alt={'spinner'} src={Logo} className="loader" />
        </div>
    )
}

export default Loading
