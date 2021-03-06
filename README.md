# Attestation-facile.fr

Générateur facile d'attestations pour le COVID-19.

## Développer

### Installer le projet

```console
git clone https://github.com/Aituglo/attestation-facile.fr
cd attestation-facile.fr
npm i
npm start
```

## Générer et tester le code de production

### Tester le code de production en local

#### Générer le code de production pour tester que le build fonctionne en entier

```console
npm run build:dev
```

#### Tester le code de production en local

```console
npx serve dist
```

Et visiter http://localhost:5000

Le code à déployer sera le contenu du dossier `dist`

## Crédits

Ce projet a été réalisé à partir d'un fork du dépôt [attestation-deplacement-derogatoire-q4-2020](https://github.com/LAB-MI/attestation-deplacement-derogatoire-q4-2020)

Les projets open source suivants ont été utilisés pour le développement de ce
service :

- [PDF-LIB](https://pdf-lib.js.org/)
- [qrcode](https://github.com/soldair/node-qrcode)
- [Bootstrap](https://getbootstrap.com/)
- [Font Awesome](https://fontawesome.com/license)
