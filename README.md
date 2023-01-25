
## Getting started

```bash
git clone ssh://git@git.amaisoft.com:2224/peseobaby/chz-admin.git
cd chz-admin
touch README.md
git add README.md
git commit -m "add README"
git push -u origin master

# install dependency
yarn install & yarn

# develop
npm run dev & yarn dev
```

This will automatically open http://localhost:9527

## Build

```bash
# build for test environment
npm run build:stage

# build for production environment
npm run build:prod
```

## Advanced

```bash
# preview the release environment effect
npm run preview

# preview the release environment effect + static resource analysis
npm run preview -- --report

# code format check
npm run lint

# code format check and auto fix
npm run lint -- --fix
```

