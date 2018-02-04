# core/feed

Ce module affiche la liste des derniers éléments d'une liste de flux.

## Configuration

Le répertoire du widget doit avoir un fichier ***config.json*** contenant un
objet
[JSON](https://www.json.org/json-fr.html "JavaScript Object Notation") avec les
propriétés suivantes :

- `"color"` : la couleur de fond du cadre (au format hexadécimale, régulier RGB
  ou avec des mots-clefs prédéfinis) ;
- `"cron"` : la notation cron indiquant la fréquence de mise à jour.

Une image ayant pour nom ***icon.svg*** peut aussi est présente dans le
répertoire du widget. Par défaut, le symbole *RSS* sera utilisé. L'image doit
être carrée et le dessin doit occupé toute la zone de l'image. Si le dessin
n'est pas carré, il faut le centrer verticalement et l'aligner à droite. Seule
la couleur noire doit être utilisée et elle doit avoir une opacité de `0.2`.

**28** est une taille raisonnable pour la largeur du cadre. La hauteur dépend
du nombre d'éléments qu'il faut afficher dans le cadre. Si vous souhaitez
avoir les *N* derniers éléments : il faut fixer la hauteur à *N + 1*.

## Scraper

Les scrapers associés à ce module doivent définir une méthode `extract()` qui
prend en paramètre un nombre indiquant le nombre de résultats à retourner.
Chaque résultat est un objet JSON ayant les propriétés :

- `"title"` : le titre de l'élément ;
- `"desc"` : la description de l'élément qui sera affichée dans l'info-bulle ;
- `"link"` : le lien de l'élément ;
- `"icon"` : l'URL de l'icône qui préfixera le titre ;
- `"guid"` : un identifiant de l'élément ;
- `"date"` : le nombre de millisecondes depuis le 1er janvier 1970 à 00:00:00
  UTC.

Les scrapers du module *core/stack* peuvent aussi être utilisés.

## Exemple

Cette configuration affiche les cinq dernières actualités du site
[LinuxFr.org](https://linuxfr.org/) (avec une mise à jour toutes les dix
minutes).

```JSON
{
    "feed/linuxfr": {
        "module": "core/feed",
        "coord": { "x": 1, "y": 1, "w": 28, "h": 6 },
        "files": {
            "config.json": {
                "color": "#ff9800",
                "cron": "*/10 * * * *"
            }
        },
        "scrapers": [
            {
                "scraper": "core/feed/atom",
                "config": {
                    "url": "https://linuxfr.org/news.atom"
                }
            }
        ]
    }
}
```