const scriptJS = `
const publicKey = "<RSA_PUBLIC_KEY>";
const privateKey = "<RSA_PRIVATE_KEY>";

async function encryptAndSave() {
    let site = document.getElementById("site").value;
    let password = document.getElementById("password").value;
    let aesKey = crypto.getRandomValues(new Uint8Array(16));
    let encryptedPassword = await aesEncrypt(password, aesKey);
    let encryptedKey = await rsaEncrypt(aesKey, publicKey);
    
    fetch('/save', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ site, encryptedPassword, encryptedKey })
    });
}

async function retrievePasswords() {
    let response = await fetch('/retrieve');
    let passwords = await response.json();
    let list = document.getElementById("passwordList");
    list.innerHTML = "";
    for (let item of passwords) {
        let aesKey = await rsaDecrypt(item.encryptedKey, privateKey);
        let decryptedPassword = await aesDecrypt(item.encryptedPassword, aesKey);
        list.innerHTML += `<li>${item.site}: ${decryptedPassword}</li>`;
    }
}
`;
