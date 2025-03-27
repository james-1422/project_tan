export const getUsers = () => {
    const users = localStorage.getItem("dashboard_users");
    return users ? JSON.parse(users) : [];
  };
  
  export const saveUsers = (users) => {
    localStorage.setItem("dashboard_users", JSON.stringify(users));
  };
  
  export const calculateRanking = () => {
    const users = getUsers();
    users.sort((a, b) => {
      const pointsA = calculatePoints(a);
      const pointsB = calculatePoints(b);
      return pointsB - pointsA;
    });
    users.forEach((user, index) => (user.ranking = index + 1));
    saveUsers(users);
    return users;
  };
  
  export const calculatePoints = (user) => {
    return user.eventsParticipated * 100 + user.eventsOrganized * 200 + user.eventsVolunteered * 150;
  };