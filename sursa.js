const RSA_KEY_SIZE = 1024;

const signupForm = document.getElementById("signupForm");

const message = document.getElementById("message");
const resultPanel = document.getElementById("resultPanel");

const originalDataElement =
    document.getElementById("originalData");

const encryptedDataElement =
    document.getElementById("encryptedData");

const decryptedDataElement =
    document.getElementById("decryptedData");

const publicKeyElement =
    document.getElementById("publicKey");

const privateKeyElement =
    document.getElementById("privateKey");


signupForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const fullName =
        document.getElementById("fullName").value.trim();

    const dob =
        document.getElementById("dob").value;

    const yearLevel =
        document.getElementById("yearLevel").value;

    const gender =
        document.getElementById("gender").value;

    const username =
        document.getElementById("username").value.trim();

    const password =
        document.getElementById("password").value;

    const enrollmentData = {
        fullName: fullName,
        dateOfBirth: dob,
        yearLevel: yearLevel,
        gender: gender,
        username: username,
        password: password
    };


    const originalText =
        JSON.stringify(enrollmentData, null, 2);

    const crypt = new JSEncrypt({
        default_key_size: RSA_KEY_SIZE
    });

    crypt.getKey();


    const publicKey =
        crypt.getPublicKey();

    const privateKey =
        crypt.getPrivateKey();

    const encryptedData = {};

    for (const field in enrollmentData) {

        const value = enrollmentData[field];

        const encryptedValue =
            crypt.encrypt(value);

        if (!encryptedValue) {

            showMessage(
                "Encryption failed for field: " + field,
                "error"
            );

            return;
        }

        encryptedData[field] = encryptedValue;
    }

    const decryptedData = {};

    for (const field in encryptedData) {

        const decryptedValue =
            crypt.decrypt(encryptedData[field]);

        if (!decryptedValue) {

            showMessage(
                "Decryption failed for field: " + field,
                "error"
            );

            return;
        }

        decryptedData[field] = decryptedValue;
    }

    originalDataElement.textContent =
        originalText;

    encryptedDataElement.textContent =
        JSON.stringify(encryptedData, null, 2);

    decryptedDataElement.textContent =
        JSON.stringify(decryptedData, null, 2);

    publicKeyElement.textContent =
        publicKey;

    privateKeyElement.textContent =
        privateKey;

    resultPanel.classList.remove("hidden");


    showMessage(
        "Enrollment data successfully encrypted and decrypted using 1024-bit RSA!",
        "success"
    );

});

function showMessage(text, type) {

    message.textContent = text;

    message.className = "";

    if (type) {
        message.classList.add(type);
    }
}
