# auth-system
Multi-factor authentification:

Ce projet per l'authentification à double facteur: l'utilisateur s'authentifie avec son email et mot de passe ensuite  on vérifie son numéro de téléphone via un code envoyé à son numéro.

Outils utilisés:
    - Réact: utilisé pour le frontend
    - Express: utilisé pour le backend
    - Novu ; utilisé pour mettre en place le système de vérification de numéro de téléphone. https://novu.co/


initialisation du projet:

git clone https://github.com/fabrice32/auth-system.git

1) Entrer dans le dossier auth-system
2) Lancer npm install
3) ensuite git init
4) Entrer dans le dossier Client et Server l'un après l'autre et lancer npm install.
5) Pour lancer l'application:
        Entre dans client:
            lancer npm start
        
        Entrer dans Server:
            lancer node index.js
