# A reviser (competences)

- Qu'est ce que this en JS (vanilla)
- Qul est la difference entre vue js et js vanilla / pouruqoi on utiliseras un framework avec les 50 milles qui existe
  plutot que du vanilla
- Quel est la difference entre natif et web mobile
- A quoi sa sert axios

# Global

- Import boostrap et boostrap icon dans le projet complet
- tout les fichiers qui sont des pages, les renommées a la fin : "Page"
- Dans les views qui importe des components, mettre des v-if si on souhaite afficher des choses ou pas si t'es connecté
  ou non
- Crée un layout global pour judgement, voir ce que sais des slots
- UTILISER COMPUTED POUR FAIRE LES FILTRES SELON LES DATA QU'ON VEUX AFFICHER (ex feed spcility)
- dans les code ou faut rediriger vers une route, utiliser le nom de la route + paramrs (eu avec alban sur
  linkSpecifically de feed )
- pour toute code de for, on crée un composents qui contient des props (comme city)
- un component quand c'est pertinent
- trouver moyen de faire une sorte de notification (message vert et rouge sur le dom)
- trouver une solution pour gerer les redirections plutot que windows reload
- pas crée une variable venant d'une autre variable (voir editvotes pour getRating avec getMovies )
- Plutot que crée une variable pour le body pour faire les requetes, autnat crée a l'avance un objet qui va s'etre envoyé au body
- retirer format dans les method car normalement y'a pas besoin
- refaire la page movie au propre avec des composants et tout
- Refaire city et tout aussi

# Page précise
- Pour genreMoviesJudg -> revoir un systeme propre pour : 
   - charger l'api
   - et au changement de page tout refaire et reafficher 
- Dans l'edit de collection, pouvoir drag and drop pour organiser les positions

# Rooter

- au import retirer les components, que des views
- premiere lettre en maj
- gerer les authorisation de qui peut entre dans les page du rooter directement, avec befor enter, voir middlewaire et
  les page 404 dans vue-rooter

# Component

- Les api sont des fichiers JS tout court des maintenant

# Autre

- modifier pour utiliser axios