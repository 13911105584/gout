# /std/icon

Ce widget affiche une icône dans un lien.

## Configuration

Le répertoire de la passerelle doit avoir un fichier ***config.json***
contenant un objet
[JSON](http://www.json.org/json-fr.html "JavaScript Object Notation") avec la
propriété suivante :

- `"cron"` : la notation cron indiquant la fréquence de mise à jour.

Le widget doit être carré.

## Scraper

Les scrapers associés à ce widget doivent définir une méthode `extract()` et qui
retourne un objet JSON ayant les propriétés :

- `"icon"` : l'URL de l'image ;
- `"desc"` : la description de l'élément ;
- `"link"` : le lien de l'élément ;
- `"color"` : la couleur de fond du cadre (au format hexadécimale, régulier RGB
  ou avec des mots-clefs prédéfinis).

## Exemple

Cet exemple affiche un bouton qui redirige vers *Facebook*.

```JSON
{
    "std/icon/facebook": {
        "widget": "std/icon",
        "coord": { "x": 1, "y": 1, "w": 3, "h": 3 },
        "files": { "config": {} },
        "scrapers": [
            {
                "scraper": "std/repeater",
                "config": {
                    "icon": "gate/me/std/icon/facebook/icon.svg",
                    "link": "https://www.facebook.com/",
                    "desc": "Facebook",
                    "color": "#2196f3"
                }
            }
        ]
    }
}
```