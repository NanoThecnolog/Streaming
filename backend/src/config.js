module.exports = {
    // PRODUÇÃO = false
    // HOMOLOGAÇÃO = true
    sandbox: process.env.EFI_SANDBOX === false,
    client_id: process.env.EFI_CLIENT_ID,
    client_secret: process.env.EFI_CLIENT_SECRET,
    certificate: process.env.EFI_CERTIFICATE,
};