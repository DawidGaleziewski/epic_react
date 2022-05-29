# raw API
When developing React for web we need both React and ReactDOM.
ReactDOM is used to render content on the page, similar to js append method.
React is used to creating nodes from code. Similar to js create element.

Raw react api works on noodes and looks something like this:

```js
    const helloElement = React.createElement(
      'span',
      {
        id: 'element-id',
      },
      'Text',
    ) // similar to document.createElement

    const worldElement = React.createElement('span', {id: 'tag-id'}, 'World')
    const mainAppNode = React.createElement(
      'div',
      {},
      helloElement,
      ' ',
      worldElement,
    )

    const reactRoot = ReactDOM.createRoot(rootElement)
    reactRoot.render(mainAppNode)
```

# JSX
JSX is a syntactic sugar that is used to write react code in a html-like fashion.
JSX needs complier to work like babel.
We can see how thos code gets complied here:
https://babeljs.io/repl#?browsers=defaults%2C%20not%20ie%2011%2C%20not%20ie_mob%2011&build=&builtIns=App&corejs=3.21&spec=false&loose=false&code_lz=MYewdgzgLgBArgSxgXhgHgQWwOYHoB8AUEA&debug=false&forceAllTransforms=false&shippedProposals=false&circleciRepo=&evaluate=false&fileSize=false&timeTravel=false&sourceType=module&lineWrap=true&presets=react&prettier=true&targets=&version=7.18.1&externalPlugins=&assumptions=%7B%7D



Examples of compling jsx to js:

```js
const ui = <div>Test</div>;
const ui = /*#__PURE__*/ React.createElement("div", null, "Test");


const ui = <div><span>Test</span><span>msg</span></div>
const ui = /*#__PURE__*/ React.createElement(
  "div",
  null,
  /*#__PURE__*/ React.createElement("span", null, "Test"),
  /*#__PURE__*/ React.createElement("span", null, "msg")
);

const ui = <div id="root" className="container"></div>
const ui = /*#__PURE__*/ React.createElement("div", {
  id: "root",
  className: "container"
});


const ui = <button onClick={(e) => console.log('Honk!')}>Test</button>
const ui = /*#__PURE__*/ React.createElement(
  "button",
  {
    onClick: (e) => console.log("Honk!")
  },
  "Test"
);

```

## JSX interpolation

https://babeljs.io/repl#?browsers=defaults%2C%20not%20ie%2011%2C%20not%20ie_mob%2011&build=&builtIns=App&corejs=3.21&spec=false&loose=false&code_lz=MYewdgzgLgBArgSxgXhgHgQWwOYHoB8AUEA&debug=false&forceAllTransforms=false&shippedProposals=false&circleciRepo=&evaluate=false&fileSize=false&timeTravel=false&sourceType=module&lineWrap=true&presets=react&prettier=true&targets=&version=7.18.1&externalPlugins=&assumptions=%7B%7D

When we interpolate inside jsx, using {} signals that we "exit jsx land and enter js land".

```js
const msg = "hello there"
const modalBEM = "product-box"

const ui = <div className={modalBEM + '--big-black'}>{msg}</div>
```

when complied in babel, {} inside jsx tell babel to just dont do nothing. This code will be simply moved to compiled one and used as standard javascript.

```js
const msg = "hello there";
const modalBEM = "product-box";

const ui = /*#__PURE__*/ React.createElement(
  "div",
  {
    className: modalBEM + "--big-black"
  },
  msg
);
```

## why we cant use statments inside of jsx?

Statment would be interpreted like this:

```js
const ui = <div>{if(true){return 'test'}}</div>
```


```js
const ui = /*#__PURE__*/ React.createElement(
  "div",
  {
  },
  msg + if(true){return 'test'}
);

```

Therefore that would be invalid js code. Everything interpolated inside needs to be a valid js code that can be passed as a argument to React.createElement

some other things we could do:

