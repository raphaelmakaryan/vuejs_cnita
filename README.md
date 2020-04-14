# Module JS / SPA - Introduction à Vue.js

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


