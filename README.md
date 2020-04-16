# Module JS / SPA - Vue.js

## Préambule
En préambule de ce module, familiarisez-vous avec le concept de Single Page Application (SPA). L'objectif est de répondre aux questions suivantes :
* Quand et pourquoi ce type d'applications a vu le jour ?
* Quels sont les avantages et inconvénients de cette approche ?
* Quels sont les principaux frameworks utilisés pour développer des "SPA" en 2020 ? 

**Livrables**
1. Un schéma simplifié illustrant le fonctionnement d'une SPA
2. Un tableau comparatif des principaux frameworks, comportant les informations suivantes :
    * Date de création
    * Communauté / entreprise assurant le développement
    * License
    * Points forts
    * Points faibles


## Mise en place des outils de développement Vue.js
Tout comme de nombreux frameworks web, Vue.js propose des outils permettant de faciliter le développement. 
Nous allons ici mettre en place ces outils dans votre environnement de développement.

### Extension de navigateur web - Vue DevTools
Installez l'extension Vue DevTools pour votre navigateur web en suivant les instructions : https://github.com/vuejs/vue-devtools
 
### Outil en ligne de commande Vue - Vue CLI
Installez l'outil `vue-cli` avec NPM :

`npm install --global @vue/cli`

Question : Rappelez ce qu'est NPM et pourquoi nous utilisons l'option `--global` ici ?

Votre réponse :

Vérifier que la version de Vue CLI installée est au moins la version 4 :

`vue --version`

Dans un premier temps, Vue CLI ne sera pas utilisé dans la phase de découverte proposée ci-dessous. Il sera cependant utile pour créer vos projets Vue.js lors des phases suivantes. Il vous permettra également de démarrer un serveur de développement pour tester vos projets en local.  

## Découverte de Vue.js
Pour commencer, nous allons prendre en main Vue.js en le chargeant, simplement dans notre page, comme une librairie externe, comme on le fait pour jQuery.

### Objectifs
* Constater la différence de logique entre jQuery et Vue.js
* Prendre en main les outils de développement de Vue.js
* Découvrir Vue.js avec des fonctionnalités simples
* Stocker la donnée de sa page dans l'objet data de Vue

### Consignes
* Découvrez les différences entre jQuery et Vue.js en comparant ces exemples simples sur codepen (cliquez sur les liens) :
  * Capturer un texte entré dans un champ de saisie : [jQuery][1] | [Vue.js][2]
  * Ajouter / Enlever une classe sur un élément : [jQuery][3] | [Vue.js][4]
  * Afficher / Cacher un élément au clic sur un bouton : [jQuery][5] | [Vue.js][6]

_Utilisez vos Vue Devtools pour comprendre le fonctionnement des exemples Vue. Codepen Tip : Pour activer le mode vue pleine page, remplacez le chemin “/pen/…” par “/debug/…” dans l’URL des exemples. Cette vue vous permettra de lancer les Vue Devtools sur la page._

* Chargez la librairie Vue depuis un fichier externe, comme vous le feriez pour jQuery (utilisation d’un CDN)
* Créez directement dans un fichier HTML votre première application Vue. 
* Rendez votre application réactive : affichez du texte qui sera renseigné en Javascript, dans l'objet data de Vue.
* Modifiez la valeur de votre data en Javascript dans la console de votre DevTools.
* Modifiez la valeur de votre data dans l'extension Vue DevTools.

### Ressources
* Le guide de démarrage du site web Vue.js est très complet, à jour et en français : https://fr.vuejs.org/v2/guide/index.html
* Les exemples interactifs proposés sur ce même site : https://fr.vuejs.org/v2/examples/index.html


### Livrables
Un projet en local utilisant Vue.js, contenant :
* Un champ input permettant de mettre à jour le contenu d’une balise H1
* Un champ input permettant de mettre à jour le contenu d’une balise H1 au clic sur un bouton. Attention, pas seulement quand l'input perd le focus ! 
* Une checkbox permettant d’ajouter la classe "red" aux H1 et H2 quand elle est cochée
* Une checkbox pour afficher / masquer une image

Question complémentaire : prenez le temps de comparer ce premier usage de Vue.js à vos réalisations précédentes avec Javascript. Comment aurait-on pu procéder pour réaliser les mêmes fonctionnalités avec du Javascript "vanilla" ? Avec jQuery ? Quel est l'apport de Vue.js par rapport à ces alternatives ?  


