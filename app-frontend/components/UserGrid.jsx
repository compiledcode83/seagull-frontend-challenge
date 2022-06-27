const UserGrid = ({ userList, showList, setFilterQuery, setUserList }) => {
  return (
    <>
      <section>
        <form className="ml-6">
          <span className="text-gray-700">Search: </span>
          <input
            type={"text"}
            placeholder={"type here to filter..."}
            onChange={(e) => setFilterQuery(e.target.value)}
            className={"ml-1 mt-6 rounded-md p-2"}
          />
        </form>
      </section>
      {showList?.length < 1 && <h1>No persons...</h1>}
      <section className={"grid sm:grid-cols-2 md:grid-cols-4 gap-6 p-5"}>
        {showList?.map((user, key) => (
          <figure
            className="bg-white text-white h-60 rounded-lg shadow-md"
            key={key}
            onClick={() =>
              setUserList(userList?.filter((user, index) => index !== key))
            }
          >
            <img
              alt={user.name.last}
              className="w-32 h-32 rounded-full mx-auto mt-7"
              src={user.picture.large}
            />
            <figcaption className="text-center mt-5">
              <p className="text-gray-700 font-semibold text-xl mb-2">
                {user.name.first} {user.name.last}
              </p>
            </figcaption>
          </figure>
        ))}
      </section>
    </>
  );
};

export default UserGrid;
