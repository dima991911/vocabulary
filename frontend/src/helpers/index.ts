import { createAction } from 'redux-act';

export function createActionWithStatuses(actionBaseName: string, actionFunction: any) {
    actionFunction.start = createAction(`${actionBaseName} / start`);
    actionFunction.success = createAction(`${actionBaseName} / success`);
    actionFunction.failure = createAction(`${actionBaseName} / failure`);

    return actionFunction;
}
