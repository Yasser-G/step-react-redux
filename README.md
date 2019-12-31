# Step React Redux 
![npm][npmDownloads] ![PRsBadge] ![npm][npmLicense] ![npm][npmVersion]

### Implement React-Redux into your app in just One Step!

- No Store configuration needed!
- No MiddleWares needed, no more dispatch complications.
- No Reducers or *ACTIONS* required.
- No Persistance configuration needed, All data are persisted!
- Very simple way to change store state, just like Component setState !
- Simply connect your components with simpler connect function
- Easily use hooks for your functional component, Dive deep in state up to 4 levels.
- Built on redux, react-redux and redux-persist, No previous experience needed.








## Instalation 


`npm i step-react-redux`  **- OR -**  `yarn add step-react-redux`

###  ***Then.. Your Are Done !*** 






## Usage

### **Provider**
###### Props
```ts
initialState: object?
loading: JSX.Element?
```
###### Usage
React
```ts
import React from "react"
import ReactDOM from "react-dom"

import { Provider } from "step-react-redux"

import App from "./App"

const rootElement = document.getElementById("root")

const myInitialState = { /* your initial state */ }
/*
 Important Note: state will initialize for first time only,
 then you have to use xSetState or setStateForKey to change it,
 If you want to reinitialize state, you have to call xResetState once.
 See xResetState below
*/

ReactDOM.render(
  <Provider 
   initialState={myInitialState} 
   loading={/* your loading UI*/}
  >
    <App />
  </Provider>,
  rootElement
)
```
React Native
```ts
import React from "react"
import { Provider } from "step-react-redux"
import AppContainer from "../navigation" // Path to Root Navigation


const myInitialState = { /* your initial state */ }
/*
 Important Note: state will initialize for first time only,
 then you have to use xSetState or setStateForKey to change it,
 If you want to reinitialize state, you have to call xResetState once.
 See xResetState below
*/

export default ()=> (
  <Provider 
   initialState={myInitialState} 
   loading={/* your loading UI*/}
  >
    <AppContainer />
  </Provider>
)
```


---



### **connect**
###### Arguments
```ts
WrappedComponent: Component
requiredKeys: string[]?
```
###### Usage
 
```ts
import React from "react"
import { connect } from "step-react-redux"

class UserPage extend React.Component {
  // Your Component goes here
}

// this will connect all your store to UserPage component props
export default connect(UserPage) 

/*
 OR you can choose what keys this component using by providing requiredKeys argument
 NOTE: Make sure that your requiredKeys values are already initiated.
*/ 

export default connect(UserPage, ["user", "someKey", "anotherKey"])
```


---



### **xSetState**
###### Arguments
```ts
state: object
```
###### Usage

```ts
import { xSetState } from "step-react-redux"

// Anywhere in your code

xSetState({ user: { id: 1, name: "Some Name" } })
// console logs => StepReactRedux.user, { id: 1, name: "Some Name" }
// Now all your connected components will have "user" prop


// Usage with API

async getMyData(){

    xSetState({ isFetching: true })

    try {

      const response = await fetch("http://www.myServer.com/api/myData")
      const responseJson = await response.json()
      xSetState({ isFetching: false, myData: responseJson  })

    } catch (error) {

      alert(error.message)

      // Remeber that You can use xSetState ANYWHERE! as much as you want !
      xSetState({ isFetching: false })
    }

}
```


---


### **setStateForKey**
###### Arguments
```ts
key: string
state: object
```
###### Usage

```ts
import { setStateForKey } from "step-react-redux"

// Similar to xSetState
// plus it can be used to set deep state

setStateForKey("user", { id: 1, name: "Some Name" })

// console logs => StepReactRedux.user, { id: 1, name: "Some Name" }
// Now all your connected components will have "user" prop

// Usage to set deep state

setStateForKey("user.name", "New Name" )

// console logs => StepReactRedux.user.name, "New Name"

setStateForKey("user.name", "New Name" )

// Remeber that You can use setStateForKey ANYWHERE!
```



---


### **getStateForKey**
###### Arguments
```ts
key: string
```
###### Usage

```ts
import { getStateForKey } from "step-react-redux"

// Similar to setStateForKey
// but it can be used to get state and deep state

const userData = getStateForKey("user") 
console.log(userData) // => { id: 1, name: "Some Name" }

const userName = getStateForKey("user.name") 
console.log(userName) // => "Some Name"

// getting state for unknown key will return null
const someValue = getStateForKey("someKey") 
console.log(someValue) // => null

const anotherValue = getStateForKey("anotherKey.subKey") 
console.log(anotherValue) // => null

// Remeber that You can use getStateForKey ANYWHERE!
```

### **useStepState** (Hook)

###### Usage
 
```ts
import React from "react"
import { useStepState } from "step-react-redux"

// Hooks Are used inside functional components

const MyComponent = (props) => {

	// Depth: 2 levels
	const isLoggedIn = useStepState("user.loggedIn")
	
	// Depth: 3 levels
	const userName = isLoggedIn ? useStepState("user.data.name") : "Guest"
	
	// NOTE THAT DEPTH TREE SHOULD BE INITIALIZED BEFORE HOOKING IT
	
	return (
		<>
		// Your Component goes here
		<Text>Name: {userName}</Text>
		</>
	)
	
  
}

export default MyComponent

```


---

### **xResetState** (Dev Only)

###### Usage
 
```ts
import React from "react"
import { xResetState } from "step-react-redux"

/*
Top level index in your code, call this method once during your develeopment process
to allow you to reinitialize your state again from Provider initialState prop
*/

// Call this Once, Then Don't forget to remove it.

xResetState()


```






[npmDownloads]: <https://img.shields.io/npm/dt/step-react-redux?label=Installs&logo=npm&style=plastic>
[npmLicense]: <https://img.shields.io/npm/l/step-react-redux?label=License&style=plastic>
[npmVersion]: <https://img.shields.io/npm/v/step-react-redux?label=Latest%20Version&style=plastic>
[PRsBadge]: <https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=plastic>
