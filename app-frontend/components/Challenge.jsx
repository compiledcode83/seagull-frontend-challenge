import { useState, useEffect, useMemo, useCallback } from "react";

import Toggle from "./Toggle";
import UserGrid from "./UserGrid";
import Table, { AvatarCell } from "./Table";

const Challenge = () => {
  const url = "https://randomuser.me/api/";

  const [userList, setUserList] = useState([]);
  const [showList, setShowList] = useState([]);
  const [filterQuery, setFilterQuery] = useState("");
  const [viewMode, setViewMode] = useState(false);

  const getUsers = useCallback(async () => {
    const response = await fetch(`${url}?results=200`);
    const data = await response.json();
    setUserList(data?.results?.slice(0, 10));
  }, []);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const columns = [
    {
      Header: "Name",
      accessor: "name",
      Cell: AvatarCell,
      imgAccessor: "imgUrl",
      emailAccessor: "email",
    },
    {
      Header: "Location",
      accessor: "location",
    },
  ];

  const tableData = useMemo(
    () =>
      userList?.map((userItem, key) => ({
        id: key,
        name: `${userItem.name.first} ${userItem.name.last}`,
        email: userItem.email,
        location: `${userItem.location.city}, ${userItem.location.country}`,
        imgUrl: userItem.picture.thumbnail,
      })),
    [userList]
  );

  useEffect(() => {
    if (!filterQuery) {
      setShowList(userList);
    } else {
      const queryString = filterQuery.toLowerCase();
      const filteredData = userList?.filter((user) => {
        const fullName = `${user.name.first} ${user.name.last}`;

        if (queryString.length === 1) {
          const firstLetter = fullName.charAt(0).toLowerCase();
          return firstLetter === queryString;
        } else {
          return fullName.toLowerCase().includes(queryString);
        }
      });
      setShowList(filteredData);
    }
  }, [userList, filterQuery]);

  useEffect(() => console.log("rendered:", userList));

  return (
    <div className="flex flex-wrap items-center justify-around min-w-full mt-6 sm:w-full">
      <div className="p-6 mt-6 text-left border w-full rounded-xl bg-gray-100">
        <Toggle setViewMode={setViewMode} />
        {viewMode ? (
          <UserGrid
            userList={userList}
            showList={showList}
            setFilterQuery={setFilterQuery}
            setUserList={setUserList}
          />
        ) : (
          <Table columns={columns} data={tableData} />
        )}
      </div>
    </div>
  );
};

export default Challenge;