[1]: https://codepen.io/romainpetit/pen/rRjYdPjQuery
[2]: https://codepen.io/romainpetit/pen/jJyaKx
[3]: https://codepen.io/sdras/pen/8dff4c085a5dcf52ea04d4b06d68b409
[4]: https://codepen.io/romainpetit/pen/XGpzyw
[5]: https://codepen.io/romainpetit/pen/mgGGQx
[6]: https://codepen.io/romainpetit/pen/MxJmOm


## Un premier projet Vue.js
Vous allez maintenant créer un projet Vue.js plus complet, dont l'objectif sera d'afficher les relevés météo de villes au format liste et sur une carte interactive.

### Création du projet
Pour créer votre projet, vous allez cette fois utiliser Vue CLI. À partir du répertoire parent souhaité pour votre projet, exécutez la commande :

`vue create NOM_PROJET`

Si des questions vous sont posées, choisissez les options par défaut.

Une fois le projet créé, prenez le temps de passer en revue les fichiers et dossiers créés dans votre répertoire projet. Quels sont ceux que vous connaissez ? Quelle est leur fonction ?

À partir des instructions fournies dans le fichier README.md, démarrez votre application Vue.js pour le développement.


### 2) Écran d'accueil.

Dans un premier temps, nous voulons changer l'écran d'accueil : ce dernier va permettre d'accéder à la liste des données météo des villes.

Faites les modifications nécessaires.

- Ajoutez dans votre composant App la méthode `onListClick` qui se contentera pour l'instant de faire une [alerte](https://developer.mozilla.org/fr/docs/Web/API/Window/alert) pour marquer le fait qu'un utilisateur a cliqué dessus.

### 3) Préparation des écrans.

Nous voulons préparer l'écran de la liste des villes. En Vue.js chaque écran est un composant : pour cet écran, il nous faudra donc 1 nouveau composant.

- Créez donc un fichier `CitiesList.vue`. Le template de ce composant sera très simple dans un premier temps, par exemple un simple titre H1 contenant 'Météo - Liste des villes' est suffisant.

- Faites en sorte d'ajouter ce composant Vue.js au template de votre app.

➡️**Commiter dans git avec un message explicite, par exemple "fin étape 3" ou même "Ajout composant CitiesList"**

### 4) Mise en place d'un routeur.

Le problème est que nous ne voulons pas avoir une seule page sur notre application.
Nous devons avoir la possibilité de naviguer d'une page à l'autre, sans recharger la page ou sans afficher une nouvelle page HTML : pour cela, nous avons besoin de mettre en place **un routeur**.

C'est la même chose qu'avec le framework Laravel, sauf qu'ici le routeur est côté client : nous devons définir nos routes côté client et avoir moyen d'en changer.

