import AppClient from '../httpClients/appClient';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { FormErrorState } from '../reducers/formErrorReducer';
import { Action, AnyAction } from 'redux';
import { ErrorRes, ItemEditReq, ItemEditRes } from '../types/appApiTypes';
import { push } from 'connected-react-router';
import { routes } from '../routes/Route';
import { AppResponseError } from '../errors/AppResponseError';

export const POST_ITEM_EDIT_START = 'POST_ITEM_EDIT_START';
export const POST_ITEM_EDIT_SUCCESS = 'POST_ITEM_EDIT_SUCCESS';
export const POST_ITEM_EDIT_FAIL = 'POST_ITEM_EDIT_FAIL';

type ThunkResult<R> = ThunkAction<R, void, undefined, AnyAction>;

export function postItemEditAction(
  itemId: number,
  itemPrice?: number,
): ThunkResult<void> {
  return (dispatch: ThunkDispatch<any, any, AnyAction>) => {
    Promise.resolve()
      .then(() => {
        dispatch(postItemEditStartAction());
      })
      .then(() => {
        const reqParams = {
          item_id: itemId,
        } as ItemEditReq;

        if (itemPrice) {
          reqParams.item_price = itemPrice;
        }
        return AppClient.post('/items/edit', reqParams);
      })
      .then(async (response: Response) => {
        if (response.status !== 200) {
          const errRes: ErrorRes = await response.json();
          throw new AppResponseError(errRes.error, response);
        }

        return await response.json();
      })
      .then((body: ItemEditRes) => {
        dispatch(postItemEditSuccessAction());
      })
      .then(() => {
        dispatch(push(routes.item.getPath(itemId)));
      })
      .catch((err: Error) => {
        dispatch(
          postItemEditFailAction({
            itemEditFormError: err.message,
          }),
        );
      });
  };
}

export interface PostItemEditStartAction
  extends Action<typeof POST_ITEM_EDIT_START> {}

export function postItemEditStartAction(): PostItemEditStartAction {
  return {
    type: POST_ITEM_EDIT_START,
  };
}

export interface PostItemEditSuccessAction
  extends Action<typeof POST_ITEM_EDIT_SUCCESS> {}

export function postItemEditSuccessAction(): PostItemEditSuccessAction {
  return {
    type: POST_ITEM_EDIT_SUCCESS,
  };
}

export interface PostItemEditFailAction
  extends Action<typeof POST_ITEM_EDIT_FAIL> {
  payload: FormErrorState;
}

export function postItemEditFailAction(
  newErrors: FormErrorState,
): PostItemEditFailAction {
  return {
    type: POST_ITEM_EDIT_FAIL,
    payload: newErrors,
  };
}