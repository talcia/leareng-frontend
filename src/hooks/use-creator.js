import { useSelector } from 'react-redux';
import jwt from 'jwt-decode';

const useCreator = (creatorId) => {
	const token = useSelector((state) => state.auth.token);
	const user = jwt(token);
	return user.userId === creatorId;
};

export default useCreator;
