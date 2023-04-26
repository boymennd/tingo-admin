import React from 'react';
import PageTitle from '../../components/common/PageTitle';
import UserProfile from '../../components/UserProfile';

const UserProfilePage = () => {
	return (
		<div>
			<PageTitle title='User Profile' />
			<UserProfile />
		</div>
	);
};

export default UserProfilePage;
