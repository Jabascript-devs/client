import PropTypes from 'prop-types';

import './style.css';

const UserProperties = (props) => {
    const currentUser = props.currentUser;

    return currentUser ? (
        <div className="user-props">
            <h2 className="user-name">Full name: {currentUser.fullName}</h2>
            <h3 className="user-deposit">Balance: {currentUser.balance}</h3>
            <h3 className="user-day-price">Address: {currentUser.address}</h3>
            <h3 className="user-discount">Phone number: {currentUser.phoneNumber}</h3>
            <h3 className="user-available">User category: {currentUser.userCategory ? currentUser.userCategory : 'none'}</h3>
        </div>
    ) : null;
};

UserProperties.propTypes = {
    currentUser: PropTypes.object.isRequired
};

export default UserProperties;
