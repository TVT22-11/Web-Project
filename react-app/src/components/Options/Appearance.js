import './Options.css';
import Sidebar from './Sidebar';
import './Appearance.css';
import { useUser } from '../User/UserContext';
import UserReviews from './UserReviews';

const Appearance = () => {
  const { username } = useUser();
  const { fname } = useUser();
  const { lname } = useUser();
 
  return (
    <div className="page-container">
      <Sidebar />
      <div className="content">
        <h2>Account Information</h2>

        <div>
          <label>
            Name: {fname} {lname}
          </label>
        </div>
        <div>
          <label>
            Account Name: {username}
          </label>
        </div>
        <div className='My-reviews'>
            <UserReviews />
        </div>
      </div>
    </div>
  );
};

export default Appearance;
