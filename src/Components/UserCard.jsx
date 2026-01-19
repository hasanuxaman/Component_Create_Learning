import React from 'react';
import PropTypes from 'prop-types';


const UserCard = ({ user, isOnline, onFollow }) => {
    const { name, email, role, avater, bio } = user;

    return (
        <div>
            <div>
                <img
                    src={avater}
                    alt={`${name}'s avatar`}
                    className="user-card__avatar"
                />
            </div>
            <div className="user-card__body">
                <h3 className="user-card__name">{name}</h3>
                <p className="user-card__role">{role}</p>
                <p className="user-card__email">{email}</p>
                {bio && <p className="user-card__bio">{bio}</p>}
            </div>
            <div className="user-card__footer">
                <button
                    className="btn btn--primary"
                    onClick={() => onFollow(user.id)}
                >
                    Follow
                </button>
                <button className="btn btn--secondary">
                    Message
                </button>
            </div>
        </div>

    );
};
UserCard.PropTypes = {
    user: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        role: PropTypes.string.isRequired,
        avatar: PropTypes.string.isRequired,
        bio: PropTypes.string
    }).isRequired,
    isOnline: PropTypes.bool,
    isOnline: PropTypes.func.isRequired
};
UserCard.defaultProps = {
    isOnline: false
};

export default UserCard;