Cela tombe bien, Vue.js a un routeur tout prêt que nous allons utiliser, [vue-router](https://router.vuejs.org/fr/)

##### 4.1) Installation.

Faites l'installation avec npm comme décrite dans la documentation. N'oubliez pas d'ajouter après l'installation ces deux lignes :

```
import VueRouter from 'vue-router'

Vue.use(VueRouter)
```

##### 4.2) Configuration.

Nous voulons déclarer une route `/liste` avec la liste des villes.

- Déclarez votre tableau de routes dans le fichier `index.js` du répertoire `router` en faisant référence au composant créé auparavant.

- Initialisez l'objet router de Vue contenant ces routes et injectez-le dans la création de l'app Vue, votre code doit ressembler à :

```
new Vue({
  router
}).$mount("#app");
```

- Supprimez maintenant le composant `CitiesList` du template de notre composant `App.vue`.

Vous devriez retomber sur un écran correspondant à l'étape 1 plus haut.

Nous avons initialisé notre composant mais nous ne l'avons pas utilisé.

##### 4.3) Utilisation.

Pour l'utiliser nous devons utiliser les deux composants fournis par VueRouter :

- `<router-view></router-view>` affiche le contenu de la route correspondant au composant spécifié dans la déclaration.
- `<router-link to="" ></router-link>` permet de passer d'une page à l'autre.

Ajoutez donc `<router-view></router-view>` à la fin du template de notre composant `App.vue` et utilisez `<router-link to="NOM_ROUTE" ></router-link>` pour passer d'une page à l'autre dans le même composant.

### 5) Création d'un composant pour représenter la météo d'une ville.

A ce stade, la liste de villes est vide, il n'y a donc pas de navigation possible à partir de la liste. Nous allons cependant créer la vue détaillée de la météo d'une ville, qui pourra être rendue accessible soit via un bouton `<router-link to="..." ></router-link>` (temporaire) ou en saisissant l'URL directement comme indiqué en fin de section.

##### 5.1) Composant statique dans une nouvelle route.

Créez dans un premier temps une nouvelle route `'/ville'` qui va représenter un nouveau composant à créer, `City.vue`.

Ce composant aura comme `data` l'objet javascript suivant :

```
{
    name: 'Ma ville', // nom de la ville
    weather: 'Peu nuageux', // descriptif météo 
    temperature: 20.55, // température en °C
    updatedAt: new Date() // date de dernière mise à jour
}
```

Vous être libre de choisir le rendu du composant, à partir du moment où il exploite les différents champs de l'objet `data` ci-dessus. 

Notes :

- Pour afficher la date, la méthode [toLocaleString()](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Date/toLocaleString) de `Date()` devrait vous aider.
- On a déclaré une route mais pas donné de lien explicite dans l'application pour y accéder, mais vous pouvez directement [changer l'url du navigateur](http://localhost:8080/#/ville).

➡️**Faites un commit avec un message explicite**

##### 5.2) Passage de props au composant City.

Nous avançons bien ! Notre dernier composant va nous aider à construire l'écran comprenant la liste de nos villes. Mais aujourd'hui il a une limite : on ne peut pas définir le nom ni le statut de notre ville sans toucher au code, il faut trouver un moyen de paramétrer notre composant. Pour cela nous allons utiliser la notion de props dans Vue.js.

Pensez aux props comme aux paramètres d'une fonction :
Pour rendre paramétrable une fonction il faut ajouter des paramètres. Pour rendre paramétrable un composant, il faut ajouter des props.

- Dans un premier temps, appelez le composant `City` dans le composant `CitiesList`. Vous devriez donc avoir la même page aux urls `/villes` et `/ville`.

- Ajoutez le fait que le composant `Ville` a 4 props qui s'appellent `name`, `weather`, `temperature`, et `updatedAt`, supprimez les données du `data` du composant `City`, puis ajoutez les dans le composant `CitiesList`.

* Modifiez le composant `CitiesList` pour passer les props `name`, `weather`, `temperature`, et `updatedAt`.

À ce stade, vous devriez avoir la même chose qu'avant en terme de rendu, néanmoins nous sommes prêts à faire notre liste de villes car nous avons un composant `City` qui est désormais paramétrable grâce aux props !

➡️**Faites un commit avec un message explicite**

### 6) Création d'une liste.

➡️ Modifiez le composant `CitiesList` pour que son objet `data` contienne l'objet suivant :

```js
{
  cities: [
    {
      id: 1,
      name: 'Ville 1',
      weather: 'Ensoleillé',
      temperature: 22.0,
      updatedAt: new Date()
    },
    {
      id: 2,
      name: 'Ville 2',
      weather: 'Peu nuageux',
      temperature: 19.5,
      updatedAt: new Date()
    }
  ]
}
```

➡️ Bouclez maintenant sur cette donnée pour appeler autant de fois le composant `City` qu'il y a d'objets dans ce nouveau `data` de `CitiesList`.

**Question :** Remarquez que nous avons ajouté une clef `id` à nos objets, pourquoi ?

**Votre réponse :**

➡️ Modifiez un peu le style pour que les éléments de la liste soient mieux visibles.

➡️**Faites un commit avec un message explicite**

##### 6.1) Mise en forme des dates
Un timestamp complet n'est pas agréable à lire, encore moins répété dans une liste.
La librairie `timeago.js` nous permet de formatter les dates pour afficher un temps relatif, plus parlant.

➡️ Ajoutez la libraire à votre projet avec npm pour afficher la valeur de `checkedAt` avec un temps relatif.

https://github.com/hustcc/timeago.js

> Il est toujours fondamental de savoir évaluer avant de se lancer un package ou un projet sur github ou même npm.

**Question :** Prenez le temps de regarder la page, qu'est ce qui vous inspire confiance, ou au contraire, méfiance ?

**Votre réponse :**

➡️**Faites un commit avec un message explicite**

### 7) Récupérer les données via une API externe.

☝️**Préambule - Point d'étape sur l'architecture de l'application**

Avant de passer à l'étape suivante, nous allons passer en revue l'architecture de notre application Vue.js.
Pour cela, constituez un tableau à 2 colonnes, la première colonne représentant le serveur web et la 2ème le navigateur web. Par exemple :

Serveur web | Navigateur web
--- | ---
abc | def
ghi | ...


Répartissez ensuite les étapes ci-dessous dans les 2 colonnes, selon qu’elles sont traitées selon vous par le serveur ou le navigateur :
- Stocker les données de l’application
- Router les requêtes HTTP
- Effectuer le rendu des pages web
- Afficher les pages web
- Exécuter le code métier de l’application

Effectuez l’exercice pour une application Laravel, puis pour une application Vue.js.

➡️ Constatez les différences : comment pourrait-on sécuriser l’accès aux données de l’application dans ce 2ème cas ?

**Votre réponse :**


Fin du préambule
* * *

Jusqu'ici, les données météo étaient codées "en dur" dans les composants Vue.js. Vous allez désormais faire appel à une API pour récupérer de véritables relevés météo dans les villes de la région. 

Pour cela, nous allons utiliser l'API [OpenWeatherMap](https://openweathermap.org/api). Cette dernière vous permettra de récupérer des données météo en ciblant un périmètre géographique.   

Pour effectuer un test d'appel à l'API, récupèrez un code d'accès auprès du formateur ou de la formatrice (ou créez un compte gratuit OpenWeatherMap), puis accédez à l'URL suivante :
https://api.openweathermap.org/data/2.5/find?lat=45.758&lon=4.765&cnt=20&cluster=yes&lang=fr&units=metric&APPID=VOTRE_CODE_DACCES 

Quel est le format de retour de l'API ? Quels sont les champs qui vont vous permettre de récupérer les données météo recherchées ? 

##### 7.1) Installation d'une librairie permettant de faire des appels HTTP.

Pour pouvoir faire des appels à une API, Vue.js préconise l'utilisation de la librairie [axios](https://github.com/axios/axios).

Prenez toujours le temps d'analyser cette librairie sur github, qu'est ce qui vous inspire confiance ? Ayez le réflexe de chercher la librairie sur [npm](https://www.npmjs.com/package/axios) pour notamment voir le nombre de téléchargements.

- Installez la librairie avec npm.
- Prenez connaissance du [tutoriel Vue.js pour utiliser axios dans une application Vue.js](https://vuejs.org/v2/cookbook/using-axios-to-consume-apis.html)  

➡️**Faites un commit avec un message explicite**

##### 7.2) Utilisation dans le projet.

Au préalable, (re)lisez le guide MDN sur les promesses en Javascript, car ces dernières vont être importantes pour la suite. [Guide MDN](https://developer.mozilla.org/fr/docs/Web/JavaScript/Guide/Utiliser_les_promesses).
Nous allons afficher la liste des données météo des villes provenant de cette [URL](https://api.openweathermap.org/data/2.5/find?lat=45.758&lon=4.765&cnt=20&cluster=yes&lang=fr&units=metric&APPID=VOTRE_CODE_DACCES). Attention, veillez à bien indiquer votre code d'accès OpenWeatherMap dans l'URL fournie.

Comme vous avez pu le voir, une promesse a plusieurs états :

- En cours.
- Terminée et succès.
- Terminée et erreur.

Nous devons suivre ces états dans notre composant, ajoutez donc à l'objet `data` deux clefs `loading` et `error` permettant de savoir si la requête est en cours et si il y a eu une erreur.

Aussi, retirez les données des villes que nous avions mis tout à l'heure "en dur" dans l'objet data.

Votre `data` devrait désormais ressembler à ça :

```js
data: function() {
    return {
      cities: [], // au début la liste des villes est vide
      loading: false,
      error: null,
    }
}
```

Avant d'aller plus loin, il faut choisir quand lancer la requête. La solution communément admise est de dire : "Quand le composant est créé, lance la requête".

Vue.js nous permet de déclencher des actions (ou _hooks_) à certains moments précis de la vie d'un composant. La liste est disponible [ici](https://fr.vuejs.org/v2/api/index.html#Options-Cycle-de-vie-des-hooks). Celui qui nous intéresse est le `created`.

- Ajoutez donc l'appel http avec axios permettant d'afficher la liste des données météo des villes.

- Faites en sorte d'afficher un texte `requête en cours` si jamais la requête est en cours et une erreur en rouge si jamais la requête produit une erreur.

➡️**Faites un commit avec un message explicite**
