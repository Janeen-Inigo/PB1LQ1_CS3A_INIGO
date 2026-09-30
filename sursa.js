const crypt = new JSEncrypt({
  default_key_size: 1024
});

function SignUp() {
  const fullName = document.getElementById("fullName").value.trim();
  const birthDate = document.getElementById("birthDate").value;
  const yearLevel = document.getElementById("yearLevel").value.trim();
  const gender = document.getElementById("gender").value.trim();
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;

  if (!fullName || !birthDate || !yearLevel || !gender || !username || !password) {
    document.getElementById("message").textContent = "Please complete all fields.";
    document.getElementById("message").style.color = "red";
    return;
  }

  const publicKey = crypt.getPublicKey();
  const privateKey = crypt.getPrivateKey();

  const user = {
    fullName: fullName,
    birthDate: birthDate,
    yearLevel: yearLevel,
    gender: gender,
    username: username,
    password: password
  };

  const encryptedUser =
    encryptData(fullName, publicKey) + "|" +
    encryptData(birthDate, publicKey) + "|" +
    encryptData(yearLevel, publicKey) + "|" +
    encryptData(gender, publicKey) + "|" +
    encryptData(username, publicKey) + "|" +
    encryptData(password, publicKey);

  const encryptedParts = encryptedUser.split("|");

  const decryptedUser = {
    fullName: decryptData(encryptedParts[0], privateKey),
    birthDate: decryptData(encryptedParts[1], privateKey),
    yearLevel: decryptData(encryptedParts[2], privateKey),
    gender: decryptData(encryptedParts[3], privateKey),
    username: decryptData(encryptedParts[4], privateKey),
    password: decryptData(encryptedParts[5], privateKey)
  };

  document.getElementById("originalMessage").textContent =
    JSON.stringify(user);

  document.getElementById("encryptedMessage").textContent =
    encryptedUser;

  document.getElementById("decryptedMessage").textContent =
    JSON.stringify(decryptedUser);

  document.getElementById("message").textContent =
    "Sign-up successful. Encryption and decryption completed.";

  document.getElementById("message").style.color = "green";
}

function encryptData(data, publicKey) {
  const rsa = new JSEncrypt();
  rsa.setPublicKey(publicKey);
  return rsa.encrypt(data);
}

function decryptData(data, privateKey) {
  const rsa = new JSEncrypt();
  rsa.setPrivateKey(privateKey);
  return rsa.decrypt(data);
}
