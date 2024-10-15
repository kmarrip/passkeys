##GooglePassKeys

1. This is a new authentication mechanism for registering and logging in users.
2. The user doesn't have to remember the passwords anymore, authentication happens over public key cryptography.
3. The private key is stored in users device and the public key is stored at the server side, the private key is
   never shared with anyone. The server authenticates by making the client solve a challenge, under the assumption that
   no-other entity can solve the challenge without knowing the private key.
