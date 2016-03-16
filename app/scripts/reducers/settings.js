import kakapoAssets from 'kakapo-assets';
import { bridgedSettings } from 'kakapoBridge';
import constants from 'constants/';
import { createReducer, flatteni18n } from 'utils/';

let initialState = [ 'mute', 'lang' ].reduce((acc, k) =>
  ({ ...acc, [k]: bridgedSettings.getItem(k) }), {
    intlData: { ...kakapoAssets.i18n.en, messages: flatteni18n(kakapoAssets.i18n.en.messages) }
  });

/* istanbul ignore if */
if (__DESKTOP__) {
  initialState = { ...initialState, ...{
    dockIcon: bridgedSettings.getItem('dockIcon'),
    devTools: bridgedSettings.getItem('devTools')
  } };
}

const settingReducers = {
  toggleMute(state) {
    const mute = !bridgedSettings.getItem('mute');
    bridgedSettings.setItem('mute', mute);
    return { ...state, mute };
  },
  toggleDock(state, value) {
    bridgedSettings.setItem('dockIcon', value);
    return { ...state, dockIcon: value };
  },
  toggleDevTools(state, value) {
    bridgedSettings.setItem('devTools', value);
    return { ...state, devTools: value };
  }
};

export default createReducer(initialState, {
  [constants.SETTINGS_LANGUAGE]: state => state,
  [constants.SETTINGS_MUTE]: (state) => settingReducers.toggleMute(state),
  [constants.SETTINGS_DOCK]: (state, { bool }) => settingReducers.toggleDock(state, bool),
  [constants.SETTINGS_DEVTOOLS]: (state, { bool }) => settingReducers.toggleDevTools(state, bool)
});
