import React from "react";

const UserCard = ({ user }) => {
  const { firstName, lastName, about, age, photoUrl, gender } = user;
  return (
    user && (
      <div className="card bg-base-300 w-70 h-100 shadow-sm flex mx-auto my-5">
        <figure>
          <img src={photoUrl} alt="User-Image" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          {age && gender && <p>{age + ", " + gender}</p>}
          <p>{about}</p>
          <div className="card-actions justify-center mx-5 my-5">
            <button className="btn btn-primary">Ignore</button>
            <button className="btn btn-secondary">Interested</button>
          </div>
        </div>
      </div>
    )
  );
};

export default UserCard;
