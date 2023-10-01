import React from 'react'
import { AuthData } from '../auth/AuthWrapper';
import { abbreviatePhrase } from '../../helpers/utils';

const ImageUrl = () => {
    const { user } = AuthData();

    return (
        <div>
            <div className='user-profile-ui-container'>
                <img src={user.imageUrl} alt={abbreviatePhrase(user?.name)} className='user-profile-image' />
            </div>
        </div>
    )
}

export default ImageUrl
