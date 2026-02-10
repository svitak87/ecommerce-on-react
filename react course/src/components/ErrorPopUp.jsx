import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'


const ErrorPopUp = () => {
    const { error } = useContext(AuthContext)
    return (
        <div>
            <p>{error}</p>
        </div>
    )
}

export default ErrorPopUp