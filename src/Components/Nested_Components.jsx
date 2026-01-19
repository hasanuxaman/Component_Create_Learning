
import React from 'react';
import UserCard from './UserCard';

const Nested_Components = () => {

    const users = [
        {
            id: 1,
            name: 'John Doe',
            email: 'john.doe@example.com',
            role: 'Developer',
            avater: 'https://via.placeholder.com/150',
            bio: 'Full-stack developer passionate about React'
        },
        {
            id: 2,
            name: 'Jane Smith',
            email: 'jane.smith@example.com',
            role: 'Designer',
            avater: 'https://via.placeholder.com/150',
            bio: 'UI/UX designer creating beautiful experiences'
        },
        {
            id: 3,
            name: 'Mike Johnson',
            email: 'mike.johnson@example.com',
            role: 'Manager',
            avater: 'https://via.placeholder.com/150',
            bio: 'Team lead and project manager'
        }
    ];

    const handleFollow = (userId) => {
        console.log(`Followed user with id: ${userId}`);
        alert(`Following user ${userId}`);
    };

    return (
        <div className="nested-components">
            <h2>Nested Components Example</h2>
            <div className="user-cards-container">
                {users.map((user) => (
                    <UserCard
                        key={user.id}
                        user={user}
                        isOnline={true}
                        onFollow={handleFollow}
                    />
                ))}
            </div>
        </div>
    );
};

export default Nested_Components;