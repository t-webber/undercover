import {Route} from '../components/body';

export const colors = {
  background: 'black',
  lightblue: '#61dafb',
  textWhite: 'white',
  textBlack: 'black',
  darkblue: '#00323f',
};

export const logger = (
  componentName: string,
  functionName: string,
  variableName: string,
  variable: any,
) => {
  console.log(
    `\x1b[33m[${componentName}] (${functionName}) ${variableName} =\x1b[0m `,
    variable,
    '.',
  );
};
export const logError = (
  componentName: string,
  functionName: string,
  message: string,
  variable?: any,
) => {
  console.error(
    `\x1b[31m[${componentName}] (${functionName}) ${message}.\x1b[0m `,
    variable,
    '.',
  );
};

export const getPlayers = (struct: {route: Route}) =>
  struct.route.params.players;
