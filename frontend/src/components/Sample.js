import React, { useState } from 'react'

function Sample() {

    const [name, setName] = useState('');
    const [user, setUser] = useState();

    const UserFInd = () => {
        const UserFind = users.find((user) => {
            return user.name === name;
        });

        setUser(UserFind)
    }

    const users = [
        {
            name: "maaz",
            section: "b"
        },
        {
            name: "khan",
            section: "a"
        },
        {
            name: "king",
            section: "c"
        }
    ]

    return (
        <>
            <div>
                <input value={name} onChange={(x) => setName(x.target.value)} />
                <button onClick={UserFInd}>Find User Now</button>
                <div>
                    {user && user.name}
                </div>
                <div>
                    {user && user.section}
                </div>
            </div>
        </>
    )
}

export default Sample