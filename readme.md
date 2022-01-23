# Taskberry server 🫐

## Installation

Cloner le repo et lancer un `yarn` pour récupérer les dépendances. Se diriger ensuite vers le terminal et accéder à l'interface mysql

```sh
mysql -u root -p
```

puis créer la base pour que Prisma puisse y accéder

```sql
CREATE DATABASE IF NOT EXISTS taskberry;
```

quitter mysql avec `exit` et créer un fichier `.env` pour renseigner la variable pour la connexion a la db

```dosini
PRISMA_DATABASE_URL=mysql://root:password$@localhost:3306/taskberry
```

lancer ensuite la migration Prisma

```sh
npx prisma migrate dev --name init
```

lancer ensuite le serveur avec `yarn start` qui sera sur [localhost:4000](http://localhost:4000/)

![apollo server](https://i.ibb.co/jRgwD1M/image.png)

## Tests & docker

Pour chaque feature, rédiger les tests pour s'assurer que le dev n'a pas provoqué des effets indésirables sur les autres cas de figure.

Pour les tests avec le build docker

```sh
docker-compose -f docker-compose.test.yml build --no-cache
docker-compose -f docker-compose.test.yml run --rm server yarn prisma migrate dev --name init
docker-compose -f docker-compose.test.yml run --rm server yarn jest -i
```

La documentation des tests unitaires pour Prisma + Jest est disponible sur [Prisma Docs](https://www.prisma.io/docs/guides/testing/unit-testing)

## Infos

### Prisma studio

Pour lancer Prisma studio

```sh
npx prisma studio
```

Une session sera lancée sur [localhost:5555](http://localhost:5555/)

![prisma studio](https://i.ibb.co/X5cy56m/image.png)

### Commits & merge

Quand une feature est terminée, rebase sur master avant de créer un PR:

```sh
git rebase master
```

gérer les conflits et continuer avec

```sh
git rebase --continue
```

**si nécéssaire** appliquer un `push` (regarder l'arbre des commits)

```sh
git push --force
```

quand la branche est merge, on peut supprimer la branche locale et distante

```sh
git branch -d <branch>
git push -d origin <branch>
```

Si commits WIP présents sur la branche, rejouer les commits après un `reset` et faire un `push` une fois terminé

```sh
git reset <sha commit parent>
git push --force
```
