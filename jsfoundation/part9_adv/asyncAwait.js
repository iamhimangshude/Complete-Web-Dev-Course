function fetchUserData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ name: "chaicode", url: "https://chaicode.com" });
      //   reject("500: Internal Server Error");
    }, 3000);
  });
}

async function getUserData() {
  try {
    console.log("Fetching user data...");
    const userData = await fetchUserData();
    console.log(userData);
    return userData;
  } catch (error) {
    console.error(error);
    return new Error("Error fetching user data");
  }
}

getUserData();
