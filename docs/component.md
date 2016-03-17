General
-------
- property를 받아 rendering만 하는 component는 anonymous function으로 만든다.
- property를 만드는 component는 class로 만든다. (이하 container component)

> User property는 component 전체적으로 사용하는 것이기 때문에 위에서 부터 뿌려줄까??


Container Component
-------------------
- container component는 containers 폴더에 따로 보관한다.
- input element의 경우 `this._input`에 보관하며,  `this._input`은 Map으로 관리한다.
- jsx에서 anonymous function은 사용하지 않고, private method를 사용한다.
  - anonymous function은 garbage collector의 대상이 되며, render method는 state가 변할 때마다 호출되기 때문.  