```js
const isLink = true;
const ui = <div id={isLink ? 'iamlink' : undefined}>Test</div>


const isLink = true;
const ui = /*#__PURE__*/ React.createElement(
  "div",
  {
    id: isLink ? "iamlink" : undefined
  },
  "Test"
);

```

we can conditionaly change tags but need to do the change/interpolation in its own variable. babel will fail to undertsand non-expicit tag names lik:

```js
const ui2 = <{isLink ? 'a' : 'div'}/>
```

but it will glady convert:
```js
const isLink = true;
const Tag = isLink ? 'a' : 'div';
const ui = <Tag id={isLink ? 'iamlink' : undefined}>Test</Tag>


const isLink = true;
const Tag = isLink ? "a" : "div";
const ui = /*#__PURE__*/ React.createElement(
  Tag,
  {
    id: isLink ? "iamlink" : undefined
  },
  "Test"
);

```

## spreagin props

Spreading props will cause babel to use Object.assign to spread the props

```js
const props = { id: "test-2", className: "test-class-2", alt: "test-alt2"}
const ui = <img id={"test-2"} {...props} />
```

```js
function _extends() {
  _extends =
    Object.assign ||
    function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
  return _extends.apply(this, arguments);
}

const props = {
  id: "test-2",
  className: "test-class-2",
  alt: "test-alt2"
};
const ui = /*#__PURE__*/ React.createElement(
  "img",
  _extends(
    {
      id: "test-2"
    },
    props
  )
);

```

Just like with normal spread operator, the order matters and later values will override the former ones


# Cutome components

JSX uses first opening tag to decide what it will be compiled to. Components starting with capital like Foo are compiled into custome components.
React must be in scope despite not using it in syntax, as React.createElement is used by jsx. Therefore we import React even if we (seem) not to use it.

Its important to notice React.createElement can accept eaither a string (name of the tag) or a function as a first argument. When we pass a custome function this is same as if we used custome component

```js

    const msgFunction = props => <div className="message">{props.children}</div>

    const element = React.createElement(msgFunction, {
      children: 'hello from custome component',
    })
```

Babel will compile all lowercase tags into strings, considering them html tags, and any uppercase tag it will pass as a function/variable

```js
const ui = <img/>
const ui2 = <UI />
const ui3 = <UI>Test</UI>
const ui4 = <UI><img/><UI/></UI>


const ui = /*#__PURE__*/ React.createElement("img", null);
const ui2 = /*#__PURE__*/ React.createElement(UI, null);
const ui3 = /*#__PURE__*/ React.createElement(UI, null, "Test");
const ui4 = /*#__PURE__*/ React.createElement(
  UI,
  null,
  /*#__PURE__*/ React.createElement("img", null),
  /*#__PURE__*/ React.createElement(UI, null)
);

```

Important thing to notice is that it differs when we create DOm via custome function interpolated in JSX i.e:

```js
const greeting = () => <div>Hello</div>
const functionReturningInterpolatedJSX = () => <div>Test</div>;
const createdByReact = React.createElement(greeting, {})

<div>{greeting()}</div>
<div>{createdByReact}</div>
```

When we create element by react and go to react devtools it will show us the first one just as html tags. Second one will be marked in memory by the name of the function it was passed


## React.Fragment

React fragment is a shell component when we want to pass compomponents without wrapping them in a parent. When we use it, React.Fragment is passed to React.element and its children are passed as rest props

```js
const ui = <><div>Hello</div><div>There</div></>

const ui = /*#__PURE__*/ React.createElement(
  React.Fragment,
  null,
  /*#__PURE__*/ React.createElement("div", null, "Hello"),
  /*#__PURE__*/ React.createElement("div", null, "There")
);
```


# style prop

in htmnl we wass a "style" attribute with inline styles. In React we pass a object


way of picking props when destructuring:

```js
const Box = ({className, size, children, style, ...otherProps}) => 

```


# forms

## syntethic events
When we console log a event from react controlled form we get a 'syntethic event'. This is a event that looks and likes like native browser event but its not one.