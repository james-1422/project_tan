export const getUsers = () => {
    const users = localStorage.getItem("dashboard_users");
    return users ? JSON.parse(users) : [];
  };
  
  export const findUserByUsername = (username) => {
    const users = getUsers();
    return users.find((user) => user.username === username);
  };
  
  export const saveUsers = (users) => {
    localStorage.setItem("dashboard_users", JSON.stringify(users));
  };
  
  export const saveUser = (user) => {
    const users = getUsers();
    const existingUserIndex = users.findIndex((u) => u.username === user.username);
    if (existingUserIndex >= 0) {
      users[existingUserIndex] = user;
    } else {
      users.push(user);
    }
    saveUsers(users);
  };
  
  export const setCurrentUser = (user) => {
    localStorage.setItem("dashboard_current_user", JSON.stringify(user));
  };
  
  export const getCurrentUser = () => {
    const user = localStorage.getItem("dashboard_current_user");
    return user ? JSON.parse(user) : null;
  };
  
  export const clearCurrentUser = () => {
    localStorage.removeItem("dashboard_current_user");
  };
  
  export const validatePassword = (password) => {
    const minLength = /.{8,}/; // At least 8 characters
    const hasCapitalLetter = /[A-Z]/; // At least one capital letter
    const hasNumber = /[0-9]/; // At least one number
    const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/; // At least one special character
  
    if (!minLength.test(password)) {
      return "Password must be at least 8 characters long.";
    }
    if (!hasCapitalLetter.test(password)) {
      return "Password must contain at least one capital letter.";
    }
    if (!hasNumber.test(password)) {
      return "Password must contain at least one number.";
    }
    if (!hasSpecialCharacter.test(password)) {
      return "Password must contain at least one special character (!@#$%^&*(),.?\":{}|<>)";
    }
  
    return true;
  };
  
  export const generateUniqueCode = (name) => {
    const nameLetters = name.substring(0, 2).toUpperCase();
    const randomLetters = Array.from({ length: 2 }, () =>
      String.fromCharCode(65 + Math.floor(Math.random() * 26))
    ).join("");
    const randomNumbers = Array.from({ length: 4 }, () =>
      Math.floor(Math.random() * 10)
    ).join("");
    return `${nameLetters}${randomLetters}${randomNumbers}`;
  };
  
  export const calculateRanking = () => {
    const users = getUsers();
    users.sort((a, b) => {
      const pointsA =
        a.eventsParticipated * 100 +
        a.eventsOrganized * 200 +
        a.eventsVolunteered * 150;
      const pointsB =
        b.eventsParticipated * 100 +
        b.eventsOrganized * 200 +
        b.eventsVolunteered * 150;
      return pointsB - pointsA;
    });
    users.forEach((user, index) => (user.ranking = index + 1));
    saveUsers(users);
    return users;
  };
  
  export const calculatePoints = (user) => {
    return (
      user.eventsParticipated * 100 +
      user.eventsOrganized * 200 +
      user.eventsVolunteered * 150
    );
  };