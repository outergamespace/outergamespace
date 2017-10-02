Outer Game Space follows the style guide as outlined by [AirBnB](https://github.com/airbnb/javascript)
https://github.com/airbnb/javascript

##Setting up ESLint with AirBnB

[npm instructions](https://www.npmjs.com/package/eslint-config-airbnb)
https://www.npmjs.com/package/eslint-config-airbnb

```
npm info "eslint-config-airbnb@latest" peerDependencies
export PKG=eslint-config-airbnb;
npm info "$PKG" peerDependencies --json | command sed 's/[\{\},]//g ; s/: /@/g' | xargs npm install --save-dev "$PKG"
```
