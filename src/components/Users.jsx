import { useState } from "react";
import { useLoaderData } from "react-router-dom";

const Users = () => {
    const loadedUsers = useLoaderData();
    const [ users, setUsers ] = useState(loadedUsers);

    const handleDelete = id => {
        // make sure user is confirmed to delete
        fetch(`https://coffee-store-server-c6rsdj877-sobuj-mias-projects.vercel.app/user/${id}`, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(data => {
            if( data.deletedCount > 0 ) {
                console.log('Deleted successfully');
                // remove the user from the UI
                const remainingUsers = users.filter(user => user._id !== id);
                setUsers(remainingUsers);
            }
        })
    }

    return (
        <div>
            <h2>users: {loadedUsers.length}</h2>
            <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Email</th>
        <th>Created At</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {
        users.map(user => <tr key={user._id}>
            <th>1</th>
            <td>{user.email}</td>
            <td>{user.createdAt}t</td>
            <td>{user.lastLoggedAt}</td>
            <td>
                <button className="btn" onClick={ () => handleDelete(user._id)}>X</button>
            </td>
          </tr>)
      }
    </tbody>
  </table>
</div>
        </div>
    );
};

export default Users;