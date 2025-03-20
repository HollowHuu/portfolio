import IProfile from "src/Interfaces/IProfile";

const CheckAuth = async (): Promise<IProfile | null> => {
  let token = localStorage.getItem("token");
  if (token == null) {
    return null;
  }

  let response = await fetch("http://localhost:5003/user/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    return null;
  }

  let data = await response.json();
  let profile: IProfile = {
    id: data.id,
    name: data.name,
    description: data.description,
    profilePicture: data.profilePicture,
  };

  return profile;
};

export default CheckAuth;
