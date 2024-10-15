const register = async ()=>{
    const publicKeyCredentialOptions: PublicKeyCredentialCreationOptions = {
        challenge: new ArrayBuffer(8),
        rp: {
          name: "Example",
          id: "localhost",
        },
        user: {
          id: new ArrayBuffer(10),
          name: "Krishna Chaithanya",
          displayName: 'Krishna'
        },
        pubKeyCredParams: [{alg: -7, type: "public-key"},{alg: -257, type: "public-key"}],
        authenticatorSelection: {
          authenticatorAttachment: "platform",
          requireResidentKey: true,
        }
      };
    const credential = await navigator.credentials.create({
        publicKey: publicKeyCredentialOptions
    })
    console.log(credential)
    return credential;
}

export {register}