# How this sample is created

* Create a polymer project

    ```
    polymer init polymer-3-starter-kit
    ```

* Add `dwt` library reference and global variables in `index.html`

    ```html
    <script src="https://unpkg.com/dwt@16.2.4/dist/dynamsoft.webtwain.min.js"></script>
    <script type="text/javascript">
    var DWObject;
    window.onload = function () {
        Dynamsoft.WebTwainEnv.ProductKey = 't00921wAAAFYTYbgeiIdPK/NgJGUa+hoxpIV23O5q0c3iJmgz9SNsUIdL+FXtlfepBdbdSwiOHFSHPHA8y+SbtM5LGx2Bq+HeJUMV3kCdQNkBuiQoux/EPZaxC1UGK3k=';
        Dynamsoft.WebTwainEnv.ResourcesPath = 'https://unpkg.com/dwt@16.2.4/dist/';
    };
    </script>
    ```

* Modify `src/my-app.js`

    from
    
    ```html
    <a name="view1" href="[[rootPath]]view1">View One</a>
    ```
    
    to

    ```html
    <a name="view1" href="[[rootPath]]view1">Scan Documents</a>
    ```

* Modify `my-view1.js`

  + Add functions

    ```javascript
    ready(){
        super.ready();
        this.showDWT();
    }
    showDWT() {
        Dynamsoft.WebTwainEnv.CreateDWTObjectEx({ WebTwainId: 'shadowDom' }, (obj) => {
        this.shadowRoot.querySelector('#showDWT').style.display = "none";
        this.shadowRoot.querySelector('#scanbtn').style.display = "";
        DWObject = obj;
        DWObject.Viewer.bind(this.shadowRoot.querySelector('#dwtcontrolContainer'));
        DWObject.Viewer.width = 560;
        DWObject.Viewer.height = 600;
        DWObject.Viewer.show();
        }, function (e) {
        console.log(e)
        });
    }
    handleClick() {
        if (DWObject) {
        DWObject.SelectSource(function () {
            DWObject.AcquireImage(function () {

            }, function (err) { console.log(err); });
        }, function (err) { console.log(err); });
        }
    }
    ```
  + Change HTML

    from

    ```html
    <div class="card">
        <div class="circle">1</div>
        <h1>View One</h1>
        <p>Ut labores minimum atomorum pro. Laudem tibique ut has.</p>
        <p>Lorem ipsum dolor sit amet, per in nusquam nominavi periculis, sit elit oportere ea.Lorem ipsum dolor sit amet, per in nusquam nominavi periculis, sit elit oportere ea.Cu mei vide viris gloriatur, at populo eripuit sit.</p>
    </div>
    ```

    to

    ```html
    <div class="card">
        <div class="circle">1</div>
        <h1>Use Dynamic Web TWAIN to Scan</h1>
        <div id="dwtcontrolContainer"></div>
        <button id="showDWT" on-click="showDWT">Start</button>
        <button id="scanbtn" on-click="handleClick" style="display:none">scan</button>
    </div>
    ```

------The following is the original readme from the polymer template------

# Polymer App Toolbox - Starter Kit

[![Build Status](https://travis-ci.org/Polymer/polymer-starter-kit.svg?branch=master)](https://travis-ci.org/Polymer/polymer-starter-kit)

This template is a starting point for building apps using a drawer-based
layout. The layout is provided by `app-layout` elements.

This template, along with the `polymer-cli` toolchain, also demonstrates use
of the "PRPL pattern" This pattern allows fast first delivery and interaction with
the content at the initial route requested by the user, along with fast subsequent
navigation by pre-caching the remaining components required by the app and
progressively loading them on-demand as the user navigates through the app.

The PRPL pattern, in a nutshell:

* **Push** components required for the initial route
* **Render** initial route ASAP
* **Pre-cache** components for remaining routes
* **Lazy-load** and progressively upgrade next routes on-demand

### Setup

##### Prerequisites

Install [Polymer CLI](https://github.com/Polymer/polymer-cli) using
[npm](https://www.npmjs.com) (we assume you have pre-installed [node.js](https://nodejs.org)).

    npm install -g polymer-cli@next

##### Initialize project from template

    mkdir my-app
    cd my-app
    polymer init polymer-3-starter-kit

### Start the development server

This command serves the app at `http://127.0.0.1:8081` and provides basic URL
routing for the app:

    npm start

### Build

The `npm run build` command builds your Polymer application for production, using build configuration options provided by the command line or in your project's `polymer.json` file.

You can configure your `polymer.json` file to create multiple builds. This is necessary if you will be serving different builds optimized for different browsers. You can define your own named builds, or use presets. See the documentation on [building your project for production](https://www.polymer-project.org/3.0/toolbox/build-for-production) for more information.

The Polymer Starter Kit is configured to create three builds. These builds will be output to a subdirectory under the `build/` directory as follows:

```
build/
  es5-bundled/
  es6-bundled/
  esm-bundled/
```

* `es5-bundled` is a bundled, minified build with a service worker. ES6 code is compiled to ES5 for compatibility with older browsers.
* `es6-bundled` is a bundled, minified build with a service worker. ES6 code is served as-is. This build is for browsers that can handle ES6 code - see [building your project for production](https://www.polymer-project.org/3.0/toolbox/build-for-production#compiling) for a list.
* `esm-bundled` is a bundled, minified build with a service worker. It uses standard ES module import/export statements for browsers that support them.

Run `polymer help build` for the full list of available options and optimizations. Also, see the documentation on the [polymer.json specification](https://www.polymer-project.org/3.0/docs/tools/polymer-json) and [building your Polymer application for production](https://www.polymer-project.org/3.0/toolbox/build-for-production).

### Preview the build

This command serves your app. Replace `build-folder-name` with the folder name of the build you want to serve.

    npm start build/build-folder-name/

### Run tests

This command will run [Web Component Tester](https://github.com/Polymer/web-component-tester)
against the browsers currently installed on your machine:

    npm test

If running Windows you will need to set the following environment variables:

- LAUNCHPAD_BROWSERS
- LAUNCHPAD_CHROME

Read More here [daffl/launchpad](https://github.com/daffl/launchpad#environment-variables-impacting-local-browsers-detection)

---

Looking for our older PSK2 Polycast or migration blog post? See [the previous README](https://github.com/Polymer/polymer-starter-kit/blob/v3.2.1/README.md).
