import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
html,body,div,span,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,font,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,b,u,i,center,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,caption {
  margin: 0;
  padding: 0;
  border: 0;
  outline: 0;
  font-size: 100%;
  vertical-align: baseline;
  background: transparent;
  font-family: "Noto Sans TC", sans-serif;
}
html,body {
  background: #fff;
  width: 100%;
  height: 100dvh;
  &:has(.AIModal){
    overflow: hidden;
  }
}
ol,ul {
  list-style: none;
}h1,h2,h3,h4,h5,h6,th {
  font-weight: normal; 
}
a,a:hover {
  text-decoration: none;
}
* {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-touch-callout: none;
  -webkit-text-size-adjust: none;
}
*:hover,*:focus,*:active {
  outline: 0;
  -webkit-tap-highlight-color: transparent;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button,
input[type="button"],
input[type="text"],
input[type="number"],
textarea {
  outline: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  -ms-appearance: none;
  appearance: none;
}
input::-ms-clear {
  display: none;
}
input::-ms-reveal {
  display: none;
}
input[type="password"]::-webkit-textfield-decoration-container {
  visibility: hidden;
}
.nofloat:after {
  content: "";
  display: table;
  clear: both;
}
::-webkit-scrollbar-thumb {
  background-color: #c1c1c1;
  border: 3px #f1f1f1 solid;
  border-radius: 10px;
  cursor: pointer;
  -webkit-transition: background 0.5s linear;
  transition: background 0.5s linear;
}

*:hover::-webkit-scrollbar-thumb {
  background-color: #a9a9a9;
}
::-webkit-scrollbar-corner {
  background-color: #f1f1f1;
}

`;

export default GlobalStyles;
