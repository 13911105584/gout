# Gout

> Agrégateur d'Internet (flux RSS et tout le reste).

## Description

Gout est une **extension** Firefox / Chrome pour récupérer des informations sur
Internet (flux RSS / Atom, résultats d'API, parsing de pages Web) et les
afficher sur une seule page. Le paramétrage des données récupérées se fait avec
du [JSON](https://www.json.org/json-fr.html "JavaScript Object Notation"). Il
est aussi possible de développer des modules et des scrapers pour agréger de
nouveaux sites Internet.

## Démonstration

Une version de démonstration non-configurable est disponible sur :

- **[Firefox Add-ons](https://addons.mozilla.org/ "AMO")** ;
- **[Chrome Web
  Store](https://chrome.google.com/webstore/category/extensions)**.

## Configuration

Cette procédure décrit la création de votre version personnalisée de
l'extension. Vous aurez besoin de [`git`](https://git-scm.com/) et
[Node.js](https://nodejs.org/fr/) (`npm`). Commencez par cloner le projet, puis
installez les dépendances :

```shell
git clone https://github.com/regseb/gout.git
cd gout
npm install
```

### Firefox

Si vous comptez utiliser Gout dans Firefox : ouvrez le fichier *config.json* et
renseignez la propriété `firefox.id` avec votre nom / pseudo. Cette valeur sera
utilisée pour identifier votre version de Gout dans Firefox Add-ons (le
gestionnaire de modules de Firefox). Exécutez ensuite la commande `npm run
gout:init`. Puis, dans Firefox, rendez vous dans le *gestionnaire de modules
complémentaires*. Ouvrez l'outil pour *déboguer des modules*. *Chargez un module
temporaire* en ouvrant le fichier *src/manifest.json*.

### Chrome

Exécutez la commande `npm run gout:init`. Puis, dans Chrome, allez dans la page
paramétrage des *extensions*. Activez le *mode développeur*, puis *chargez
l'extension non empaquetée* en ouvrant le répertoire *src/*.

## Paramétrage

Vous pouvez ensuite ajouter des
**[modules](https://github.com/search?q=topic%3Agout+module)** /
**[scrapers](https://github.com/search?q=topic%3Agout+scraper)** externes et
vous inspirer des **[widgets](https://github.com/search?q=topic%3Agout+widget)**
de la communauté. Pour voir vos changements de la configuration, il suffit
d'actualiser la page.

## Déploiement

### Firefox

Quand vous êtes satisfait de vos tableaux de bord, il vous reste à signer votre
extension pour la déployer. Créez un compte sur
[Firefox Add-ons](https://addons.mozilla.org/ "AMO") et générez une clé pour
l'API. Copiez l'*émetteur du JWT* et le *secret JWT* respectivement dans les
propriétés `firefox.issuer` et `firefox.secret` du fichier *config.json*. Puis
exécutez `npm run gout:sign` pour signer l'extension. Votre version de
l'extension ne sera pas publiée.

Ouvrez, avec Firefox, le fichier *XPI* généré (*dist/gout.xpi*) pour l'installer
définitivement.

## Licence

L'extension est publiée sous la [licence publique de l’Union européenne - EUPL
v1.2](https://joinup.ec.europa.eu/collection/eupl/eupl-text-11-12).
