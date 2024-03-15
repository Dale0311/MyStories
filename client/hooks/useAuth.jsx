import { useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import { selectToken } from '@/src/features/auth/authSlice';

const useAuth = () => {
  const token = useSelector(selectToken);
  if (token) {
    //DECODED DATA
    //   _id: new ObjectId('65f1a7bcb5b91a05bded3fd0'),
    //   username: 'p',
    //   email: 'p',
    //   photoUrl: 'C:\\Users\\dannt\\Desktop\\MyStories\\uploads\\default.jpeg',
    //   createdAt: 2024-03-13T13:18:52.730Z,
    //   updatedAt: 2024-03-13T13:18:52.730Z,
    //   __v: 0
    const decoded = jwtDecode(token.accessToken);
    return { ...decoded };
  }
};

export default useAuth;
