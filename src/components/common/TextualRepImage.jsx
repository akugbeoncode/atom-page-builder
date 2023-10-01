import React from 'react'
import { abbreviatePhrase } from '../../helpers/utils'
import { AuthData } from '../auth/AuthWrapper'

const TextualRepImage = () => {
    const { user } = AuthData();

    return (
        <div>
            <div className='user-profile-ui-container'>
                { abbreviatePhrase(user?.name) }
            </div>
        </div>
    )
}

export default TextualRepImage
