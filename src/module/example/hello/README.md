# example/hello

Ce module d'exemple affiche le texte « Hello *someone*! », où *someone* est
configurable.

## Configuration

Le répertoire du widget doit avoir un fichier ***config.json*** contenant un
objet
[JSON](https://www.json.org/json-fr.html "JavaScript Object Notation") avec les
propriétés suivantes :

- `"color"` (optionnel - valeur par défaut : `"black"`) : la couleur de fond du
  cadre (au format hexadécimale, régulier RGB ou avec des mots-clefs
  prédéfinis) ;
- `"who"` : le texte qui remplacera *someone*.

Une image ayant pour nom ***icon.svg*** doit aussi est présente dans le
répertoire du widget.

## Scraper

Ce module n'utilise pas de scraper.

## Exemple

Cet exemple affiche le texte « Hello world! » sur fond rouge.

```JSON
{
    "module": "example/hello",
    "files": {
        "config.json": {
            "color": "#f44336",
            "who": "world"
        }
    }
}
```
